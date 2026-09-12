<script setup>
import { chapters } from '../../data/publicationData';
import TermHighlight from '../Common/TermHighlight.vue';
import CapitalDrainCard from '../Visualizations/CapitalDrainCard.vue';

const chapter = chapters[6];
</script>

<template>
  <article class="max-w-5xl mx-auto py-8 px-4 sm:px-8 space-y-8 animate-fadeIn">
    <!-- سرنویس فصل -->
    <div class="border-b-2 border-[rgba(237,232,223,0.15)] pb-6 text-center md:text-right">
      <div class="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-[#b45309] mb-2 uppercase tracking-widest">
        <span>فصل هفتم</span>
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

    <!-- بخش اول: فرار مغزها و گزارش IMF -->
    <div class="space-y-4 text-[#ede8df] text-base sm:text-lg leading-relaxed text-justify font-light">
      <h3 class="text-2xl font-black text-[#ede8df] border-b border-[rgba(237,232,223,0.1)] pb-2">
        {{ chapter.contentBlocks[0].heading }}
      </h3>
      <div class="newspaper-cols-2 space-y-4">
        <p>
          بر اساس گزارش مشهور سال ۲۰۰۹ صندوق بین‌المللی پول (IMF)، ایران با خروج سالانه ۱۵۰ تا ۲۵۰ هزار نیروی متخصص و فارغ‌التحصیل دانشگاهی، رتبه نخست 
          <TermHighlight 
            term="فرار مغزها" 
            en="Brain Drain" 
            category="مهاجرت نخبگان و اقتصاد دانش‌بنیان"
            definition="مهاجرت انبوه و بی‌بازگشت پزشکان، مهندسان، پژوهشگران و نیروهای مستعد به کشورهای پیشرفته به علت ناامیدی از آینده، انسداد سیاسی و نبود محیط شکوفایی."
          />
          را در میان ۹۱ کشور جهان کسب کرد؛ خسارتی که معادل خروج سالانه ۵۰ میلیارد دلار 
          <TermHighlight 
            term="سرمایه انسانی" 
            en="Human Capital" 
            category="شاخص‌های توسعه اقتصادی"
            definition="ارزش اقتصادی دانش، مهارت، نوآوری و توان تولیدی نخبگان یک کشور که عامل اصلی ثروت پایدار در جهان مدرن محسوب می‌شود."
          />
          برآورد می‌شود.
        </p>
        <p>
          در سال‌های اخیر و با گسترش بحران‌های معیشتی و سرکوب‌های سیاسی، این روند شتابی دهشتناک گرفته است: مهاجرت سالانه بیش از ۵۰ هزار دانشجو و هزاران نفر از کادر درمان (از جمله بیش از ۳۰۰۰ پرستار در سال). نظرسنجی‌ها حاکی از آن است که نزدیک به ۸۰ درصد نخبگان جوان و متخصصان فناوری در اندیشه خروج از کشور هستند.
        </p>
      </div>
    </div>

    <!-- مصورسازی فرار مغزها و سرمایه -->
    <CapitalDrainCard />

    <!-- بخش دوم: خروج سرمایه مالی -->
    <div class="space-y-4 text-[#ede8df] text-base sm:text-lg leading-relaxed text-justify font-light pt-4">
      <h3 class="text-2xl font-black text-[#ede8df] border-b border-[rgba(237,232,223,0.1)] pb-2">
        {{ chapter.contentBlocks[2].heading }}
      </h3>
      <div class="newspaper-cols-2 space-y-4">
        <p>
          به موازات تخلیه مغزها، 
          <TermHighlight 
            term="فرار سرمایه" 
            en="Capital Flight" 
            category="اقتصاد مالی و خروج دارایی"
            definition="خروج شتابان منابع پولی، طلا، ارز و دارایی‌های اقتصادی از یک کشور به مقاصد امن خارجی ناشی از نااطمینانی اقتصادی، سقوط پول ملی و خطرات مصادره."
          />
          مالی نیز شریان‌های اقتصاد کشور را خشکانده است. آمارهای رسمی بانک مرکزی نشان می‌دهد طی یک دهه گذشته بالغ بر ۱۸۰ میلیارد دلار سرمایه خالص از ایران خارج شده است؛ ثروتی که بخش قابل‌توجهی از آن توسط رانت‌خواران و حلقه الیگارشی قدرت برای خرید املاک در ترکیه، کانادا و کشورهای حاشیه خلیج فارس هزینه شده است.
        </p>
        <p>
          این گسست ساختاری در تضاد بنیادین با دوران پیش از انقلاب است که دانشجویان بورسیه با اطمینان از جذب در صنایع نوین نفت، ذوب‌آهن، مخابرات و دانشگاه‌ها به میهن بازمی‌گشتند.
        </p>
      </div>
    </div>
  </article>
</template>
