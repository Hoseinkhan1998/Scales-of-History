<script setup>
import { chapters } from '../../data/publicationData';
import { citationsList } from '../../data/citationsData';
import { toPersianDigits } from '../../utils/persianNumbers';
import TermHighlight from '../Common/TermHighlight.vue';

const chapter = chapters[10];
</script>

<template>
  <article class="max-w-5xl mx-auto py-8 px-4 sm:px-8 space-y-8 animate-fadeIn">
    <!-- سرنویس فصل -->
    <div class="border-b-2 border-[rgba(237,232,223,0.15)] pb-6 text-center md:text-right">
      <div class="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-[#b45309] mb-2 uppercase tracking-widest">
        <span>فصل یازدهم</span>
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

    <!-- مقدمه کتاب‌شناسی -->
    <div class="p-4 bg-[#161720] border border-[rgba(237,232,223,0.1)] rounded-sm text-xs text-[#a8a39a] leading-relaxed">
      تمامی ارقام، تحلیل‌ها و جداول ارائه شده در این نشریه بر پایه 
      <TermHighlight 
        term="کتاب‌شناسی انتقادی" 
        en="Critical Bibliography" 
        category="پژوهش آکادمیک و متدولوژی"
        definition="روش‌شناسی ارزیابی منابع علمی که در آن سوگیری‌های ایدئولوژیک یا تبلیغاتی طرفین پالایش شده و داده‌های کمی نهادهای جهانی مبنا قرار می‌گیرد."
      />
      و داده‌های آماری بانک جهانی، صندوق بین‌المللی پول و کتب معتبر دانشگاهی استخراج شده است.
    </div>

    <!-- فهرست کتاب‌شناسی و ارجاعات آکادمیک -->
    <div class="space-y-4 my-8">
      <div 
        v-for="item in citationsList" 
        :key="item.id"
        class="bg-[#14151d] p-5 border border-[rgba(237,232,223,0.1)] hover:border-[rgba(237,232,223,0.3)] transition-all rounded-sm"
      >
        <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
          <div class="text-sm font-bold text-[#ede8df] flex items-center gap-2">
            <span class="w-5 h-5 rounded-full bg-[#b45309]/20 text-[#f59e0b] font-mono text-xs flex items-center justify-center">
              {{ toPersianDigits(item.id) }}
            </span>
            <span>{{ item.author }}</span>
          </div>
          <span class="text-xs text-[#b45309] font-mono">{{ item.publisher }}</span>
        </div>

        <div class="text-xs font-semibold text-[#a8a39a] mb-2 pr-7">
          «{{ item.work }}»
        </div>

        <p class="text-[11px] text-[#736f68] leading-relaxed pr-7 border-t border-[rgba(237,232,223,0.06)] pt-2">
          {{ item.annotation }}
        </p>
      </div>
    </div>

    <!-- شناسنامه پایانی اثر -->
    <div class="p-6 bg-[#0a0b0e] border border-[rgba(237,232,223,0.15)] rounded-sm text-center space-y-3">
      <div class="text-sm font-bold text-[#ede8df]">
        پایان ویژه‌نامه تحلیلی ترازوی تاریخ • شهریور ۱۴۰۵
      </div>
      <p class="text-xs text-[#736f68] max-w-xl mx-auto leading-relaxed">
        طراحی‌شده برای نمایشگرهای عریض، تلویزیون‌های هوشمند و ارائه در مجامع دانشگاهی با قابلیت کنترل از راه دور از طریق تلفن همراه.
      </p>
    </div>
  </article>
</template>
