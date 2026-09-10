<script setup>
import { toPersianDigits } from '../../utils/persianNumbers';

const facts = [
  {
    num: '۶۴۷',
    label: 'تعداد سدهای ساخته‌شده',
    sub: 'افزایش از ۳۱۶ به ۶۴۷ سد تنها در فاصله سال‌های ۲۰۱۲ تا ۲۰۱۸ توسط قرارگاه‌های پیمانکاری',
    accent: 'text-[#38bdf8]'
  },
  {
    num: '۲۱۱',
    unit: 'کیلومتر مکعب',
    label: 'کسری مخازن آبخوان‌های زیرزمینی',
    sub: 'غارت منابع آب تجدیدناپذیر فلات ایران طی ۲۰۰۳ تا ۲۰۱۹؛ معادل بیش از دو برابر کل مصرف سالانه کشور',
    accent: 'text-[#f87171]'
  },
  {
    num: '۹۰٪',
    label: 'خشکیدن پهنه دریاچه ارومیه',
    sub: 'بزرگ‌ترین نگین آبی خاورمیانه که در اثر سدسازی‌های بی‌رویه حوضه آبریز و کشاورزی غرقابی به کویر نمک بدل شد',
    accent: 'text-[#fbbf24]'
  },
  {
    num: '۱۲,۰۰۰',
    label: 'روستای متروکه شده ناشی از بی‌آبی',
    sub: 'مهاجرت اقلیمی صدها هزار روستایی بین سال‌های ۱۳۸۱ تا ۱۳۹۶ به حاشیه‌های فقیرنشین کلان‌شهرها',
    accent: 'text-[#fca5a5]'
  }
];
</script>

<template>
  <div class="my-8 bg-[#131418] border border-[rgba(237,232,223,0.15)] rounded-sm p-6">
    <div class="border-b border-[rgba(237,232,223,0.1)] pb-4 mb-6">
      <span class="text-xs text-[#b45309] font-bold">اینفوگرافیک تحلیلی ۵ • داده‌های ماهواره‌ای ناسا و مرکز پژوهش‌های مجلس</span>
      <h4 class="text-xl font-black text-[#ede8df] mt-1">تراژدی هیدرولوژیک: از تب سدسازی پهلوی تا ورشکستگی آبی جمهوری اسلامی</h4>
    </div>

    <!-- شبکه‌بندی چهارگانه ابعاد فاجعه زیست‌محیطی -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div 
        v-for="(item, idx) in facts" 
        :key="idx" 
        class="bg-[#191a22] p-5 border border-[rgba(237,232,223,0.08)] flex flex-col justify-between"
      >
        <div>
          <div class="flex items-baseline gap-2 mb-2">
            <span class="text-3xl font-black font-mono tracking-tight" :class="item.accent">
              {{ toPersianDigits(item.num) }}
            </span>
            <span v-if="item.unit" class="text-xs font-bold text-[#a8a39a]">{{ item.unit }}</span>
          </div>
          <div class="text-sm font-bold text-[#ede8df]">{{ item.label }}</div>
        </div>
        <p class="text-[11px] text-[#736f68] mt-3 pt-2 border-t border-[rgba(237,232,223,0.06)] leading-relaxed">
          {{ item.sub }}
        </p>
      </div>
    </div>

    <!-- جعبه موردی سد گتوند علیا -->
    <div class="mt-6 p-4 bg-[#231b1b] border-r-4 border-[#dc2626] rounded-sm text-xs leading-relaxed text-[#ede8df]">
      <strong class="text-[#fca5a5] block mb-1 text-sm font-bold">فاجعه ملی سد گتوند علیا:</strong>
      احداث این سد بر روی گنبدهای نمکی عنبل در استان خوزستان (با وجود هشدارهای کارشناسان مستقل) میلیون‌ها تن نمک را وارد رودخانه کارون کرد و زمین‌های کشاورزی مرغوب پایین‌دست را به شوره‌زار تبدیل نمود. این پروژه نماد بارز اولویت‌بخشی به رانت پیمانکاری بر دانش بوم‌شناختی در تاریخ معاصر نام گرفت.
    </div>
  </div>
</template>
