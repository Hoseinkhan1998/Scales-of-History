<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useSyncState } from '../composables/useSyncState';
import { chapters } from '../data/publicationData';
import { toPersianDigits, toEnglishDigits } from '../utils/persianNumbers';

const { 
  currentPage, 
  totalPages, 
  volume, 
  isAudioPlaying, 
  isConnected, 
  roomId, 
  connectionError,
  hasEnteredExperience,
  // امکانات و متغیرهای اختصاصی گفتار فصول
  isSpeechPlaying,
  speechVolume,
  speechCurrentTime,
  speechDuration,
  hasSpeechAudio,
  playSpeech,
  pauseSpeech,
  toggleSpeech,
  seekSpeech,
  seekSpeechDelta,
  setSpeechVolume,
  connectAsController,
  nextPage,
  prevPage,
  scrollDown,
  scrollUp,
  enterPublication,
  gotoPage,
  setVolume,
  toggleAudio
} = useSyncState();

const inputCode = ref('');
const isConnecting = ref(false);

// ۱. مدیریت محلی و تراتل اسلایدر ولوم موسیقی نمایشگر
const localVolume = ref(volume.value);
let isDraggingVolume = false;
let volumeThrottleTimer = null;

watch(volume, (newVal) => {
  if (!isDraggingVolume) {
    localVolume.value = newVal;
  }
});

// ۲. مدیریت محلی اسکرابر و خط زمانی گفتار فصل
const localSpeechTime = ref(0);
const isDraggingSpeechTime = ref(false);

watch(speechCurrentTime, (newTime) => {
  if (!isDraggingSpeechTime.value) {
    localSpeechTime.value = newTime;
  }
});

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '۰۰:۰۰';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  const mStr = String(m).padStart(2, '0');
  const sStr = String(s).padStart(2, '0');
  return toPersianDigits(`${mStr}:${sStr}`);
}

function handleSpeechScrubInput(e) {
  isDraggingSpeechTime.value = true;
  localSpeechTime.value = Number(e.target.value);
}

function handleSpeechScrubChange(e) {
  const targetTime = Number(e.target.value);
  localSpeechTime.value = targetTime;
  seekSpeech(targetTime);
  setTimeout(() => {
    isDraggingSpeechTime.value = false;
  }, 150);
}

// ۳. مدیریت محلی اسلایدر ولوم گفتار راوی
const localSpeechVolume = ref(speechVolume.value);
let isDraggingSpeechVolume = false;
let speechVolumeThrottleTimer = null;

watch(speechVolume, (newVal) => {
  if (!isDraggingSpeechVolume) {
    localSpeechVolume.value = newVal;
  }
});

function handleSpeechVolumeInput(e) {
  isDraggingSpeechVolume = true;
  const newVol = Number(e.target.value);
  localSpeechVolume.value = newVol;

  if (!speechVolumeThrottleTimer) {
    speechVolumeThrottleTimer = setTimeout(() => {
      setSpeechVolume(localSpeechVolume.value);
      speechVolumeThrottleTimer = null;
    }, 20);
  }
}

function handleSpeechVolumeChange(e) {
  const newVol = Number(e.target.value);
  localSpeechVolume.value = newVol;
  setSpeechVolume(newVol);
  setTimeout(() => {
    isDraggingSpeechVolume = false;
  }, 150);
}

const currentChapter = computed(() => {
  return chapters.find(c => c.id === currentPage.value) || chapters[0];
});

function triggerHaptic() {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    try { navigator.vibrate(25); } catch (e) {}
  }
}

function handleNext() {
  triggerHaptic();
  nextPage();
}

function handlePrev() {
  triggerHaptic();
  prevPage();
}

function handleScrollDown() {
  triggerHaptic();
  scrollDown();
}

function handleScrollUp() {
  triggerHaptic();
  scrollUp();
}

function handleEnterPublication() {
  triggerHaptic();
  enterPublication();
}

function handleVolumeInput(e) {
  isDraggingVolume = true;
  const newVol = Number(e.target.value);
  localVolume.value = newVol;

  if (!volumeThrottleTimer) {
    volumeThrottleTimer = setTimeout(() => {
      setVolume(localVolume.value);
      volumeThrottleTimer = null;
    }, 20);
  }
}

function handleVolumeChange(e) {
  const newVol = Number(e.target.value);
  localVolume.value = newVol;
  setVolume(newVol);
  setTimeout(() => {
    isDraggingVolume = false;
  }, 150);
}

function handleTogglePlay() {
  triggerHaptic();
  toggleAudio();
}

// فرامین کنترل گفتار راوی
function handleToggleSpeech() {
  triggerHaptic();
  toggleSpeech();
}

function handleSpeechRewind() {
  triggerHaptic();
  seekSpeechDelta(-10);
}

function handleSpeechForward() {
  triggerHaptic();
  seekSpeechDelta(10);
}

function handleConnectManual() {
  const clean = toEnglishDigits(inputCode.value).replace(/[^0-9]/g, '').trim();
  if (!clean) return;
  isConnecting.value = true;
  connectAsController(clean);
  setTimeout(() => { isConnecting.value = false; }, 2000);
}

onMounted(() => {
  // بررسی وجود کد اتاق در آدرس مرورگر
  const params = new URLSearchParams(window.location.search);
  const roomParam = params.get('room');
  if (roomParam) {
    const clean = toEnglishDigits(roomParam).replace(/[^0-9]/g, '').trim();
    inputCode.value = clean;
    connectAsController(clean);
  }
});
</script>

<template>
  <!-- کانتینر اصلی ریموت هوشمند -->
  <div class="fixed inset-0 h-[100dvh] max-h-[100dvh] w-full overflow-hidden bg-[#090a0d] text-[#ede8df] flex flex-col justify-between p-3 sm:p-4 select-none font-sans" dir="rtl">
    <!-- وضعیت بالای صفحه کنترلر -->
    <header class="w-full flex justify-between items-center pb-2.5 border-b border-[rgba(237,232,223,0.12)] shrink-0">
      <div class="flex items-center gap-2">
        <span 
          class="w-2.5 h-2.5 rounded-full"
          :class="isConnected ? 'bg-[#22c55e] shadow-[0_0_10px_#22c55e]' : 'bg-[#ef4444] animate-pulse'"
        ></span>
        <span class="text-xs font-bold text-[#ede8df]">
          {{ isConnected ? `متصل به کد ${toPersianDigits(roomId)}` : 'در انتظار اتصال به نمایشگر' }}
        </span>
      </div>

      <!-- دکمه ورود سریع به مقاله از راه دور -->
      <button 
        v-if="isConnected"
        @click="handleEnterPublication"
        class="px-2.5 py-1 bg-[#242633] hover:bg-[#b45309] text-white text-[11px] font-bold rounded-sm border border-[rgba(237,232,223,0.2)] transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
        title="رد کردن پرده آغازین و ورود مستقیم به مقاله"
      >
        <span>ورود به مقاله</span>
        <span class="text-xs">📖</span>
      </button>
      <span v-else class="text-[11px] text-[#b45309] font-mono font-bold tracking-wider">
        ریموت کنترل هوشمند
      </span>
    </header>

    <!-- در صورت عدم اتصال: فرم ورود کد ۳ رقمی اتاق -->
    <div v-if="!isConnected" class="my-auto max-w-sm w-full mx-auto p-6 bg-[#13141b] border border-[rgba(237,232,223,0.15)] rounded-md text-center space-y-4">
      <div class="w-12 h-12 mx-auto bg-[#b45309]/20 rounded-full flex items-center justify-center text-[#f59e0b] text-xl">
        📱
      </div>
      <h2 class="text-lg font-black text-[#ede8df]">اتصال به نمایشگر اصلی</h2>
      <p class="text-xs text-[#a8a39a] leading-relaxed">
        کد ۳ رقمی نمایان‌شده روی صفحه دسکتاپ را وارد کنید:
      </p>

      <div class="flex flex-col gap-3">
        <input 
          v-model="inputCode" 
          type="tel" 
          inputmode="numeric"
          pattern="[0-9]*"
          placeholder="مثال: ۴۸۲" 
          class="w-full bg-[#1a1c24] border border-[rgba(237,232,223,0.2)] rounded-sm p-3.5 text-center font-mono font-black text-3xl tracking-[0.3em] text-[#f59e0b] focus:outline-none focus:border-[#b45309]"
          maxlength="3"
          @keyup.enter="handleConnectManual"
        />
        <button 
          @click="handleConnectManual"
          :disabled="isConnecting"
          class="w-full py-3.5 bg-[#b45309] hover:bg-[#d97706] text-white font-bold text-base rounded-sm transition-all cursor-pointer disabled:opacity-50 active:scale-98 shadow-lg"
        >
          {{ isConnecting ? 'در حال برقراری ارتباط...' : 'اتصال به نمایشگر' }}
        </button>
      </div>

      <div v-if="connectionError" class="text-xs text-[#fca5a5] pt-1">
        {{ connectionError }}
      </div>
    </div>

    <!-- بدنه اصلی کنترلر پس از اتصال: اسکرول نرم عمودی و دسترسی آسان به تمام امکانات -->
    <main v-else class="flex-1 overflow-y-auto max-w-sm w-full mx-auto space-y-3 py-2 px-1 overscroll-contain">
      <!-- کارت مشخصات صفحه کنونی نمایشگر -->
      <div class="p-2.5 bg-[#14151d] border border-[rgba(237,232,223,0.12)] rounded-md text-center">
        <div class="text-[10px] text-[#b45309] font-bold">
          فصل {{ currentChapter.number }} از {{ toPersianDigits(totalPages) }}
        </div>
        <h3 class="text-xs sm:text-sm font-black text-[#ede8df] truncate mt-0.5">
          {{ currentChapter.title }}
        </h3>
      </div>

      <!-- دکمه‌های ناوبری اصلی (ورق زدن فصول) -->
      <div class="grid grid-cols-2 gap-2.5">
        <!-- صفحه قبل -->
        <button 
          @click="handlePrev" 
          :disabled="currentPage <= 1"
          class="h-16 bg-[#1b1c26] active:bg-[#252736] disabled:opacity-30 border border-[rgba(237,232,223,0.15)] rounded-md flex flex-col items-center justify-center gap-1 cursor-pointer transition-transform active:scale-95 shadow-lg group"
        >
          <span class="text-lg text-[#a8a39a] group-hover:text-white transition-colors">▶</span>
          <span class="text-xs font-bold text-[#ede8df]">صفحه قبل</span>
        </button>

        <!-- صفحه بعد -->
        <button 
          @click="handleNext" 
          :disabled="currentPage >= totalPages"
          class="h-16 bg-[#b45309] active:bg-[#92400e] disabled:opacity-30 border border-[#b45309] rounded-md flex flex-col items-center justify-center gap-1 cursor-pointer transition-transform active:scale-95 shadow-xl group text-white"
        >
          <span class="text-lg transition-transform group-hover:-translate-x-1">◀</span>
          <span class="text-xs font-black">صفحه بعد</span>
        </button>
      </div>

      <!-- کنترل‌های اسکرول صفحه مانیتور از راه دور -->
      <div class="grid grid-cols-2 gap-2.5">
        <!-- اسکرول به بالا -->
        <button 
          @click="handleScrollUp" 
          class="h-11 bg-[#161722] active:bg-[#222436] border border-[rgba(237,232,223,0.12)] rounded-md flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95 text-[#ede8df]"
        >
          <span class="text-sm text-[#f59e0b]">▲</span>
          <span class="text-xs font-bold">اسکرول بالا</span>
        </button>

        <!-- اسکرول به پایین -->
        <button 
          @click="handleScrollDown" 
          class="h-11 bg-[#161722] active:bg-[#222436] border border-[rgba(237,232,223,0.12)] rounded-md flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95 text-[#ede8df]"
        >
          <span class="text-sm text-[#f59e0b]">▼</span>
          <span class="text-xs font-bold">اسکرول پایین</span>
        </button>
      </div>

      <!-- کارت مستقل و پیشرفته پلیر روایت صوتی فصل (کاملاً تفکیک‌شده از موسیقی متن) -->
      <div class="p-3.5 bg-[#12141c] border border-[#b45309]/30 rounded-md space-y-3 shadow-xl relative overflow-hidden">
        <div class="absolute -top-10 -left-10 w-28 h-28 bg-[#b45309]/10 rounded-full blur-2xl pointer-events-none"></div>

        <!-- سربرگ کارت گفتار -->
        <div class="flex justify-between items-center text-xs pb-2 border-b border-[rgba(237,232,223,0.08)]">
          <div class="flex items-center gap-2">
            <span class="text-base">🎙️</span>
            <div>
              <div class="text-[10px] text-[#b45309] font-bold">روایت و تحلیل صوتی فصل</div>
              <div class="text-xs font-black text-[#ede8df]">
                {{ hasSpeechAudio ? `گفتار فصل ${currentChapter.number}` : 'فاقد فایل صوتی' }}
              </div>
            </div>
          </div>
          <!-- نشانگر وضعیت -->
          <div 
            v-if="hasSpeechAudio" 
            class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1.5"
            :class="isSpeechPlaying 
              ? 'bg-[#15803d]/25 text-[#86efac] border border-[#22c55e]/40' 
              : 'bg-[#262626] text-[#a8a39a] border border-white/10'"
          >
            <span class="w-1.5 h-1.5 rounded-full" :class="isSpeechPlaying ? 'bg-[#22c55e] animate-pulse' : 'bg-[#736f68]'"></span>
            <span>{{ isSpeechPlaying ? 'در حال پخش' : 'آماده پخش' }}</span>
          </div>
        </div>

        <template v-if="hasSpeechAudio">
          <!-- اسکرابر و نوار پیشرفت زمانی فایل صوتی -->
          <div class="space-y-1">
            <input 
              type="range" 
              min="0" 
              :max="speechDuration || 100" 
              :value="isDraggingSpeechTime ? localSpeechTime : speechCurrentTime"
              @input="handleSpeechScrubInput"
              @change="handleSpeechScrubChange"
              class="w-full h-2 bg-[#20222e] rounded-lg appearance-none cursor-pointer accent-[#f59e0b]"
            />
            <div class="flex justify-between items-center text-[10px] font-mono text-[#a8a39a]">
              <span>{{ formatTime(isDraggingSpeechTime ? localSpeechTime : speechCurrentTime) }}</span>
              <span>{{ formatTime(speechDuration) }}</span>
            </div>
          </div>

          <!-- کلیدهای کنترل قطعه: عقب ۱۰ ثانیه | پخش/توقف | جلو ۱۰ ثانیه -->
          <div class="grid grid-cols-3 gap-2 items-center">
            <!-- عقب بردن ۱۰ ثانیه -->
            <button 
              @click="handleSpeechRewind"
              class="h-10 bg-[#1a1c26] active:bg-[#252838] border border-[rgba(237,232,223,0.1)] rounded-md flex items-center justify-center gap-1 text-xs font-bold text-[#ede8df] cursor-pointer transition-transform active:scale-95"
              title="۱۰ ثانیه به عقب"
            >
              <span class="text-sm">↺</span>
              <span>-۱۰ث</span>
            </button>

            <!-- دکمه مرکزی بزرگ پخش و توقف گفتار -->
            <button 
              @click="handleToggleSpeech"
              class="h-11 rounded-md font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg active:scale-95"
              :class="isSpeechPlaying
                ? 'bg-[#15803d] active:bg-[#166534] text-white border border-[#22c55e]/60 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                : 'bg-[#b45309] active:bg-[#92400e] text-white border border-[#f59e0b]/80 shadow-[0_0_15px_rgba(180,83,9,0.35)]'"
            >
              <span class="text-base">{{ isSpeechPlaying ? '⏸' : '▶' }}</span>
              <span>{{ isSpeechPlaying ? 'توقف گفتار' : 'پخش گفتار فصل' }}</span>
            </button>

            <!-- جلو بردن ۱۰ ثانیه -->
            <button 
              @click="handleSpeechForward"
              class="h-10 bg-[#1a1c26] active:bg-[#252838] border border-[rgba(237,232,223,0.1)] rounded-md flex items-center justify-center gap-1 text-xs font-bold text-[#ede8df] cursor-pointer transition-transform active:scale-95"
              title="۱۰ ثانیه به جلو"
            >
              <span>+۱۰ث</span>
              <span class="text-sm">↻</span>
            </button>
          </div>

          <!-- اسلایدر اختصاصی ولوم صدای راوی -->
          <div class="pt-2 border-t border-[rgba(237,232,223,0.06)] space-y-1">
            <div class="flex justify-between items-center text-[11px]">
              <span class="text-[#a8a39a] flex items-center gap-1">
                <span>🗣️</span>
                <span>ولوم صدای راوی:</span>
              </span>
              <span class="font-mono font-bold text-[#f59e0b]">
                {{ toPersianDigits(localSpeechVolume) }}٪
              </span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              :value="localSpeechVolume" 
              @input="handleSpeechVolumeInput"
              @change="handleSpeechVolumeChange"
              class="w-full h-1.5 bg-[#20222e] rounded-lg appearance-none cursor-pointer accent-[#f59e0b]"
            />
          </div>
        </template>

        <!-- پیام مخصوص فصل ۱۱ (کتاب‌شناسی) -->
        <div v-else class="p-3 bg-[#181922] border border-dashed border-white/10 rounded text-center text-xs text-[#a8a39a]">
          فصل ۱۱ بخش اسناد و مراجع بوده و فاقد قطعه صوتی گفتار است.
        </div>
      </div>

      <!-- کارت اختصاصی کنترل بلندی صدا و وضعیت پخش موسیقی متن پس‌زمینه -->
      <div class="p-3 bg-[#14151d] border border-[rgba(237,232,223,0.12)] rounded-md space-y-2">
        <div class="flex justify-between items-center text-xs">
          <span class="font-bold text-[#ede8df] flex items-center gap-1.5">
            <span>🎵</span>
            تنظیم صدای موسیقی متن
          </span>
          <span class="font-mono font-bold text-[#f59e0b]">
            {{ toPersianDigits(localVolume) }}٪
          </span>
        </div>

        <!-- اسلایدر صدای موسیقی متن -->
        <input 
          type="range" 
          min="0" 
          max="100" 
          :value="localVolume" 
          @input="handleVolumeInput"
          @change="handleVolumeChange"
          @pointerdown="isDraggingVolume = true"
          @pointerup="handleVolumeChange"
          @touchstart="isDraggingVolume = true"
          @touchend="handleVolumeChange"
          class="w-full h-2 bg-[#222430] rounded-lg appearance-none cursor-pointer accent-[#b45309]"
        />

        <!-- کلید اختصاصی کنترل موسیقی متن در نمایشگر -->
        <div class="pt-1.5 border-t border-[rgba(237,232,223,0.08)]">
          <button 
            @click="handleTogglePlay"
            class="w-full py-2.5 px-3 rounded-sm text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md active:scale-98"
            :class="isAudioPlaying 
              ? 'bg-[#365314] active:bg-[#1a2e05] text-[#bef264] border border-[#65a30d]/60 shadow-[0_0_12px_rgba(101,163,13,0.3)]' 
              : 'bg-[#27272a] active:bg-[#18181b] text-white border border-white/20 shadow-md'"
          >
            <span class="text-sm">{{ isAudioPlaying ? '⏸' : '▶' }}</span>
            <span>{{ isAudioPlaying ? 'توقف موسیقی متن در نمایشگر' : 'پخش موسیقی متن در نمایشگر' }}</span>
          </button>
        </div>
      </div>

      <!-- فهرست پرش سریع به فصل‌ها -->
      <div class="p-2 bg-[#111217] border border-[rgba(237,232,223,0.08)] rounded-md">
        <label class="block text-[10px] text-[#736f68] mb-0.5">پرش مستقیم به فصل:</label>
        <select 
          :value="currentPage" 
          @change="(e) => gotoPage(Number(e.target.value))"
          class="w-full bg-[#1c1d27] border border-[rgba(237,232,223,0.15)] rounded p-1 text-xs text-[#ede8df] focus:outline-none"
        >
          <option v-for="ch in chapters" :key="ch.id" :value="ch.id">
            فصل {{ ch.number }}: {{ ch.title }}
          </option>
        </select>
      </div>
    </main>

    <!-- فوتر پایین کنترلر -->
    <footer class="pt-2 border-t border-[rgba(237,232,223,0.08)] text-center text-[10px] text-[#736f68] shrink-0">
      ترازوی تاریخ • ریموت کنترل هماهنگ با سرور ورسل (Vercel)
    </footer>
  </div>
</template>
