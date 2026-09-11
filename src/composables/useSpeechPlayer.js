import { ref, watch } from 'vue';
import { useSyncState } from './useSyncState';

let speechAudio = null;
let isSpeechInitialized = false;
let throttleTimer = null;

const isSpeechPlaying = ref(false);
const speechVolume = ref(85); // ۰ تا ۱۰۰
const speechCurrentTime = ref(0);
const speechDuration = ref(0);
const hasSpeechAudio = ref(true);
const isSpeechLoading = ref(false);
const currentSpeechChapter = ref(1);

// محاسبه ولوم گفتار با وضوح بالا
function calculateSpeechVolume(volPercent) {
  const clamped = Math.max(0, Math.min(100, Number(volPercent) || 0));
  if (clamped <= 0) return 0;
  // منحنی ملایم‌تر برای شفافیت و تمایز کامل صدای گوینده
  return Math.pow(clamped / 100, 1.2);
}

function applySpeechVolume(volPercent) {
  speechVolume.value = Number(volPercent);
  if (speechAudio) {
    speechAudio.volume = calculateSpeechVolume(volPercent);
    speechAudio.muted = volPercent <= 0;
  }
}

export function useSpeechPlayer() {
  const { 
    currentPage, 
    broadcastState, 
    isSpeechPlaying: syncSpeechPlaying,
    speechVolume: syncSpeechVolume,
    speechCurrentTime: syncSpeechCurrentTime,
    speechDuration: syncSpeechDuration,
    hasSpeechAudio: syncHasSpeechAudio
  } = useSyncState();

  function initSpeechAudio() {
    if (isSpeechInitialized || typeof window === 'undefined') return;

    speechAudio = new Audio();
    speechAudio.preload = 'auto';
    applySpeechVolume(speechVolume.value);

    // همگام‌سازی واقعی وضعیت با پلیر مرورگر
    speechAudio.addEventListener('play', () => {
      isSpeechPlaying.value = true;
      syncSpeechPlaying.value = true;
      broadcastState();
    });

    speechAudio.addEventListener('pause', () => {
      isSpeechPlaying.value = false;
      syncSpeechPlaying.value = false;
      broadcastState();
    });

    speechAudio.addEventListener('error', (e) => {
      console.warn('[Speech Audio Error]', speechAudio?.error, e);
      isSpeechPlaying.value = false;
      syncSpeechPlaying.value = false;
      broadcastState();
    });

    // به‌روزرسانی ثانیه‌شمار پخش
    speechAudio.addEventListener('timeupdate', () => {
      if (!speechAudio) return;
      speechCurrentTime.value = speechAudio.currentTime;
      syncSpeechCurrentTime.value = speechAudio.currentTime;

      // تراتل ارسال زمان به ریموت کنترلر هر ۵۰۰ میلی‌ثانیه برای جلوگیری از اشغال ترافیک شبکه
      if (!throttleTimer) {
        throttleTimer = setTimeout(() => {
          broadcastState();
          throttleTimer = null;
        }, 500);
      }
    });

    // دریافت مدت زمان کل فایل صوتی
    speechAudio.addEventListener('loadedmetadata', () => {
      if (!speechAudio) return;
      const dur = speechAudio.duration || 0;
      speechDuration.value = dur;
      syncSpeechDuration.value = dur;
      isSpeechLoading.value = false;
      broadcastState();
    });

    // پایان پخش گفتار
    speechAudio.addEventListener('ended', () => {
      isSpeechPlaying.value = false;
      syncSpeechPlaying.value = false;
      speechCurrentTime.value = 0;
      syncSpeechCurrentTime.value = 0;
      broadcastState();
    });

    // رویدادهای ریموت کنترلر ارسال‌شده به نمایشگر هاست
    window.addEventListener('host-speech-play', () => {
      playSpeech();
    });

    window.addEventListener('host-speech-pause', () => {
      pauseSpeech();
    });

    window.addEventListener('host-speech-seek', (e) => {
      if (typeof e.detail === 'number') {
        seekSpeech(e.detail);
      }
    });

    window.addEventListener('host-speech-seek-delta', (e) => {
      if (typeof e.detail === 'number') {
        seekSpeechDelta(e.detail);
      }
    });

    window.addEventListener('host-speech-volume-change', (e) => {
      if (typeof e.detail === 'number') {
        setSpeechVolume(e.detail);
      }
    });

    isSpeechInitialized = true;
  }

  // بارگذاری فایل صوتی فصل مدنظر
  function loadChapterSpeech(chapterId, autoPlay = false) {
    initSpeechAudio();
    const id = Number(chapterId) || 1;
    currentSpeechChapter.value = id;

    // فصل ۱۱ فاقد فایل صوتی گفتار است
    if (id > 10) {
      hasSpeechAudio.value = false;
      syncHasSpeechAudio.value = false;
      if (speechAudio) {
        speechAudio.pause();
        speechAudio.src = '';
      }
      isSpeechPlaying.value = false;
      syncSpeechPlaying.value = false;
      speechCurrentTime.value = 0;
      speechDuration.value = 0;
      syncSpeechCurrentTime.value = 0;
      syncSpeechDuration.value = 0;
      broadcastState();
      return;
    }

    hasSpeechAudio.value = true;
    syncHasSpeechAudio.value = true;

    const expectedSrc = `/music/speach/season${id}.mp3`;
    if (speechAudio) {
      // فقط در صورتی سورس را عوض کن که واقعاً فصل تغییر کرده باشد
      if (!speechAudio.src || !speechAudio.src.endsWith(expectedSrc)) {
        isSpeechLoading.value = true;
        speechAudio.pause();
        speechAudio.src = expectedSrc;
        speechAudio.currentTime = 0;
        speechCurrentTime.value = 0;
        syncSpeechCurrentTime.value = 0;
        applySpeechVolume(speechVolume.value);

        if (autoPlay) {
          playSpeech();
        } else {
          isSpeechPlaying.value = false;
          syncSpeechPlaying.value = false;
          broadcastState();
        }
      }
    }
  }

  function playSpeech() {
    initSpeechAudio();
    if (!speechAudio || !hasSpeechAudio.value) return;

    applySpeechVolume(speechVolume.value);
    const p = speechAudio.play();
    if (p !== undefined) {
      p.then(() => {
        isSpeechPlaying.value = true;
        syncSpeechPlaying.value = true;
        broadcastState();
      }).catch((err) => {
        console.log('[Speech Autoplay Policy] Waiting for user interaction:', err);
      });
    }
  }

  function pauseSpeech() {
    if (speechAudio) {
      speechAudio.pause();
    }
    isSpeechPlaying.value = false;
    syncSpeechPlaying.value = false;
    broadcastState();
  }

  function toggleSpeech() {
    if (isSpeechPlaying.value) {
      pauseSpeech();
    } else {
      playSpeech();
    }
  }

  function seekSpeech(timeInSeconds) {
    if (!speechAudio || !hasSpeechAudio.value) return;
    const dur = speechAudio.duration || speechDuration.value || 0;
    const target = Math.max(0, Math.min(dur, Number(timeInSeconds) || 0));
    speechAudio.currentTime = target;
    speechCurrentTime.value = target;
    syncSpeechCurrentTime.value = target;
    broadcastState();
  }

  function seekSpeechDelta(deltaSeconds) {
    if (!speechAudio || !hasSpeechAudio.value) return;
    const current = speechAudio.currentTime || 0;
    const dur = speechAudio.duration || speechDuration.value || 0;
    const target = Math.max(0, Math.min(dur, current + Number(deltaSeconds)));
    speechAudio.currentTime = target;
    speechCurrentTime.value = target;
    syncSpeechCurrentTime.value = target;
    broadcastState();
  }

  function setSpeechVolume(vol) {
    const clamped = Math.max(0, Math.min(100, Math.round(vol)));
    applySpeechVolume(clamped);
    syncSpeechVolume.value = clamped;
    broadcastState();
  }

  return {
    isSpeechPlaying,
    speechVolume,
    speechCurrentTime,
    speechDuration,
    hasSpeechAudio,
    isSpeechLoading,
    currentSpeechChapter,
    initSpeechAudio,
    loadChapterSpeech,
    playSpeech,
    pauseSpeech,
    toggleSpeech,
    seekSpeech,
    seekSpeechDelta,
    setSpeechVolume
  };
}
