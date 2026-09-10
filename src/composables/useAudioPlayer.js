import { ref, watch } from 'vue';
import { useSyncState } from './useSyncState';

let audio1 = null;
let audio2 = null;
let currentTrack = 1; // 1 یا 2
let isInitialized = false;

const isMuted = ref(false);
const isBlockedByBrowser = ref(false);

// کش کردن فایل‌های صوتی در Cache Storage مرورگر جهت عدم دانلود مجدد در دفعات بعدی
async function cacheAudioFiles() {
  if (typeof window !== 'undefined' && 'caches' in window) {
    try {
      const cache = await caches.open('iran-history-audio-cache-v1');
      await cache.addAll(['/music/music1.mp3', '/music/music2.mp3']);
      console.log('Audio tracks cached for offline / instant future play');
    } catch (e) {
      console.warn('Cache Storage note:', e);
    }
  }
}

export function useAudioPlayer() {
  const { volume, isAudioPlaying } = useSyncState();

  function initAudio() {
    if (isInitialized || typeof window === 'undefined') return;

    try {
      cacheAudioFiles();

      audio1 = new Audio('/music/music1.mp3');
      audio2 = new Audio('/music/music2.mp3');

      audio1.preload = 'auto';
      audio2.preload = 'auto';
      audio1.autoplay = true;

      const targetVol = Math.max(0, Math.min(1, volume.value / 100));
      audio1.volume = targetVol;
      audio2.volume = targetVol;

      // انتقال نرم به قطعه دوم پس از پایان قطعه اول
      audio1.addEventListener('ended', () => {
        currentTrack = 2;
        playTrack(audio2);
      });

      // بازگشت چرخه به قطعه اول پس از پایان قطعه دوم
      audio2.addEventListener('ended', () => {
        currentTrack = 1;
        playTrack(audio1);
      });

      // آغاز فوری پخش در همان میلی‌ثانیه اول
      playWithAggressiveAutoplay(audio1);

      // اتصال شنودگرهای فراگیر: با کوچک‌ترین جابجایی ماوس، فوکوس، اسکرول یا لمس، بلافاصله صدا فعال و بی‌صدا بودن لغو می‌شود
      const unmuteAndPlay = () => {
        if (audio1) {
          audio1.muted = false;
          audio1.volume = targetVol;
          if (audio1.paused) {
            audio1.play().catch(() => {});
          }
          isAudioPlaying.value = true;
          isBlockedByBrowser.value = false;
        }
        removeEarlyListeners();
      };

      const earlyEvents = ['mousemove', 'pointermove', 'pointerdown', 'keydown', 'wheel', 'scroll', 'touchstart', 'focus', 'mouseover', 'click'];
      const removeEarlyListeners = () => {
        earlyEvents.forEach(evt => window.removeEventListener(evt, unmuteAndPlay));
      };

      earlyEvents.forEach(evt => {
        window.addEventListener(evt, unmuteAndPlay, { passive: true, once: true });
      });

      isInitialized = true;
    } catch (err) {
      console.warn('Audio initialization error:', err);
    }
  }

  function playWithAggressiveAutoplay(audioEl) {
    if (!audioEl) return;
    
    // ۱. ابتدا تلاش برای پخش مستقیم با صدا
    audioEl.muted = false;
    const playPromise = audioEl.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isBlockedByBrowser.value = false;
          isAudioPlaying.value = true;
        })
        .catch(() => {
          // ۲. اگر پالیسی مرورگر مانع شد، فوری به صورت Muted پخش را از ثانیه صفر شروع کن
          // تا تایم‌لاین صدا جلو برود و با اولین تکان ماوس، Mute برداشته شود!
          audioEl.muted = true;
          audioEl.play().then(() => {
            isBlockedByBrowser.value = true;
          }).catch(() => {});
        });
    }
  }

  function playTrack(audioEl) {
    if (!audioEl) return;
    audioEl.muted = false;
    audioEl.volume = Math.max(0, Math.min(1, volume.value / 100));
    const playPromise = audioEl.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isBlockedByBrowser.value = false;
          isAudioPlaying.value = true;
        })
        .catch(() => {
          playWithAggressiveAutoplay(audioEl);
        });
    }
  }

  function startExperienceAudio() {
    initAudio();
    isBlockedByBrowser.value = false;
    currentTrack = 1;
    if (audio2) {
      audio2.pause();
      audio2.currentTime = 0;
    }
    if (audio1) {
      playTrack(audio1);
    }
  }

  function pauseAudio() {
    if (audio1) audio1.pause();
    if (audio2) audio2.pause();
    isAudioPlaying.value = false;
  }

  function resumeAudio() {
    initAudio();
    if (currentTrack === 1 && audio1) {
      playTrack(audio1);
    } else if (currentTrack === 2 && audio2) {
      playTrack(audio2);
    }
  }

  // نظارت بر تغییرات سراسری وضعیت پخش (از ریموت کنترل یا هدر)
  watch(isAudioPlaying, (newVal) => {
    if (!isInitialized) return;
    if (newVal) {
      resumeAudio();
    } else {
      pauseAudio();
    }
  });

  // نظارت بر تغییرات بلندی صدا (همگام با اسلایدر ریموت)
  watch(volume, (newVol) => {
    const norm = Math.max(0, Math.min(1, newVol / 100));
    if (audio1) audio1.volume = norm;
    if (audio2) audio2.volume = norm;
  });

  return {
    isAudioPlaying,
    volume,
    isBlockedByBrowser,
    isMuted,
    initAudio,
    startExperienceAudio,
    pauseAudio,
    resumeAudio
  };
}
