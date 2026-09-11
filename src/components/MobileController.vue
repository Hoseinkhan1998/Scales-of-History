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

// مدیریت محلی و تراتل اسلایدر ولوم برای جلوگیری قطعی از پرش و لگ حرکتی
const localVolume = ref(volume.value);
let isDraggingVolume = false;
let volumeThrottleTimer = null;

watch(volume, (newVal) => {
  if (!isDraggingVolume) {
    localVolume.value = newVal;
  }
});

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
  <!-- کانتینر فیکس و غیرقابل اسکرول برای تبدیل گوشی به ریموت سخت‌افزاری واقعی -->
  <div class="fixed inset-0 h-[100dvh] max-h-[100dvh] w-full overflow-hidden bg-[#090a0d] text-[#ede8df] flex flex-col justify-between p-3.5 sm:p-5 select-none font-sans touch-none overscroll-none" dir="rtl">
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

    <!-- در صورت عدم اتصال: فرم ورود کد ۳ رقمی اتاق با دکمه اتصال زیر کادر -->
    <div v-if="!isConnected" class="my-auto max-w-sm w-full mx-auto p-6 bg-[#13141b] border border-[rgba(237,232,223,0.15)] rounded-md text-center space-y-4">
      <div class="w-12 h-12 mx-auto bg-[#b45309]/20 rounded-full flex items-center justify-center text-[#f59e0b] text-xl">
        📱
      </div>
      <h2 class="text-lg font-black text-[#ede8df]">اتصال به نمایشگر اصلی</h2>
      <p class="text-xs text-[#a8a39a] leading-relaxed">
        کد ۳ رقمی نمایان‌شده روی صفحه دسکتاپ را وارد کنید:
      </p>

      <!-- چیدمان عمودی: اینپوت بالا و دکمه اتصال دقیقاً زیر آن -->
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

    <!-- بدنه اصلی کنترلر پس از اتصال: اندازه دقیق و بدون اسکرول -->
    <main v-else class="my-auto max-w-sm w-full mx-auto space-y-3 shrink-0">
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
          class="h-20 bg-[#1b1c26] active:bg-[#252736] disabled:opacity-30 border border-[rgba(237,232,223,0.15)] rounded-md flex flex-col items-center justify-center gap-1 cursor-pointer transition-transform active:scale-95 shadow-lg group"
        >
          <span class="text-xl text-[#a8a39a] group-hover:text-white transition-colors">▶</span>
          <span class="text-xs font-bold text-[#ede8df]">صفحه قبل</span>
        </button>

        <!-- صفحه بعد -->
        <button 
          @click="handleNext" 
          :disabled="currentPage >= totalPages"
          class="h-20 bg-[#b45309] active:bg-[#92400e] disabled:opacity-30 border border-[#b45309] rounded-md flex flex-col items-center justify-center gap-1 cursor-pointer transition-transform active:scale-95 shadow-xl group text-white"
        >
          <span class="text-xl transition-transform group-hover:-translate-x-1">◀</span>
          <span class="text-xs font-black">صفحه بعد</span>
        </button>
      </div>

      <!-- کنترل‌های اسکرول صفحه مانیتور از راه دور -->
      <div class="grid grid-cols-2 gap-2.5">
        <!-- اسکرول به بالا -->
        <button 
          @click="handleScrollUp" 
          class="h-12 bg-[#161722] active:bg-[#222436] border border-[rgba(237,232,223,0.12)] rounded-md flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95 text-[#ede8df]"
        >
          <span class="text-sm text-[#f59e0b]">▲</span>
          <span class="text-xs font-bold">اسکرول بالا</span>
        </button>

        <!-- اسکرول به پایین -->
        <button 
          @click="handleScrollDown" 
          class="h-12 bg-[#161722] active:bg-[#222436] border border-[rgba(237,232,223,0.12)] rounded-md flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95 text-[#ede8df]"
        >
          <span class="text-sm text-[#f59e0b]">▼</span>
          <span class="text-xs font-bold">اسکرول پایین</span>
        </button>
      </div>

      <!-- کنترل بلندی صدا و وضعیت پخش -->
      <div class="p-3 bg-[#14151d] border border-[rgba(237,232,223,0.12)] rounded-md space-y-2">
        <div class="flex justify-between items-center text-xs">
          <span class="font-bold text-[#ede8df] flex items-center gap-1.5">
            <span>🔊</span>
            تنظیم صدای نمایشگر
          </span>
          <span class="font-mono font-bold text-[#f59e0b]">
            {{ toPersianDigits(localVolume) }}٪
          </span>
        </div>

        <!-- اسلایدر صدا کاملاً نرم، بدون پرش و با پاسخ‌دهی آنی -->
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

        <!-- کلید اختصاصی و برجسته کنترل بیدرنگ موسیقی در نمایشگر -->
        <div class="pt-1.5 border-t border-[rgba(237,232,223,0.08)]">
          <button 
            @click="handleTogglePlay"
            class="w-full py-2.5 px-3 rounded-sm text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md active:scale-98"
            :class="isAudioPlaying 
              ? 'bg-[#365314] active:bg-[#1a2e05] text-[#bef264] border border-[#65a30d]/60 shadow-[0_0_12px_rgba(101,163,13,0.3)]' 
              : 'bg-[#b45309] active:bg-[#78350f] text-white border border-[#f59e0b]/80 shadow-[0_0_15px_rgba(180,83,9,0.4)]'"
          >
            <span class="text-sm">{{ isAudioPlaying ? '⏸' : '▶' }}</span>
            <span>{{ isAudioPlaying ? 'توقف موسیقی در نمایشگر' : 'پخش فوری موسیقی در نمایشگر' }}</span>
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
