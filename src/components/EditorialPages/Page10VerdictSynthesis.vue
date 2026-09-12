<script setup>
import { chapters } from '../../data/publicationData';
import TermHighlight from '../Common/TermHighlight.vue';

const chapter = chapters[9];
</script>

<template>
  <article class="max-w-5xl mx-auto py-8 px-4 sm:px-8 space-y-8 animate-fadeIn">
    <!-- سرنویس فصل -->
    <div class="border-b-2 border-[rgba(237,232,223,0.15)] pb-6 text-center md:text-right">
      <div class="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-[#b45309] mb-2 uppercase tracking-widest">
        <span>فصل دهم</span>
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

    <!-- نقل‌قول سردبیری پایانی -->
    <blockquote class="p-6 bg-[#13141b] border-r-4 border-[#b45309] rounded-sm text-base sm:text-lg text-[#ede8df] leading-loose italic">
      {{ chapter.leadQuote }}
    </blockquote>

    <!-- متن داوری و تحلیل نهایی -->
    <div class="space-y-4 text-[#ede8df] text-base sm:text-lg leading-relaxed text-justify font-light">
      <h3 class="text-2xl font-black text-[#ede8df] border-b border-[rgba(237,232,223,0.1)] pb-2">
        {{ chapter.contentBlocks[0].heading }}
      </h3>
      <div class="newspaper-cols-2 space-y-4">
        <p>
          بررسی تطبیقی و جامع مستندات دو مقطع پهلوی و جمهوری اسلامی، روایتی شفاف از دو تجربه نافرجام در دستیابی به 
          <TermHighlight 
            term="توسعه پایدار" 
            en="Sustainable Development" 
            category="جامعه‌شناسی کلان و توسعه آینده‌نگر"
            definition="توسعه‌ای که در آن رشد اقتصادی با عدالت اجتماعی، دموکراسی سیاسی و پاسداری از منابع زیست‌محیطی برای نسل‌های آینده پیوند خورده باشد."
          />
          است: دوران پهلوی موفق به خلق یک موتور رشد اقتصادی نیرومند، نوسازی فیزیکی شتابان، ایجاد ارتشی مدرن و ادغام سازنده در اقتصاد جهانی شد؛ اما خطای استراتژیک آن در نادیده گرفتن 
          <TermHighlight 
            term="عدالت توزیعی" 
            en="Distributive Justice" 
            category="فلسفه سیاسی و عدالت اقتصادی"
            definition="توزیع منصفانه مواهب ثروت، آموزش، بهداشت و رفاه عمومی میان تمامی طبقات و نواحی حاشیه‌ای کشور به جای تمرکز رانت در پایتخت."
          />
          ، فقر حاشیه‌نشینان، توسعه نیافتن بهداشت روستایی و از همه مهلک‌تر، خفقان تک‌حزبی و تحقیر مشارکت سیاسی شهروندان، به انفجار انقلابی انجامید.
        </p>
        <p>
          در نقطه مقابل، جمهوری اسلامی در دهه‌های نخست توانست عدالت زیرساختی را در آموزش همگانی دختران، برق و آب روستایی، کاهش مرگ‌ومیر نوزادان و تنظیم خانواده محقق سازد؛ اما تقدم ایدئولوژی بر منافع ملی، تنش‌آفرینی ویرانگر منطقه‌ای، تحریم‌های فلج‌کننده، سلطه نهادهای فاسد خصولتی، سرکوب آزادی‌های مدنی و اشغال حوزه خصوصی، و 
          <TermHighlight 
            term="ورشکستگی اکولوژیک" 
            en="Ecological Bankruptcy" 
            category="بحران‌های زیست‌محیطی"
            definition="نابودی برگشت‌ناپذیر آبخوان‌ها، تالاب‌ها، خاک حاصلخیز و تنوع زیستی که قدرت بازتولید طبیعی یک سرزمین را منهدم می‌سازد."
          />
          ، تمامی آن دستاوردهای اجتماعی را در کام فروپاشی اقتصادی فرو برده است.
        </p>
      </div>
    </div>

    <!-- ارکان چهارگانه توسعه پایدار برای آینده ایران -->
    <div class="my-8 bg-[#151620] border border-[rgba(237,232,223,0.15)] rounded-sm p-6">
      <h4 class="text-xl font-black text-[#ede8df] mb-6 text-center border-b border-[rgba(237,232,223,0.1)] pb-3">
        {{ chapter.contentBlocks[1].heading }}
      </h4>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          v-for="(pillar, idx) in chapter.contentBlocks[1].pillars" 
          :key="idx"
          class="bg-[#1c1d29] p-5 border border-[rgba(237,232,223,0.08)] flex items-start gap-3.5 hover:border-[rgba(237,232,223,0.25)] transition-all"
        >
          <div class="text-2xl p-2 bg-[#252737] rounded-sm shrink-0">
            {{ pillar.icon }}
          </div>
          <div>
            <div class="text-sm font-bold text-[#ede8df] mb-1.5">{{ pillar.title }}</div>
            <p class="text-xs text-[#a8a39a] leading-relaxed">{{ pillar.text }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- مهر پایان نشریه -->
    <div class="py-8 text-center flex flex-col items-center justify-center border-t border-[rgba(237,232,223,0.12)]">
      <div class="w-16 h-16 rounded-full border-2 border-dashed border-[#b45309] flex items-center justify-center text-[#b45309] font-black text-xs rotate-[-8deg] uppercase tracking-widest shadow-inner">
        پایان متن
      </div>
      <span class="text-xs text-[#736f68] mt-3 font-mono">
        پژوهش پایان‌یافته • برای مشاهده منابع و کتاب‌شناسی به صفحه بعد بروید
      </span>
    </div>
  </article>
</template>
