<script setup>
import { toPersianDigits } from '../../utils/persianNumbers';

const data = [
  {
    indicator: 'سرانه تولید ناخالص داخلی (اسمی، برآورد اخیر)',
    iran: '~ ۳,۹۲۴ تا ۴,۷۲۱ دلار',
    korea: '~ ۳۶,۲۲۷ دلار',
    turkey: '~ ۱۰,۸۹۸ تا ۱۸,۵۹۹ دلار',
    note: 'در اواخر دهه ۱۹۷۰ سرانه ایران با ترکیه و کره جنوبی برابر یا حتی بالاتر بود'
  },
  {
    indicator: 'تولید ناخالص داخلی کل (اسمی)',
    iran: '~ ۳۶۳ میلیارد دلار',
    korea: '~ ۱.۸۷ تریلیون دلار (بیش از ۴ برابر ایران)',
    turkey: '~ ۱.۶ تریلیون دلار (بیش از ۴ برابر ایران)',
    note: 'شکاف عظیم در ظرفیت تولیدی و ادغام در بازارهای جهانی'
  },
  {
    indicator: 'نسبت بدهی دولت به تولید ناخالص داخلی',
    iran: '۳۷.۳٪',
    korea: '۵۲.۳٪',
    turkey: '۲۳.۵٪',
    note: 'اتکای دولت ایران به استقراض غیرمستقیم از بانک مرکزی و صندوق توسعه'
  },
  {
    indicator: 'نرخ تورم سالانه (برآورد اخیر)',
    iran: 'بالاتر از ۴۰٪ تا ۴۸.۶٪',
    korea: 'پایدار (عمدتاً زیر ۵٪)',
    turkey: 'نوسانی (اما با ساختار صادراتی و تولیدی نیرومند)',
    note: 'تورم مزمن چند دهه‌ای یکی از بزرگ‌ترین عوامل نابودی طبقه متوسط ایران است'
  }
];
</script>

<template>
  <div class="my-8 bg-[#131418] border border-[rgba(237,232,223,0.15)] rounded-sm overflow-hidden">
    <!-- سربرگ جدول مطبوعاتی -->
    <div class="p-5 border-b border-[rgba(237,232,223,0.12)] bg-[#18191f]">
      <span class="text-xs text-[#b45309] font-bold">جدول آماری ۱ • مقایسه در آینه اقتصاد جهانی</span>
      <h4 class="text-xl font-black text-[#ede8df] mt-1">ترازوی توسعه: ایران در برابر کره جنوبی و ترکیه (پس از نیم قرن)</h4>
      <p class="text-xs text-[#a8a39a] mt-1 leading-relaxed">
        مقایسه سه اقتصادی که در اواخر دهه ۱۹۷۰ (پیش از ۵۷) در شرایط درآمدی کمابیش مشابهی قرار داشتند و مسیرهای کاملاً واگرایی را پیمودند.
      </p>
    </div>

    <!-- جدول -->
    <div class="overflow-x-auto">
      <table class="w-full text-right text-sm">
        <thead class="bg-[#1c1d24] text-xs font-bold text-[#ede8df] border-b border-[rgba(237,232,223,0.15)]">
          <tr>
            <th class="p-4 w-1/3">شاخص اقتصاد کلان</th>
            <th class="p-4 text-[#dc2626]">جمهوری اسلامی ایران</th>
            <th class="p-4 text-[#38bdf8]">کره جنوبی</th>
            <th class="p-4 text-[#fbbf24]">ترکیه</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[rgba(237,232,223,0.08)]">
          <tr v-for="(row, idx) in data" :key="idx" class="hover:bg-[#1a1b22] transition-colors">
            <td class="p-4 font-bold text-[#ede8df]">
              <div>{{ row.indicator }}</div>
              <div class="text-[11px] text-[#736f68] font-normal mt-1">{{ row.note }}</div>
            </td>
            <td class="p-4 font-bold text-[#fca5a5]">{{ row.iran }}</td>
            <td class="p-4 font-bold text-[#bae6fd]">{{ row.korea }}</td>
            <td class="p-4 font-bold text-[#fde68a]">{{ row.turkey }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- پانویس جدول -->
    <div class="p-4 bg-[#101115] border-t border-[rgba(237,232,223,0.08)] text-[11px] text-[#736f68] flex justify-between items-center">
      <span>مأخذ: داده‌های بانک جهانی و صندوق بین‌المللی پول (Georank & World Bank, 2024)</span>
      <span class="text-[#b45309] font-medium">سند پژوهشی شماره ۲۸</span>
    </div>
  </div>
</template>
