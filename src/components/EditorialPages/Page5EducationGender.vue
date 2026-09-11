<script setup>
import { chapters } from '../../data/publicationData';
import TermHighlight from '../Common/TermHighlight.vue';
import GenderParadoxChart from '../Visualizations/GenderParadoxChart.vue';

const chapter = chapters[4];
</script>

<template>
  <article class="max-w-5xl mx-auto py-8 px-4 sm:px-8 space-y-8 animate-fadeIn">
    <!-- سرنویس فصل -->
    <div class="border-b-2 border-[rgba(237,232,223,0.15)] pb-6 text-center md:text-right">
      <div class="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-[#b45309] mb-2 uppercase tracking-widest">
        <span>فصل پنجم</span>
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

    <!-- بخش اول: سوادآموزی و آموزش عالی -->
    <div class="space-y-4 text-[#ede8df] text-base sm:text-lg leading-relaxed text-justify font-light">
      <h3 class="text-2xl font-black text-[#ede8df] border-b border-[rgba(237,232,223,0.1)] pb-2 font-serif">
        {{ chapter.contentBlocks[0].heading }}
      </h3>
      <div class="newspaper-cols-2 space-y-4">
        <p>
          در عصر پهلوی، تشکیل 
          <TermHighlight 
            term="سپاه دانش" 
            en="Literacy Corps" 
            category="طرح‌های سوادآموزی پهلوی"
            definition="طرح ابتکاری در قالب انقلاب سفید که فارغ‌التحصیلان دیپلم و لیسانس را به جای خدمت سربازی پادگانی، برای آموزش خواندن و نوشتن به روستاهای دورافتاده اعزام می‌کرد."
          />
          تلاشی مدرن برای آموزش در روستاها بود، اما ساختار سنتی و مذهبی جامعه مانع از مشارکت فراگیر دختران می‌شد. در سال ۱۳۵۵ (۱۹۷۶)، نرخ سواد زنان در کل کشور تنها ۲۴ تا ۳۵ درصد و در میان زنان روستایی کمتر از ۱۹ درصد بود. حضور زنان در دانشگاه‌ها آغاز شده بود (۲۸٪ کل دانشجویان)، اما تنها ۱ درصد از زنان بالای ۲۰ سال مدرک دانشگاهی داشتند.
        </p>
        <p>
          پس از انقلاب، تفکیک جنسیتی مدارس و اسلامی‌سازی محیط‌های آموزشی، به صورت نامنتظره‌ای اعتماد خانواده‌های مذهبی را جلب کرد. امروزه نرخ سواد عمومی زنان به بیش از ۸۵ درصد و در رده سنی جوانان (۱۵ تا ۲۴ سال) به ۹۹ درصد رسیده است. زنان هم‌اکنون حدود ۶۰ درصد صندلی‌های دانشگاه و در آماری شگفت‌انگیز بیش از ۷۰ درصد فارغ‌التحصیلان 
          <TermHighlight 
            term="رشته‌های STEM" 
            en="Science, Technology, Engineering, Math" 
            category="آموزش عالی تخصصی"
            definition="سرواژه بین‌المللی علوم پایه، فناوری، مهندسی و ریاضیات؛ یکی از حوزه‌هایی که دانشجویان دختر ایرانی در آن رکوردهای منطقه‌ای و جهانی ثبت کرده‌اند."
          />
          را تشکیل می‌دهند.
        </p>
      </div>
    </div>

    <!-- مصورسازی هرم پارادوکس جنسیتی -->
    <GenderParadoxChart />

    <!-- بخش دوم: بن‌بست بازار کار -->
    <div class="space-y-4 text-[#ede8df] text-base sm:text-lg leading-relaxed text-justify font-light pt-4">
      <h3 class="text-2xl font-black text-[#ede8df] border-b border-[rgba(237,232,223,0.1)] pb-2 font-serif">
        {{ chapter.contentBlocks[2].heading }}
      </h3>
      <p>
        اما این دستاورد درخشان در پای دیوارهای بازار کار متوقف شد. 
        <TermHighlight 
          term="نرخ مشارکت اقتصادی زنان" 
          en="Female Labor Force Participation" 
          category="شاخص‌های اشتغال و برابری جنسیتی"
          definition="درصد زنان در سن اشتغال که شاغل یا در جستجوی فعال کار هستند؛ این رقم در ایران تنها ۱۲ تا ۱۵ درصد است که در قعر جدول جهانی قرار دارد."
        />
        در ایران تنها بین ۱۲ تا ۱۵ درصد در نوسان است (در مقایسه با میانگین جهانی ۵۰ درصدی). بیکاری زنان تحصیل‌کرده ۲۵ تا ۲۹ ساله در سرشماری ۱۳۹۵ به رقم وحشتناک ۴۵.۷ درصد رسید؛ این 
        <TermHighlight 
          term="پارادوکس جنسیتی" 
          en="Gender Paradox" 
          category="توسعه و جامعه‌شناسی جنسیتی"
          definition="شکاف فاحش میان سطح فوق‌العاده بالای تحصیلات دانشگاهی زنان و سهم بسیار ناچیز آنان در مدیریت، اقتصاد رسمی و فرصت‌های شغلی برابر."
        />
        ناشی از قوانین تبعیض‌آمیز و تفکیک‌های شغلی، این سرمایه انسانی عظیم را به انزوای خانه‌نشینی کشانده و یکی از سرچشمه‌های خشم ساختاری نسل جوان را پدید آورده است.
      </p>
    </div>
  </article>
</template>
