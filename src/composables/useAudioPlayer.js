import { ref, watch } from 'vue';
import { useSyncState } from './useSyncState';
import { startSequentialAudioPreload } from '../utils/audioPreloader';

let audio1 = null;
let audio2 = null;
let currentTrack = 1; // 1 یا 2
let isInitialized = false;

const isBlockedByBrowser = ref(false);
const isAudioPlaying = ref(false);

// محاسبه بلندی صدا با منحنی توانی برای ایجاد تغییرات کاملاً محسوس، واقعی و پویا در گوش شنونده
function calculatePerceptualVolume(volPercent) {
  const clamped = Math.max(0, Math.min(100, Number(volPercent) || 0));
  if (clamped <= 0) return 0;
  // منحنی توانی ۱.۷۵ باعث می‌شود حتی کوچک‌ترین جابجایی اسلایدر، تغییری کاملاً محسوس و گوش‌نواز ایجاد کند
  return Math.pow(clamped / 100, 1.75);
}

function applyVolumeToAudios(volPercent) {
  const vol = Number(volPercent);
  const effective = calculatePerceptualVolume(vol);
  const isMuted = vol <= 0;
  if (audio1) {
    audio1.volume = effective;
    audio1.muted = isMuted;
  }
  if (audio2) {
    audio2.volume = effective;
    audio2.muted = isMuted;
  }
}

export function useAudioPlayer() {
  const { volume, isAudioPlaying: syncIsPlaying } = useSyncState();

  function initAudio() {
    if (isInitialized || typeof window === 'undefined') return;

    try {
      // دانلود ترتیبی فایل‌های صوتی به ترتیب اولویت (موسیقی اول -> فصل ۱ -> فصل ۲ -> موسیقی دوم -> فصل‌های بعد)
      startSequentialAudioPreload();

      audio1 = new Audio('/music/music1.mp3');
      audio2 = new Audio('/music/music2.mp3');

      audio1.preload = 'auto';
      audio2.preload = 'auto';

      // آغاز پخش موسیقی اول از ثانیه ۱۵ طبق درخواست
      audio1.currentTime = 15;

      applyVolumeToAudios(volume.value);

      // انتقال پیوسته به قطعه دوم پس از پایان قطعه اول
      audio1.addEventListener('ended', () => {
        currentTrack = 2;
        playTrack(audio2);
      });

      // بازگشت چرخه به قطعه اول پس از پایان قطعه دوم
      audio2.addEventListener('ended', () => {
        currentTrack = 1;
        if (audio1) audio1.currentTime = 15;
        playTrack(audio1);
      });

      // رویدادهای تعامل کاربر که مرورگر را مجاز به پخش صدا می‌کند
      const userActivationEvents = ['click', 'pointerdown', 'touchstart', 'mousedown', 'keydown'];

      const unlockAudioHandler = () => {
        const target = (currentTrack === 1 || !audio2) ? audio1 : audio2;
        if (target && !isAudioPlaying.value) {
          if (target === audio1 && audio1.currentTime < 15) {
            audio1.currentTime = 15;
          }
          applyVolumeToAudios(volume.value);
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

      window.addEventListener('host-volume-change', (e) => {
        applyVolumeToAudios(e.detail);
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
    applyVolumeToAudios(volume.value);
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
          // زمان را جلو نبریم تا موسیقی از ثانیه ۱۵ بماند
          audioEl.pause();
          if (audioEl === audio1) {
            audioEl.currentTime = 15;
          } else {
            audioEl.currentTime = 0;
          }
          isBlockedByBrowser.value = true;
          isAudioPlaying.value = false;
          syncIsPlaying.value = false;
        });
    }
  }

  function startExperienceAudio() {
    initAudio();
    // اگر صوتی در حال حاضر در حال پخش است، خط زمانی را به هیچ وجه ریست نکن تا پیوستگی حفظ شود
    if (isAudioPlaying.value && ((audio1 && !audio1.paused) || (audio2 && !audio2.paused))) {
      return;
    }

    currentTrack = 1;
    if (audio2) {
      audio2.pause();
      audio2.currentTime = 0;
    }
    if (audio1) {
      if (audio1.paused && audio1.currentTime < 15) {
        audio1.currentTime = 15;
      }
      applyVolumeToAudios(volume.value);
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
    if (isAudioPlaying.value && ((audio1 && !audio1.paused) || (audio2 && !audio2.paused))) {
      return;
    }
    const targetAudio = (currentTrack === 1 || !audio2) ? audio1 : audio2;
    if (targetAudio) {
      applyVolumeToAudios(volume.value);
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
    applyVolumeToAudios(newVol);
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
