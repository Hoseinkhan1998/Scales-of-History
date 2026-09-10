<script setup>
import { toPersianDigits } from '../../utils/persianNumbers';

const ruralAccess = [
  { item: 'دسترسی فقیرترین دهک‌های روستایی به برق', preRev: 'زیر ۴۰٪', postRev: 'بیش از ۹۴٪', delta: '+۵۴٪ افزایش', note: 'دست‌آورد بزرگ جهاد سازندگی در دهه اول و دوم' },
  { item: 'دسترسی روستاییان به آب لوله‌کشی سالم', preRev: '۷.۶٪ تا ۳۱٪', postRev: 'بیش از ۷۹٪', delta: '+۴۸٪ افزایش', note: 'توسعه بهداشت پایه اما همراه با بحران‌های بعدی کم‌آبی' },
  { item: 'ضریب جینی (نابرابری درآمدی)', preRev: '۰.۵۶ (بحرانی - ۱۳۵۴)', postRev: '۰.۳۶ تا ۰.۴۲', delta: 'کاهش شکاف اولیه', note: 'کاهش نابرابری در دهه‌های ۶۰ تا ۸۰ اما برگشت به بالای ۰.۴۰ با تورم' },
  { item: 'جمعیت زیر خط فقر مطلق بین‌المللی', preRev: '> ۲۵٪ (۱۳۵۰)', postRev: '< ۱۰٪ (۱۳۹۰)', delta: 'کاهش موقت فقر مطلق', note: 'پس از ۱۳۹۸ با شوک ارزی، فقر نسبی به ۵۵٪ جمعیت رسید' }
];
</script>

<template>
  <div class="my-8 bg-[#131418] border border-[rgba(237,232,223,0.15)] rounded-sm p-6">
    <div class="border-b border-[rgba(237,232,223,0.1)] pb-4 mb-6">
      <span class="text-xs text-[#b45309] font-bold">نمودار تحلیلی ۲ • سنجش شاخص‌های عدالت توزیعی و فقر</span>
      <h4 class="text-xl font-extrabold text-[#ede8df] mt-1">ترازوی بازتوزیع: شکاف طبقاتی، انقلاب سفید و زیرساخت‌های محرومان</h4>
    </div>

    <!-- ماتریس مقایسه‌ای ۴ متغیر کلیدی -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div 
        v-for="(row, idx) in ruralAccess" 
        :key="idx" 
        class="bg-[#17181e] p-4 border border-[rgba(237,232,223,0.08)] hover:border-[rgba(237,232,223,0.25)] transition-all"
      >
        <div class="text-sm font-bold text-[#ede8df] mb-2">{{ row.item }}</div>
        
        <div class="grid grid-cols-2 gap-2 my-3 text-xs">
          <div class="bg-[#202129] p-2.5 rounded-sm border border-[rgba(237,232,223,0.05)]">
            <span class="text-[10px] text-[#a8a39a] block">دوران پهلوی (پیش از ۵۷)</span>
            <span class="text-sm font-black text-[#fca5a5] mt-1 block">{{ row.preRev }}</span>
          </div>
          <div class="bg-[#202129] p-2.5 rounded-sm border border-[rgba(237,232,223,0.05)]">
            <span class="text-[10px] text-[#a8a39a] block">جمهوری اسلامی (دوران ثبات)</span>
            <span class="text-sm font-black text-[#86efac] mt-1 block">{{ row.postRev }}</span>
          </div>
        </div>

        <div class="text-[11px] text-[#a8a39a] leading-relaxed pt-2 border-t border-[rgba(237,232,223,0.06)] flex justify-between items-center">
          <span>{{ row.note }}</span>
          <span class="text-[#38bdf8] font-bold shrink-0 mr-2">{{ row.delta }}</span>
        </div>
      </div>
    </div>

    <!-- خط تحلیلی نابرابری جینی -->
    <div class="mt-6 p-4 bg-[#1b1c24] border-r-4 border-[#b45309] text-xs text-[#a8a39a] leading-relaxed">
      <strong class="text-[#ede8df] block mb-1">پارادوکس عدالت توزیعی:</strong>
      رژیم پهلوی با وجود خلق ثروت کلان ملی، ضریب جینی را در سال ۱۳۵۴ به ۰.۵۶ رساند که انبار باروت نارضایتی‌های حاشیه‌نشینان را مشتعل کرد. جمهوری اسلامی در تأمین نیازهای پایه روستایی بسیار کارآمدتر ظاهر شد و ضریب جینی را به محدوده ۰.۴۰ تا ۰.۴۲ کشاند، اما در دهه ۱۳۹۰ و ۱۴۰۰ به دلیل ناتوانی در مهار تورم، چتر حمایتی آسیب‌پذیر شد و طبق پژوهش مجلس، ۵۵٪ جامعه زیر خط فقر قرار گرفتند.
    </div>
  </div>
</template>
