<script setup>
import { computed } from 'vue';
import { useSyncState } from '../composables/useSyncState';
import { chapters } from '../data/publicationData';
import { toPersianDigits } from '../utils/persianNumbers';

const { currentPage, totalPages, nextPage, prevPage, gotoPage } = useSyncState();

const currentChapter = computed(() => {
  return chapters.find(c => c.id === currentPage.value) || chapters[0];
});

const prevChapter = computed(() => {
  return chapters.find(c => c.id === currentPage.value - 1) || null;
});

const nextChapter = computed(() => {
  return chapters.find(c => c.id === currentPage.value + 1) || null;
});
</script>

<template>
  <nav class="w-full bg-[#0a0b0e] border-t border-[rgba(237,232,223,0.15)] py-3 px-4 sm:px-8 select-none sticky bottom-0 z-30 backdrop-blur-md bg-opacity-95">
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
      <!-- دکمه صفحه قبل با عرض کاملاً ثابت ۱۸۰ پیکسل جهت جلوگیری از لرزش چیدمان -->
      <div class="w-44 shrink-0 flex justify-start">
        <button 
          @click="prevPage"
          :disabled="currentPage <= 1"
          class="w-44 h-12 flex items-center justify-start gap-2.5 px-3 bg-[#14151d] hover:bg-[#1f202c] disabled:opacity-25 disabled:pointer-events-none border border-[rgba(237,232,223,0.1)] rounded-sm text-xs text-[#ede8df] transition-all cursor-pointer group"
        >
          <span class="text-sm text-[#b45309] group-hover:scale-110 transition-transform shrink-0">▶</span>
          <div class="text-right overflow-hidden">
            <div class="text-[10px] text-[#736f68] leading-none mb-1">فصل پیشین</div>
            <div class="font-bold truncate text-[11px] leading-tight text-[#ede8df]">
              {{ prevChapter ? prevChapter.title : 'آغاز نشریه' }}
            </div>
          </div>
        </button>
      </div>

      <!-- ناوبری نشانگرهای عددی و صفحات به صورت کاملاً متمرکز و ثابت در مرکز -->
      <div class="flex-1 flex items-center justify-center gap-1.5 flex-wrap">
        <button 
          v-for="ch in chapters" 
          :key="ch.id"
          @click="gotoPage(ch.id)"
          class="w-7 h-7 flex items-center justify-center text-xs font-bold transition-all rounded-sm cursor-pointer border"
          :class="ch.id === currentPage 
            ? 'bg-[#ede8df] text-[#0d0e11] border-white shadow-md font-black scale-110' 
            : 'bg-[#14151c] text-[#736f68] hover:text-[#ede8df] hover:border-[rgba(237,232,223,0.3)] border-[rgba(237,232,223,0.08)]'"
          :title="`فصل ${ch.number}: ${ch.title}`"
        >
          {{ toPersianDigits(ch.id) }}
        </button>
      </div>

      <!-- دکمه صفحه بعد با عرض کاملاً ثابت ۱۸۰ پیکسل جهت جلوگیری از لرزش چیدمان -->
      <div class="w-44 shrink-0 flex justify-end">
        <button 
          @click="nextPage"
          :disabled="currentPage >= totalPages"
          class="w-44 h-12 flex items-center justify-between gap-2.5 px-3 bg-[#b45309] hover:bg-[#d97706] disabled:opacity-25 disabled:pointer-events-none rounded-sm text-xs text-white font-bold transition-all cursor-pointer group shadow-lg"
        >
          <div class="text-right overflow-hidden">
            <div class="text-[10px] text-white/70 leading-none mb-1">فصل بعدی</div>
            <div class="truncate text-[11px] leading-tight text-white font-bold">
              {{ nextChapter ? nextChapter.title : 'پایان نشریه' }}
            </div>
          </div>
          <span class="text-sm group-hover:-translate-x-1 transition-transform shrink-0">◀</span>
        </button>
      </div>
    </div>
  </nav>
</template>
