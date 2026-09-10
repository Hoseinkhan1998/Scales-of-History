<script setup>
import { chapters } from '../../data/publicationData';

const chapter = chapters[8];
</script>

<template>
  <article class="max-w-5xl mx-auto py-8 px-4 sm:px-8 space-y-8 animate-fadeIn">
    <!-- سرنویس فصل -->
    <div class="border-b-2 border-[rgba(237,232,223,0.15)] pb-6 text-center md:text-right">
      <div class="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-[#b45309] mb-2 uppercase tracking-widest">
        <span>فصل نهم</span>
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

    <!-- متن تحلیل فرضی و سناریونویسی -->
    <div class="space-y-4 text-[#ede8df] text-base sm:text-lg leading-relaxed text-justify font-light">
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

    <!-- کارت‌های سه سناریوی تاریخی جایگزین -->
    <div class="my-8 space-y-4">
      <h4 class="text-lg font-black text-[#ede8df] border-b border-[rgba(237,232,223,0.1)] pb-2">
        سه شاخه فرضی از مسیر تحولات معاصر
      </h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          v-for="(sc, idx) in chapter.contentBlocks[1].items" 
          :key="idx"
          class="bg-[#181921] p-5 border border-[rgba(237,232,223,0.1)] rounded-sm flex flex-col justify-between"
        >
          <div>
            <span class="text-[10px] font-bold text-[#b45309] bg-[#b45309]/15 px-2 py-0.5 rounded-full inline-block mb-2">
              {{ sc.prob }}
            </span>
            <div class="text-sm font-bold text-[#ede8df] mb-2 leading-tight">
              {{ sc.title }}
            </div>
          </div>
          <p class="text-xs text-[#a8a39a] leading-relaxed pt-3 border-t border-[rgba(237,232,223,0.06)] mt-2">
            {{ sc.desc }}
          </p>
        </div>
      </div>
    </div>

    <!-- پانویس متدولوژی تاریخ فرضی -->
    <div class="p-4 bg-[#14151e] border-r-2 border-[#b45309] text-xs text-[#a8a39a] leading-relaxed">
      <strong>تذکر روش‌شناختی:</strong>
      تحلیل‌های تاریخ جایگزین (Counterfactual History) نه برای حسرت‌ورزی نوستالژیک، بلکه برای درک وزن متغیرهای عینی (مانند نوسانات قیمت نفت و تقاضای طبقه متوسط برای دموکراسی) در علم اقتصاد سیاسی به کار گرفته می‌شوند.
    </div>
  </article>
</template>
