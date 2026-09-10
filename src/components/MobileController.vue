<script setup>
import { ref, onMounted, computed } from 'vue';
import { useSyncState } from '../composables/useSyncState';
import { chapters } from '../data/publicationData';
import { toPersianDigits } from '../utils/persianNumbers';

const { 
  currentPage, 
  totalPages, 
  volume, 
  isAudioPlaying, 
  isConnected, 
  roomId, 
  connectionError,
  connectAsController,
  nextPage,
  prevPage,
  gotoPage,
  setVolume,
  toggleAudio
} = useSyncState();

const inputCode = ref('');
const isConnecting = ref(false);

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

function handleVolumeChange(e) {
  const newVol = Number(e.target.value);
  setVolume(newVol);
}

function handleTogglePlay() {
  triggerHaptic();
  toggleAudio();
}

function handleConnectManual() {
  if (!inputCode.value.trim()) return;
  isConnecting.value = true;
  connectAsController(inputCode.value.trim());
  setTimeout(() => { isConnecting.value = false; }, 2000);
}

onMounted(() => {
  // بررسی وجود کد اتاق در آدرس مرورگر
  const params = new URLSearchParams(window.location.search);
  const roomParam = params.get('room');
  if (roomParam) {
    inputCode.value = roomParam;
    connectAsController(roomParam);
  }
});
</script>

<template>
  <div class="min-h-screen bg-[#090a0d] text-[#ede8df] flex flex-col justify-between p-5 select-none font-sans" dir="rtl">
    <!-- وضعیت بالای صفحه کنترلر -->
    <header class="w-full flex justify-between items-center pb-4 border-b border-[rgba(237,232,223,0.12)]">
      <div class="flex items-center gap-2">
        <span 
          class="w-2.5 h-2.5 rounded-full"
          :class="isConnected ? 'bg-[#22c55e] shadow-[0_0_10px_#22c55e]' : 'bg-[#ef4444] animate-pulse'"
        ></span>
        <span class="text-xs font-bold text-[#ede8df]">
          {{ isConnected ? `متصل به اتاق ${roomId}` : 'در انتظار اتصال به نمایشگر' }}
        </span>
      </div>
      <span class="text-[11px] text-[#b45309] font-mono font-bold tracking-wider">
        ریموت کنترل هوشمند
      </span>
    </header>

    <!-- در صورت عدم اتصال: فرم ورود کد اتاق -->
    <div v-if="!isConnected" class="my-auto max-w-sm w-full mx-auto p-6 bg-[#13141b] border border-[rgba(237,232,223,0.15)] rounded-md text-center space-y-4">
      <div class="w-12 h-12 mx-auto bg-[#b45309]/20 rounded-full flex items-center justify-center text-[#f59e0b] text-xl">
        📱
      </div>
      <h2 class="text-lg font-black text-[#ede8df]">اتصال به نمایشگر اصلی</h2>
      <p class="text-xs text-[#a8a39a] leading-relaxed">
        کد نمایان‌شده در گوشه صفحه مانیتور یا تلویزیون را در کادر زیر وارد کنید:
      </p>

      <div class="flex gap-2">
        <input 
          v-model="inputCode" 
          type="text" 
          placeholder="مثال: IR-8K9P" 
          class="flex-1 bg-[#1a1c24] border border-[rgba(237,232,223,0.2)] rounded-sm p-3 text-center font-mono font-bold text-lg tracking-widest uppercase focus:outline-none focus:border-[#b45309]"
          maxlength="8"
          @keyup.enter="handleConnectManual"
        />
        <button 
          @click="handleConnectManual"
          :disabled="isConnecting"
          class="px-5 bg-[#b45309] hover:bg-[#d97706] text-white font-bold text-sm rounded-sm transition-all cursor-pointer disabled:opacity-50"
        >
          {{ isConnecting ? '...' : 'اتصال' }}
        </button>
      </div>

      <div v-if="connectionError" class="text-xs text-[#fca5a5] pt-1">
        {{ connectionError }}
      </div>
    </div>

    <!-- بدنه اصلی کنترلر پس از اتصال -->
    <main v-else class="my-auto max-w-sm w-full mx-auto space-y-6">
      <!-- کارت مشخصات صفحه کنونی نمایشگر -->
      <div class="p-4 bg-[#14151d] border border-[rgba(237,232,223,0.12)] rounded-md text-center">
        <div class="text-[11px] text-[#b45309] font-bold mb-1">
          فصل {{ currentChapter.number }} از {{ toPersianDigits(totalPages) }}
        </div>
        <h3 class="text-base font-black text-[#ede8df] truncate">
          {{ currentChapter.title }}
        </h3>
        <span class="text-[10px] text-[#736f68] mt-1 block">
          نمایش زنده در مانیتور اصلی
        </span>
      </div>

      <!-- دکمه‌های ارگونومیک بزرگ ناوبری (ورق زدن) -->
      <div class="grid grid-cols-2 gap-4">
        <!-- صفحه قبل -->
        <button 
          @click="handlePrev" 
          :disabled="currentPage <= 1"
          class="h-32 bg-[#1b1c26] active:bg-[#252736] disabled:opacity-30 border border-[rgba(237,232,223,0.15)] rounded-md flex flex-col items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95 shadow-lg group"
        >
          <span class="text-3xl text-[#a8a39a] group-hover:text-white transition-colors">▶</span>
          <span class="text-sm font-bold text-[#ede8df]">صفحه قبل</span>
        </button>

        <!-- صفحه بعد -->
        <button 
          @click="handleNext" 
          :disabled="currentPage >= totalPages"
          class="h-32 bg-[#b45309] active:bg-[#92400e] disabled:opacity-30 border border-[#b45309] rounded-md flex flex-col items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95 shadow-xl group text-white"
        >
          <span class="text-3xl transition-transform group-hover:-translate-x-1">◀</span>
          <span class="text-sm font-black">صفحه بعد</span>
        </button>
      </div>

      <!-- کنترل بلندی صدا و وضعیت پخش -->
      <div class="p-5 bg-[#14151d] border border-[rgba(237,232,223,0.12)] rounded-md space-y-4">
        <div class="flex justify-between items-center">
          <span class="text-xs font-bold text-[#ede8df] flex items-center gap-2">
            <span>🔊</span>
            تنظیم صدای نمایشگر
          </span>
          <span class="text-xs font-mono font-bold text-[#f59e0b]">
            {{ toPersianDigits(volume) }}٪
          </span>
        </div>

        <!-- اسلایدر صدا -->
        <input 
          type="range" 
          min="0" 
          max="100" 
          :value="volume" 
          @input="handleVolumeChange"
          class="w-full h-2 bg-[#222430] rounded-lg appearance-none cursor-pointer accent-[#b45309]"
        />

        <div class="flex justify-between items-center pt-2 border-t border-[rgba(237,232,223,0.06)]">
          <span class="text-[11px] text-[#736f68]">وضعیت موسیقی:</span>
          <button 
            @click="handleTogglePlay"
            class="px-4 py-1.5 rounded text-xs font-bold transition-all cursor-pointer"
            :class="isAudioPlaying ? 'bg-[#3f6212] text-[#bef264]' : 'bg-[#262835] text-[#a8a39a]'"
          >
            {{ isAudioPlaying ? 'در حال پخش (کلیک برای مکث)' : 'متوقف (کلیک برای پخش)' }}
          </button>
        </div>
      </div>

      <!-- فهرست پرش سریع به فصل‌ها -->
      <div class="p-3 bg-[#111217] border border-[rgba(237,232,223,0.08)] rounded-md">
        <label class="block text-[11px] text-[#736f68] mb-1.5">پرش مستقیم به فصل:</label>
        <select 
          :value="currentPage" 
          @change="(e) => gotoPage(Number(e.target.value))"
          class="w-full bg-[#1c1d27] border border-[rgba(237,232,223,0.15)] rounded p-2 text-xs text-[#ede8df] focus:outline-none"
        >
          <option v-for="ch in chapters" :key="ch.id" :value="ch.id">
            فصل {{ ch.number }}: {{ ch.title }}
          </option>
        </select>
      </div>
    </main>

    <!-- فوتر پایین کنترلر -->
    <footer class="pt-4 border-t border-[rgba(237,232,223,0.08)] text-center text-[10px] text-[#736f68]">
      ترازوی تاریخ • ریموت کنترل هماهنگ با استقرار سرور ابری Vercel
    </footer>
  </div>
</template>
