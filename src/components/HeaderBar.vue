<script setup>
import { useSyncState } from '../composables/useSyncState';
import { publicationMeta } from '../data/publicationData';
import { toPersianDigits } from '../utils/persianNumbers';

const { currentPage, totalPages } = useSyncState();
</script>

<template>
  <header class="w-full bg-[#0a0b0e] border-b border-[rgba(237,232,223,0.15)] select-none sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
    <!-- سرلوحه اصلی نشریه (Masthead) -->
    <div class="py-4 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-right">
      <div>
        <div class="text-[11px] font-bold text-[#b45309] tracking-widest uppercase">
          ویژه‌نامه تحلیلی پژوهش تاریخی
        </div>
        <h2 class="text-2xl sm:text-3xl font-black text-[#ede8df] tracking-tight font-serif mt-0.5">
          {{ publicationMeta.title }}
        </h2>
      </div>

      <div class="hidden lg:block text-left text-xs text-[#a8a39a] max-w-md leading-relaxed">
        {{ publicationMeta.subtitle }}
      </div>

      <!-- نشانگر صفحه کنونی -->
      <div class="flex items-center gap-2 bg-[#13141b] py-1 px-3 border border-[rgba(237,232,223,0.1)] rounded-sm">
        <span class="text-xs text-[#736f68]">فصل:</span>
        <span class="text-sm font-black text-[#ede8df]">{{ toPersianDigits(currentPage) }}</span>
        <span class="text-xs text-[#736f68]">از {{ toPersianDigits(totalPages) }}</span>
      </div>
    </div>
  </header>
</template>
