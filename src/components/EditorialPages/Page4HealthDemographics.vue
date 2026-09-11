<script setup>
import { chapters } from '../../data/publicationData';
import TermHighlight from '../Common/TermHighlight.vue';
import HealthDemographicsCard from '../Visualizations/HealthDemographicsCard.vue';

const chapter = chapters[3];
</script>

<template>
  <article class="max-w-5xl mx-auto py-8 px-4 sm:px-8 space-y-8 animate-fadeIn">
    <!-- سرنویس فصل -->
    <div class="border-b-2 border-[rgba(237,232,223,0.15)] pb-6 text-center md:text-right">
      <div class="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-[#b45309] mb-2 uppercase tracking-widest">
        <span>فصل چهارم</span>
        <span>•</span>
        <span>{{ chapter.kicker }}</span>
        <span>•</span>
        <span class="text-[#736f68]">زمان مطالعه: {{ chapter.readTime }}</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-black text-[#ede8df] leading-tight font-serif">
        {{ chapter.title }}
      </h1>
      <p class="text-lg text-[#a8a39a] mt-3 font-light max-w-3xl leading-relaxed">
        {{ chapter.summary }}
      </p>
    </div>

    <!-- نقل‌قول سردبیری -->
    <blockquote class="p-6 bg-[#13141b] border-r-4 border-[#b45309] rounded-sm text-base sm:text-lg text-[#ede8df] font-serif leading-loose italic">
      {{ chapter.leadQuote }}
    </blockquote>

    <!-- متن اول: بهداشت پیش از ۵۷ -->
    <div class="space-y-4 text-[#ede8df] text-base sm:text-lg leading-relaxed text-justify font-light">
      <h3 class="text-2xl font-black text-[#ede8df] border-b border-[rgba(237,232,223,0.1)] pb-2 font-serif">
        {{ chapter.contentBlocks[0].heading }}
      </h3>
      <p>
        در دوران پهلوی، به رغم ثروت سرشار نفتی، نظام سلامت شدیداً طبقاتی و مرکزگرا بود. بیمارستان‌های مجهز در تهران و شیراز برای نخبگان برپا می‌شد، اما مناطق روستایی از کمترین امکانات محروم بودند. در سال ۱۹۷۴، نرخ مرگ‌ومیر نوزادان در روستاها حدود ۱۲۰ در هزار تولد زنده بود (در برابر ۶۲ در شهرها). نرخ مرگ مادران باردار در زایمان بسیار بالا و 
        <TermHighlight 
          term="امید به زندگی" 
          en="Life Expectancy at Birth" 
          category="شاخص‌های سلامت و توسعه انسانی"
          definition="میانگین تعداد سال‌هایی که انتظار می‌رود یک نوزاد متولدشده بر اساس الگوهای مرگ‌ومیر کنونی جامعه زندگی کند؛ اصلی‌ترین شاخص سنجش سطح بهداشت و تغذیه عمومی."
        />
        در بدو تولد حدود ۵۴ سال برآورد می‌شد.
      </p>
    </div>

    <!-- مصورسازی شاخص‌های سلامت و تحدید نسل -->
    <HealthDemographicsCard />

    <!-- متن دوم: شبکه خانه‌های بهداشت و معجزه جمعیتی -->
    <div class="space-y-4 text-[#ede8df] text-base sm:text-lg leading-relaxed text-justify font-light pt-4">
      <h3 class="text-2xl font-black text-[#ede8df] border-b border-[rgba(237,232,223,0.1)] pb-2 font-serif">
        {{ chapter.contentBlocks[2].heading }}
      </h3>
      <div class="newspaper-cols-2 space-y-4">
        <p>
          پس از انقلاب، وزارت بهداشت با پایه‌گذاری شبکه 
          <TermHighlight 
            term="مراقبت‌های اولیه (PHC)" 
            en="Primary Health Care" 
            category="سیاست‌گذاری بهداشت همگانی"
            definition="مدل جامع سازمان بهداشت جهانی مبتنی بر پیشگیری، واکسیناسیون، تغذیه و سلامت مادر و کودک در سطح پایه‌ای‌ترین واحدهای جمعیتی محلی."
          />
          و به‌کارگیری 
          <TermHighlight 
            term="بهورزان" 
            en="Behvarz / Health Workers" 
            category="سرمایه انسانی بهداشت روستایی"
            definition="نیروهای بهداشتی بومی ساکن روستا که دوره‌های آموزشی فشرده دیده‌اند و عامل اصلی ریشه‌کنی بیماری‌های واگیردار و کاهش تاریخی مرگ نوزادان در سراسر ایران شدند."
          />
          بومی، انقلابی در پیشگیری و واکسیناسیون همگانی رقم زد. تا سال ۲۰۰۰، مرگ نوزادان به ۲۸ در شهر و ۳۰ در روستا کاهش یافت و شکاف بهداشتی شهر و روستا عملاً محو شد. بر اساس گزارش سازمان بهداشت جهانی (WHO)، مرگ مادران در زایمان از ۱۲۳ در سال ۱۹۹۰ به ۲۵ در سال ۲۰۱۸ رسید و امید به زندگی با ۲۲ سال افزایش به ۷۵.۴ سال ارتقا یافت.
        </p>
        <p>
          همچنین در اواخر دهه ۱۳۶۰ (۱۹۸۹)، دولت با درک فاجعه انفجار جمعیتی ناشی از سیاست‌های تشویقی پس از انقلاب، برنامه ملی تنظیم خانواده را با حمایت فتوای فقها به اجرا گذاشت. با توزیع رایگان اقلام پیشگیری در دورافتاده‌ترین خانه‌های بهداشت، 
          <TermHighlight 
            term="نرخ باروری" 
            en="Total Fertility Rate - TFR" 
            category="جمعیت‌شناسی و برنامه‌ریزی ملی"
            definition="میانگین تعداد فرزندانی که یک زن در طول سنین باروری به دنیا می‌آورد؛ این نرخ در ایران از ۸.۴ فرزند در سال ۱۹۸۵ به ۲.۴ فرزند در سال ۲۰۰۲ سقوط کرد."
          />
          زنان روستایی به شدت افت کرد؛ 
          <TermHighlight 
            term="گذاری جمعیتی" 
            en="Demographic Transition" 
            category="تحولات جمعیتی"
            definition="گذار سریع ساختار جمعیت از زادولد بسیار بالا به باروری مهارشده و تعادلی؛ شتاب این فرآیند در ایران سریع‌ترین نمونه ثبت‌شده در تاریخ معاصر جهان است."
          />
          که سریع‌ترین کاهش باروری ثبت‌شده در جهان به شمار می‌آید.
        </p>
      </div>
    </div>
  </article>
</template>
