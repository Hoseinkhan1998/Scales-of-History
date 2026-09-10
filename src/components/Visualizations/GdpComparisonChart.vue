<script setup>
import { ref } from 'vue';
import { toPersianDigits } from '../../utils/persianNumbers';

const activeYearIndex = ref(null);

const milestones = [
  { year: '۱۳۴۲ (۱۹۶۳)', pahlaviRate: 8.5, irRate: null, desc: 'آغاز اصلاحات ارضی و برنامه‌های عمرانی سوم' },
  { year: '۱۳۴۸ (۱۹۶۹)', pahlaviRate: 11.2, irRate: null, desc: 'جهش تولیدات صنعتی و خودروسازی داخلی' },
  { year: '۱۳۵۲ (۱۹۷۳)', pahlaviRate: 14.8, irRate: null, desc: 'شوک چهار برابری نفت، بروز بیماری هلندی و تورم فزاینده' },
  { year: '۱۳۵۵ (۱۹۷۶)', pahlaviRate: 9.8, irRate: null, desc: 'ثبت بالاترین درآمد سرانه تاریخی (۷,۷۰۰ دلار ۲۰۱۱)' },
  { year: '۱۳۵۷ (۱۹۷۹)', pahlaviRate: -2.5, irRate: -2.5, desc: 'انقلاب، فرار سرمایه و اعتصابات سراسری' },
  { year: '۱۳۶۵ (۱۹۸۶)', pahlaviRate: null, irRate: -9.0, desc: 'دوران جنگ هشت‌ساله و بمباران تأسیسات نفتی' },
  { year: '۱۳۷۵ (۱۹۹۶)', pahlaviRate: null, irRate: 5.6, desc: 'دوران بازسازی پساجنگ و رشد زیرساخت‌های پایه' },
  { year: '۱۳۸۵ (۲۰۰۶)', pahlaviRate: null, irRate: 5.8, desc: 'اوج درآمدهای نفتی دهه ۸۰ و آغاز یارانه‌های نقدی' },
  { year: '۱۳۹۱ (۲۰۱۲)', pahlaviRate: null, irRate: -7.4, desc: 'اعمال تحریم‌های گسترده مالی و نفتی بین‌المللی' },
  { year: '۱۳۹۵ (۲۰۱۶)', pahlaviRate: null, irRate: 12.5, desc: 'رشد ناشی از توافق برجام و بازگشت موقت صادرات نفت' },
  { year: '۱۳۹۸ (۲۰۱۹)', pahlaviRate: null, irRate: -6.8, desc: 'تحریم‌های حداکثری و جهش تورم به بالای ۴۰٪' },
  { year: '۱۴۰۳ (۲۰۲۴)', pahlaviRate: null, irRate: 2.7, desc: 'رکود تورمی مزمن و کسری فزاینده بودجه' }
];
</script>

<template>
  <div class="my-8 p-6 bg-[#131418] border border-[rgba(237,232,223,0.15)] rounded-sm">
    <!-- عنوان نمودار مطبوعاتی -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-[rgba(237,232,223,0.1)] gap-2">
      <div>
        <span class="text-xs text-[#b45309] font-bold uppercase tracking-wider">نمودار تحلیلی ۱ • داده‌های صندوق بین‌المللی پول و بانک مرکزی</span>
        <h4 class="text-xl font-extrabold text-[#ede8df] mt-1">نوسانات نرخ رشد سالانه تولید ناخالص داخلی (۱۳۴۲ تا ۱۴۰۳)</h4>
      </div>
      <div class="flex items-center gap-4 text-xs">
        <span class="flex items-center gap-1.5 text-[#ede8df]">
          <span class="w-3 h-3 bg-[#b45309] inline-block"></span>
          دوران پهلوی (میانگین ۹.۸٪)
        </span>
        <span class="flex items-center gap-1.5 text-[#a8a39a]">
          <span class="w-3 h-3 bg-[#3f6212] inline-block"></span>
          جمهوری اسلامی (میانگین نوسانی ~۲.۵٪)
        </span>
      </div>
    </div>

    <!-- نمودار میله‌ای سرمقاله‌ای -->
    <div class="mt-6 pt-2 pb-4">
      <div class="grid grid-cols-6 md:grid-cols-12 gap-2 h-44 items-end border-b border-[rgba(237,232,223,0.2)] pb-1 relative">
        <!-- خط صفر -->
        <div class="absolute w-full border-t border-dashed border-[rgba(237,232,223,0.3)] bottom-12 pointer-events-none">
          <span class="absolute right-0 -top-4 text-[10px] text-[#736f68]">رشد صفر درصد</span>
        </div>

        <div 
          v-for="(item, idx) in milestones" 
          :key="idx" 
          @mouseenter="activeYearIndex = idx"
          @mouseleave="activeYearIndex = null"
          class="flex flex-col items-center justify-end h-full group cursor-pointer relative"
        >
          <!-- Tooltip شناور -->
          <div 
            v-if="activeYearIndex === idx" 
            class="absolute -top-16 z-30 bg-[#0e0f11] text-[#ede8df] text-xs p-2.5 rounded border border-[rgba(237,232,223,0.3)] shadow-2xl min-w-[180px] pointer-events-none"
          >
            <div class="font-bold text-[#b45309]">{{ item.year }}</div>
            <div class="text-[11px] text-[#a8a39a] mt-0.5">{{ item.desc }}</div>
            <div class="mt-1 font-bold text-sm">
              رشد: {{ toPersianDigits(item.pahlaviRate ?? item.irRate) }}٪
            </div>
          </div>

          <!-- ستون میله‌ای -->
          <div class="w-full flex justify-center items-end h-32 relative">
            <div 
              v-if="item.pahlaviRate !== null"
              class="w-full max-w-[24px] bg-[#b45309] hover:bg-[#d97706] transition-all duration-300 relative group-hover:brightness-125"
              :style="{ 
                height: `${Math.min(100, Math.max(8, (item.pahlaviRate + 10) * 4.5))}%`,
                marginBottom: item.pahlaviRate < 0 ? '0' : '2.8rem'
              }"
            ></div>
            <div 
              v-else-if="item.irRate !== null"
              class="w-full max-w-[24px] bg-[#3f6212] hover:bg-[#65a30d] transition-all duration-300 relative group-hover:brightness-125"
              :style="{ 
                height: `${Math.min(100, Math.max(8, (item.irRate + 10) * 4.5))}%`,
                marginBottom: item.irRate < 0 ? '0' : '2.8rem'
              }"
            ></div>
          </div>

          <!-- برچسب سال -->
          <span class="text-[10px] text-[#a8a39a] mt-2 truncate w-full text-center group-hover:text-[#ede8df]">
            {{ item.year.split(' ')[0] }}
          </span>
        </div>
      </div>
    </div>

    <!-- یادداشت تحلیلی زیر نمودار -->
    <div class="mt-4 pt-3 border-t border-[rgba(237,232,223,0.08)] flex items-start gap-2 text-xs text-[#a8a39a]">
      <span class="text-[#b45309] font-bold">پانویس سند:</span>
      <p>
        در فاصله ۱۳۴۲ تا ۱۳۵۵، رشد اقتصادی به صورت متوالی مثبت و دو رقمی بود، اما ناتوانی در مهار تورم پس از شوک نفتی ۱۹۷۳ ساختار تولید را بیمار کرد. در دوره جمهوری اسلامی، اقتصاد با نوسانات شدید بین درآمدهای نفتی، جنگ و تحریم‌های کمرشکن دچار ناپایداری مزمن گردید.
      </p>
    </div>
  </div>
</template>
