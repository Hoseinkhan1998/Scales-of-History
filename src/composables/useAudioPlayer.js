import { ref, watch } from 'vue';
import { useSyncState } from './useSyncState';

let audio1 = null;
let audio2 = null;
let currentTrack = 1; // 1 یا 2
let isInitialized = false;

const isBlockedByBrowser = ref(false);
const isAudioPlaying = ref(false);

// کش کردن فایل‌های صوتی در Cache Storage مرورگر جهت لود آنی و بدون دانلود مجدد
async function cacheAudioFiles() {
  if (typeof window !== 'undefined' && 'caches' in window) {
    try {
      const cache = await caches.open('iran-history-audio-cache-v1');
      await cache.addAll(['/music/music1.mp3', '/music/music2.mp3']);
      console.log('[Cache] Audio tracks cached for offline / instant playback');
    } catch (e) {
      console.warn('[Cache] Audio caching note:', e);
    }
  }
}

export function useAudioPlayer() {
  const { volume, isAudioPlaying: syncIsPlaying } = useSyncState();

  function initAudio() {
    if (isInitialized || typeof window === 'undefined') return;

    try {
      cacheAudioFiles();

      audio1 = new Audio('/music/music1.mp3');
      audio2 = new Audio('/music/music2.mp3');

      audio1.preload = 'auto';
      audio2.preload = 'auto';

      const targetVol = Math.max(0, Math.min(1, volume.value / 100));
      audio1.volume = targetVol;
      audio2.volume = targetVol;

      // انتقال پیوسته به قطعه دوم پس از پایان قطعه اول
      audio1.addEventListener('ended', () => {
        currentTrack = 2;
        playTrack(audio2);
      });

      // بازگشت چرخه به قطعه اول پس از پایان قطعه دوم
      audio2.addEventListener('ended', () => {
        currentTrack = 1;
        playTrack(audio1);
      });

      // رویدادهای تعامل کاربر که مرورگر را مجاز به پخش صدا می‌کند
      const userActivationEvents = ['click', 'pointerdown', 'touchstart', 'mousedown', 'keydown'];

      const unlockAudioHandler = () => {
        const target = (currentTrack === 1 || !audio2) ? audio1 : audio2;
        if (target && !isAudioPlaying.value) {
          target.muted = false;
          target.volume = Math.max(0, Math.min(1, volume.value / 100));
          const p = target.play();
          if (p !== undefined) {
            p.then(() => {
              isBlockedByBrowser.value = false;
              isAudioPlaying.value = true;
              syncIsPlaying.value = true;
              userActivationEvents.forEach(evt => window.removeEventListener(evt, unlockAudioHandler));
            }).catch(() => {});
          }
        }
      };

      userActivationEvents.forEach(evt => {
        window.addEventListener(evt, unlockAudioHandler, { passive: true });
      });

      // شنود رویدادهای صوتی ارسالی از ریموت کنترل گوشی
      window.addEventListener('host-play-audio', () => {
        resumeAudio();
      });

      window.addEventListener('host-pause-audio', () => {
        pauseAudio();
      });

      isInitialized = true;

      // تلاش اول برای پخش فوری و بی‌درنگ در ثانیه اول لود سایت
      startExperienceAudio();
    } catch (err) {
      console.warn('Audio initialization error:', err);
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
          syncIsPlaying.value = true;
        })
        .catch((err) => {
          console.log('[Autoplay Policy] Play blocked until user gesture or remote trigger:', err.name);
          // زمان را جلو نبریم تا موسیقی از ثانیه صفر شروع شود
          audioEl.pause();
          audioEl.currentTime = 0;
          isBlockedByBrowser.value = true;
          isAudioPlaying.value = false;
          syncIsPlaying.value = false;
        });
    }
  }

  function startExperienceAudio() {
    initAudio();
    currentTrack = 1;
    if (audio2) {
      audio2.pause();
      audio2.currentTime = 0;
    }
    if (audio1) {
      audio1.currentTime = 0;
      audio1.muted = false;
      audio1.volume = Math.max(0, Math.min(1, volume.value / 100));
      playTrack(audio1);
    }
  }

  function pauseAudio() {
    if (audio1) audio1.pause();
    if (audio2) audio2.pause();
    isAudioPlaying.value = false;
    syncIsPlaying.value = false;
  }

  function resumeAudio() {
    initAudio();
    const targetAudio = (currentTrack === 1 || !audio2) ? audio1 : audio2;
    if (targetAudio) {
      targetAudio.muted = false;
      targetAudio.volume = Math.max(0, Math.min(1, volume.value / 100));
      playTrack(targetAudio);
    }
  }

  // نظارت بر تغییرات سراسری وضعیت پخش (همگام با ریموت کنترل)
  watch(syncIsPlaying, (newVal) => {
    if (!isInitialized) return;
    if (newVal && !isAudioPlaying.value) {
      resumeAudio();
    } else if (!newVal && isAudioPlaying.value) {
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
    initAudio,
    startExperienceAudio,
    pauseAudio,
    resumeAudio
  };
}
