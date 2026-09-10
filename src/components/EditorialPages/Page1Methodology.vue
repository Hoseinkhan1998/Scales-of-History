<script setup>
import { chapters } from '../../data/publicationData';

const chapter = chapters[0];
</script>

<template>
  <article class="max-w-5xl mx-auto py-8 px-4 sm:px-8 space-y-8 animate-fadeIn">
    <!-- سرنویس فصل و دسته‌بندی موضوعی -->
    <div class="border-b-2 border-[rgba(237,232,223,0.15)] pb-6 text-center md:text-right">
      <div class="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-[#b45309] mb-2 uppercase tracking-widest">
        <span>فصل نخست</span>
        <span>•</span>
        <span>{{ chapter.kicker }}</span>
        <span>•</span>
        <span class="text-[#736f68]">زمان مطالعه: {{ chapter.readTime }}</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-black text-[#ede8df] leading-tight font-serif">
        {{ chapter.title }}
      </h1>
      <p class="text-lg text-[#a8a39a] mt-3 font-light max-w-3xl leading-relaxed">
        {{ chapter.summary }}
      </p>
    </div>

    <!-- نقل‌قول سردبیری -->
    <blockquote class="p-6 bg-[#13141b] border-r-4 border-[#b45309] rounded-sm text-base sm:text-lg text-[#ede8df] font-serif leading-loose italic">
      {{ chapter.leadQuote }}
    </blockquote>

    <!-- متن مقاله و ستون‌های روزنامه‌ای -->
    <div class="space-y-6 text-[#ede8df] text-base sm:text-lg leading-relaxed text-justify font-light">
      <h3 class="text-2xl font-black text-[#ede8df] border-b border-[rgba(237,232,223,0.1)] pb-2 font-serif">
        {{ chapter.contentBlocks[0].heading }}
      </h3>
      <div class="newspaper-cols-2 space-y-4">
        <p>
          {{ chapter.contentBlocks[0].paragraphs[0] }}
        </p>
        <p>
          {{ chapter.contentBlocks[0].paragraphs[1] }}
        </p>
      </div>
    </div>

    <!-- ماتریس دسته‌بندی شش‌گانه حوزه‌های ارزیابی -->
    <div class="my-8 bg-[#14151e] border border-[rgba(237,232,223,0.15)] rounded-sm p-6">
      <h4 class="text-lg font-black text-[#ede8df] mb-4 border-b border-[rgba(237,232,223,0.1)] pb-2">
        {{ chapter.contentBlocks[1].heading }}
      </h4>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="(item, idx) in chapter.contentBlocks[1].items" 
          :key="idx"
          class="bg-[#1b1c26] p-4 border border-[rgba(237,232,223,0.08)]"
        >
          <div class="text-sm font-bold text-[#b45309] mb-1.5">{{ item.title }}</div>
          <p class="text-xs text-[#a8a39a] leading-relaxed">{{ item.desc }}</p>
        </div>
      </div>
    </div>

    <!-- یادداشت روش‌شناسی و اعتبار داده‌ها -->
    <div class="p-5 bg-[#171821] border border-[rgba(237,232,223,0.1)] rounded-sm flex items-start gap-4">
      <div class="text-2xl text-[#b45309] shrink-0">⚖️</div>
      <div class="text-xs text-[#a8a39a] leading-relaxed">
        <strong class="text-[#ede8df] block mb-1 text-sm">{{ chapter.contentBlocks[2].heading }}</strong>
        {{ chapter.contentBlocks[2].text }}
      </div>
    </div>
  </article>
</template>
