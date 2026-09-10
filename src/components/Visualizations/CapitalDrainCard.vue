<script setup>
import { toPersianDigits } from '../../utils/persianNumbers';

const points = [
  {
    title: 'رتبه اول فرار مغزها در جهان',
    value: '۱۵۰ تا ۲۵۰ هزار نفر',
    source: 'گزارش سال ۲۰۰۹ صندوق بین‌المللی پول (IMF)',
    desc: 'ایران در میان ۹۱ کشور مورد بررسی، بالاترین نرخ مهاجرت تحصیل‌کردگان دانشگاهی و نخبگان فنی را کسب کرد.'
  },
  {
    title: 'خسارت سالانه خروج سرمایه انسانی',
    value: '۵۰ میلیارد دلار در سال',
    source: 'برآوردهای اقتصادی نهادهای بین‌المللی',
    desc: 'معادل بودجه‌های عمرانی کلان کشور که به شکل سرمایه آماده انسانی تقدیم اقتصادهای غربی و توسعه‌یافته می‌شود.'
  },
  {
    title: 'فرار سرمایه مالی طی یک دهه اخیر',
    value: 'بیش از ۱۸۰ میلیارد دلار',
    source: 'آمارهای رسمی بانک مرکزی و ترابری سرمایه',
    desc: 'خروج خالص ارز برای خرید املاک و سرمایه‌گذاری توسط طبقه متصل به قدرت در کانادا، ترکیه، امارات و اروپا.'
  },
  {
    title: 'مهاجرت سالانه کادر درمان و دانشجو',
    value: '> ۵۰,۰۰۰ دانشجو / ۳,۰۰۰ پرستار',
    source: 'گزارش‌های نظام پزشکی و وزارت بهداشت',
    desc: 'خروج بی‌سابقه پزشکان، جراحان و پرستاران که نظام سلامت کشور را با کمبود فوق‌بحرانی مواجه کرده است.'
  }
];
</script>

<template>
  <div class="my-8 bg-[#131418] border border-[rgba(237,232,223,0.15)] rounded-sm p-6">
    <div class="border-b border-[rgba(237,232,223,0.1)] pb-4 mb-6">
      <span class="text-xs text-[#b45309] font-bold">شاخص تحلیلی ۶ • صندوق بین‌المللی پول و بانک مرکزی</span>
      <h4 class="text-xl font-black text-[#ede8df] mt-1">کوچ نخبگان و خروج ثروت: آینه تمام‌نمای ناامیدی نسلی</h4>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div 
        v-for="(item, idx) in points" 
        :key="idx" 
        class="bg-[#181921] p-5 border border-[rgba(237,232,223,0.08)] flex flex-col justify-between"
      >
        <div>
          <span class="text-xs text-[#b45309] font-bold block mb-1">{{ item.source }}</span>
          <div class="text-sm font-bold text-[#ede8df] mb-2">{{ item.title }}</div>
          <div class="text-2xl font-black font-mono text-[#fca5a5] mb-2">
            {{ toPersianDigits(item.value) }}
          </div>
        </div>
        <p class="text-[11px] text-[#736f68] leading-relaxed pt-2 border-t border-[rgba(237,232,223,0.06)]">
          {{ item.desc }}
        </p>
      </div>
    </div>

    <!-- یادداشت تطبیقی با دوران پهلوی -->
    <div class="mt-4 p-3 bg-[#1c1d25] border-r-2 border-[#b45309] text-xs text-[#a8a39a] leading-relaxed">
      <span class="text-[#ede8df] font-bold">مقایسه تطبیقی:</span>
      در دوره پهلوی، موج گسترده‌ای از دانشجویان با بورسیه‌های دولتی به دانشگاه‌های تراز اول آمریکا و اروپا اعزام می‌شدند و اکثریت قاطع آنان به دلیل چشم‌انداز روشن اشتغال و درآمد بالا در صنایع و دانشگاه‌های نوین به کشور بازمی‌گشتند؛ اما در جمهوری اسلامی، تحصیل‌کردگان با هزینه داخلی تربیت و با احساس بن‌بست سیاسی و اجتماعی برای همیشه مهاجرت می‌کنند.
    </div>
  </div>
</template>
