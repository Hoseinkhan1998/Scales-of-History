<script setup>
import { toPersianDigits } from '../../utils/persianNumbers';

const metrics = [
  {
    title: 'امید به زندگی در بدو تولد',
    pahlavi: '۵۴.۱ سال (۱۳۵۷)',
    ir: '۷۵.۴ سال (۱۳۹۲)',
    progress: '+۲۲ سال افزایش',
    desc: 'یکی از چشمگیرترین جهش‌های امید به زندگی ثبت‌شده توسط سازمان بهداشت جهانی'
  },
  {
    title: 'مرگ‌ومیر نوزادان در مناطق روستایی',
    pahlavi: '۱۲۰ در هزار تولد زنده (۱۳۵۳)',
    ir: '۳۰ در هزار تولد زنده (۱۳۷۹)',
    progress: '۷۵٪ کاهش مرگ نوزادان',
    desc: 'محو شدن تدریجی شکاف مرگ‌ومیر روستایی و شهری به واسطه استقرار خانه‌های بهداشت'
  },
  {
    title: 'مرگ‌ومیر مادران در هنگام زایمان',
    pahlavi: 'بسیار بالا (شکاف بحرانی)',
    ir: 'کاهش از ۱۲۳ به ۲۵ در صدهزار',
    progress: 'کاهش تاریخی به ۲۵ مورد',
    desc: 'کسب الگوی جهانی WHO در مراقبت‌های بارداری و آموزش‌های سلامت مادر و کودک'
  },
  {
    title: 'نرخ باروری کل (تعداد فرزند به ازای هر زن)',
    pahlavi: 'حدود ۶ تا ۷ فرزند (۱۳۴۰-۵۰)',
    ir: 'سقوط از ۸.۴ به ۲.۴ فرزند (روستا)',
    progress: 'معجزه تنظیم خانواده (۱۳۶۸)',
    desc: 'سریع‌ترین گذار جمعیتی جهان با همراهی فتوای فقها و توزیع رایگان اقلام پیشگیری'
  }
];
</script>

<template>
  <div class="my-8 bg-[#131418] border border-[rgba(237,232,223,0.15)] rounded-sm p-6">
    <div class="border-b border-[rgba(237,232,223,0.1)] pb-4 mb-6">
      <span class="text-xs text-[#b45309] font-bold">شاخص تحلیلی ۳ • گزارش‌های رسمی سازمان بهداشت جهانی (WHO) و یونیسف</span>
      <h4 class="text-xl font-black text-[#ede8df] mt-1">انقلاب در سلامت عمومی: مراقبت‌های اولیه (PHC) و گذار جمعیتی</h4>
    </div>

    <!-- شبکه‌بندی کارت‌های سلامت -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div 
        v-for="(card, idx) in metrics" 
        :key="idx" 
        class="bg-[#181920] p-5 border border-[rgba(237,232,223,0.08)] relative overflow-hidden"
      >
        <div class="text-sm font-black text-[#ede8df] mb-3 flex items-center justify-between">
          <span>{{ card.title }}</span>
          <span class="text-xs bg-[#065f46]/40 text-[#6ee7b7] px-2 py-0.5 rounded border border-[#065f46]/60 font-bold">
            {{ card.progress }}
          </span>
        </div>

        <div class="space-y-2 text-xs">
          <div class="flex justify-between items-center py-1.5 px-2.5 bg-[#21222b] rounded-sm">
            <span class="text-[#a8a39a]">عصر پهلوی:</span>
            <span class="font-bold text-[#fca5a5]">{{ card.pahlavi }}</span>
          </div>
          <div class="flex justify-between items-center py-1.5 px-2.5 bg-[#21222b] rounded-sm">
            <span class="text-[#a8a39a]">جمهوری اسلامی:</span>
            <span class="font-bold text-[#86efac]">{{ card.ir }}</span>
          </div>
        </div>

        <p class="text-[11px] text-[#736f68] mt-3 leading-relaxed border-t border-[rgba(237,232,223,0.06)] pt-2">
          {{ card.desc }}
        </p>
      </div>
    </div>
  </div>
</template>
