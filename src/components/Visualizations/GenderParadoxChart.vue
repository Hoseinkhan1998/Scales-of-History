<script setup>
import { toPersianDigits } from '../../utils/persianNumbers';

const bars = [
  { label: 'نرخ باسوادی کل زنان', pahlavi: 35, ir: 88, unit: '٪', note: 'در مناطق روستایی از ۱۹٪ به بالای ۷۰٪ رسید' },
  { label: 'سهم زنان در دانشگاه‌ها', pahlavi: 28, ir: 60, unit: '٪', note: 'فتح اکثریت صندلی‌های آموزش عالی' },
  { label: 'سهم زنان در رشته‌های مهندسی و پایه (STEM)', pahlavi: 12, ir: 70, unit: '٪', note: 'آماری شگفت‌انگیز در سطح جهان' },
  { label: 'نرخ مشارکت اقتصادی زنان در بازار کار', pahlavi: 14.8, ir: 13.5, unit: '٪', note: 'شکاف وحشتناک با میانگین ۵۰ درصدی جهان' },
  { label: 'نرخ بیکاری زنان جوان (۲۵-۲۹ سال)', pahlavi: 8, ir: 45.7, unit: '٪', note: 'بیکاری بحرانی تحصیل‌کردگان زن' }
];
</script>

<template>
  <div class="my-8 bg-[#131418] border border-[rgba(237,232,223,0.15)] rounded-sm p-6">
    <div class="border-b border-[rgba(237,232,223,0.1)] pb-4 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
      <div>
        <span class="text-xs text-[#b45309] font-bold">نمودار تحلیلی ۴ • مرکز آمار ایران و یونسکو</span>
        <h4 class="text-xl font-black text-[#ede8df] mt-1">هرم پارادوکس جنسیتی: جهش چشمگیر آموزشی در برابر قفل بازار کار</h4>
      </div>
      <div class="flex items-center gap-4 text-xs">
        <span class="flex items-center gap-1.5 text-[#fca5a5]">
          <span class="w-3 h-3 bg-[#b45309] inline-block"></span>
          دوران پهلوی (۱۳۵۵)
        </span>
        <span class="flex items-center gap-1.5 text-[#86efac]">
          <span class="w-3 h-3 bg-[#059669] inline-block"></span>
          جمهوری اسلامی (کنونی)
        </span>
      </div>
    </div>

    <!-- میله‌های واگرای پارادوکس -->
    <div class="space-y-5">
      <div v-for="(item, idx) in bars" :key="idx" class="bg-[#181921] p-4 border border-[rgba(237,232,223,0.06)]">
        <div class="flex justify-between items-center text-xs font-bold text-[#ede8df] mb-2">
          <span>{{ item.label }}</span>
          <span class="text-[#736f68] font-normal text-[11px]">{{ item.note }}</span>
        </div>

        <div class="space-y-2">
          <!-- میله پهلوی -->
          <div class="flex items-center gap-3 text-xs">
            <span class="w-20 text-[11px] text-[#a8a39a] shrink-0">پهلوی:</span>
            <div class="w-full bg-[#242531] h-3.5 rounded-sm overflow-hidden flex items-center">
              <div 
                class="bg-[#b45309] h-full transition-all duration-700" 
                :style="{ width: `${item.pahlavi}%` }"
              ></div>
            </div>
            <span class="w-12 text-left font-mono font-bold text-[#fca5a5] text-[11px]">{{ toPersianDigits(item.pahlavi) }}{{ item.unit }}</span>
          </div>

          <!-- میله جمهوری اسلامی -->
          <div class="flex items-center gap-3 text-xs">
            <span class="w-20 text-[11px] text-[#a8a39a] shrink-0">جمهوری اسلامی:</span>
            <div class="w-full bg-[#242531] h-3.5 rounded-sm overflow-hidden flex items-center">
              <div 
                class="h-full transition-all duration-700"
                :class="item.label.includes('مشارکت') || item.label.includes('بیکاری') ? 'bg-[#dc2626]' : 'bg-[#059669]'"
                :style="{ width: `${item.ir}%` }"
              ></div>
            </div>
            <span class="w-12 text-left font-mono font-bold text-[11px]" :class="item.label.includes('مشارکت') || item.label.includes('بیکاری') ? 'text-[#fca5a5]' : 'text-[#86efac]'">
              {{ toPersianDigits(item.ir) }}{{ item.unit }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- یادداشت انتقادی -->
    <div class="mt-4 p-3 bg-[#1e1f29] text-xs text-[#a8a39a] leading-relaxed border-r-2 border-[#dc2626]">
      <span class="text-[#fca5a5] font-bold">نتیجه تحلیلی:</span>
      اگرچه تفکیک جنسیتی و گسترش مدارس پس از ۵۷ مسیر آموزش دختران خانواده‌های سنتی را هموار کرد و زنان ۷۰٪ رشته‌های مهندسی را فتح کردند، اما مشارکت اقتصادی آنان در سطح اسفناک ۱۲ تا ۱۵ درصد راکد ماند. این امر به معنای آموزش زنان با بودجه عمومی و سپس هدایت اجباری به خانه‌نشینی است.
    </div>
  </div>
</template>
