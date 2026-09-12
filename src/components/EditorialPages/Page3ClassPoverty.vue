<script setup>
import { chapters } from '../../data/publicationData';
import TermHighlight from '../Common/TermHighlight.vue';
import GiniPovertyChart from '../Visualizations/GiniPovertyChart.vue';

const chapter = chapters[2];
</script>

<template>
  <article class="max-w-5xl mx-auto py-8 px-4 sm:px-8 space-y-8 animate-fadeIn">
    <!-- سرنویس فصل -->
    <div class="border-b-2 border-[rgba(237,232,223,0.15)] pb-6 text-center md:text-right">
      <div class="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-[#b45309] mb-2 uppercase tracking-widest">
        <span>فصل سوم</span>
        <span>•</span>
        <span>{{ chapter.kicker }}</span>
        <span>•</span>
        <span class="text-[#736f68]">زمان مطالعه: {{ chapter.readTime }}</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-black text-[#ede8df] leading-tight">
        {{ chapter.title }}
      </h1>
      <p class="text-lg text-[#a8a39a] mt-3 font-light max-w-3xl leading-relaxed">
        {{ chapter.summary }}
      </p>
    </div>

    <!-- نقل‌قول سردبیری -->
    <blockquote class="p-6 bg-[#13141b] border-r-4 border-[#b45309] rounded-sm text-base sm:text-lg text-[#ede8df] leading-loose italic">
      {{ chapter.leadQuote }}
    </blockquote>

    <!-- بخش اول: انقلاب سفید و حاشیه‌نشینی -->
    <div class="space-y-4 text-[#ede8df] text-base sm:text-lg leading-relaxed text-justify font-light">
      <h3 class="text-2xl font-black text-[#ede8df] border-b border-[rgba(237,232,223,0.1)] pb-2">
        {{ chapter.contentBlocks[0].heading }}
      </h3>
      <div class="newspaper-cols-2 space-y-4">
        <p>
          در سال ۱۳۴۱ (۱۹۶۳)، شاه برنامه 
          <TermHighlight 
            term="اصلاحات ارضی" 
            en="Land Reform" 
            category="تاریخ و جامعه‌شناسی روستایی"
            definition="برنامه تقسیم اراضی مالکان بزرگ میان دهقانان به عنوان اصل نخست انقلاب سفید؛ هرچند نظام فئودالی را برچید، اما به دلیل کوچکی قطعات و نبود حمایت مالی، به مهاجرت میلیونی روستاییان انجامید."
          />
          را به عنوان بند نخست انقلاب سفید با هدف شکستن قدرت اربابان فئودال و ایجاد طبقه کشاورز خرده‌مالک وفادار به سلطنت آغاز کرد. نزدیک به ۲.۵ میلیون خانواده دهقانی زمین‌دار شدند و نظام ارباب‌رعیتی از نظر حقوقی ملغی شد. اما از نظر اقتصادی، نتایج فاجعه‌بار بود: نیمی از جمعیت روستایی اصلاً زمینی دریافت نکردند، و ۷۳ درصد دارندگان زمین قطعاتی کمتر از ۶ هکتار داشتند که حتی برای معیشت کفایت نمی‌کرد.
        </p>
        <p>
          فقدان تعاونی‌ها و اعتبارات حمایتی، کشاورزان را مقروض رباخواران کرد و موج عظیمی از مهاجرت روستایی به حاشیه شهرهای بزرگ (به‌ویژه جنوب تهران) به راه افتاد. 
          <TermHighlight 
            term="ضریب جینی" 
            en="Gini Coefficient" 
            category="شاخص‌های نابرابری و توزیع درآمد"
            definition="شاخص آماری برای اندازه‌گیری نابرابری توزیع ثروت بین ۰ (برابری کامل) تا ۱ (نابرابری مطلق). ارقام بالاتر از ۰.۴ نشان‌دهنده توزیع ناعادلانه و شکاف طبقاتی بحرانی است."
          />
          در سال ۱۳۵۴ (۱۹۷۵) به رقم تکان‌دهنده ۰.۵۶ رسید که ایران را در شمار نابرابرترین کشورهای در حال توسعه قرار داد؛ سهم ۲۰ درصد بالای جامعه از کل هزینه‌ها از ۵۲٪ به ۵۶٪ افزایش یافت و بیش از ۲۵٪ مردم زیر خط فقر روزی ۵.۵ دلار بودند.
        </p>
      </div>
    </div>

    <!-- مصورسازی ضریب جینی و دسترسی روستایی -->
    <GiniPovertyChart />

    <!-- بخش دوم: جمهوری اسلامی و بازتوزیع -->
    <div class="space-y-4 text-[#ede8df] text-base sm:text-lg leading-relaxed text-justify font-light pt-4">
      <h3 class="text-2xl font-black text-[#ede8df] border-b border-[rgba(237,232,223,0.1)] pb-2">
        {{ chapter.contentBlocks[2].heading }}
      </h3>
      <div class="newspaper-cols-2 space-y-4">
        <p>
          جمهوری اسلامی با نهادهایی چون 
          <TermHighlight 
            term="جهاد سازندگی" 
            en="Construction Jihad" 
            category="نهادهای بازتوزیعی پس از انقلاب"
            definition="نهاد انقلابی برآمده از سال ۱۳۵۸ که با تکیه بر نیروهای جوان و داوطلب، شبکه زیرساخت‌های پایه شامل برق‌رسانی، آبرسانی، راه‌سازی و بهداشت را در روستاهای سراسر کشور مستقر کرد."
          />
          توانست برق‌رسانی، لوله‌کشی آب، راه روستایی و مدارس را به دورافتاده‌ترین مناطق ببرد. بین سال‌های ۱۹۸۴ تا ۲۰۰۴، دسترسی فقیرترین دهک‌های روستایی به برق از ۳۷٪ به ۹۴٪ و به آب لوله‌کشی از ۳۱٪ به ۷۹٪ رسید. این بازتوزیع، ضریب جینی را به ۰.۴۰ تا ۰.۴۲ کاهش داد و فقر مطلق را در دهه ۱۳۸۰ به زیر ۱۰٪ رساند. اجرای طرح هدفمندی یارانه‌ها در سال ۱۳۸۹ (۲۰۱۰) و پرداخت مستقیم یارانه نقدی، موقتاً ضریب جینی را تا ۰.۳۶ تقلیل داد.
        </p>
        <p>
          اما پایداری این دستاورد در مواجهه با تورم‌های مزمن بالای ۴۰ درصد فروپاشید. طبق گزارش مرکز پژوهش‌های مجلس در سال ۱۳۹۸ (۲۰۱۹)، بیش از ۵۵ درصد جمعیت زیر 
          <TermHighlight 
            term="خط فقر نسبی" 
            en="Relative Poverty Line" 
            category="اقتصاد رفاه و خط فقر"
            definition="معیاری که بر اساس آن خانواری که نتواند به حداقل استانداردها و هزینه‌های شایسته زندگی در جامعه خود دست یابد، فقیر نسبی شناخته می‌شود."
          />
          قرار گرفتند و نزدیک به ۸ میلیون نفر از طبقه متوسط به طبقات فرودست سقوط کردند. دستاورد زیرساختی فیزیکی نتوانست در نبود رشد فراگیر اقتصادی، ثبات معیشتی ایجاد کند.
        </p>
      </div>
    </div>
  </article>
</template>
