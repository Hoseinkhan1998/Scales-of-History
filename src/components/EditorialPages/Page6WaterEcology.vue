<script setup>
import { chapters } from '../../data/publicationData';
import TermHighlight from '../Common/TermHighlight.vue';
import WaterCrisisDiagram from '../Visualizations/WaterCrisisDiagram.vue';

const chapter = chapters[5];
</script>

<template>
  <article class="max-w-5xl mx-auto py-8 px-4 sm:px-8 space-y-8 animate-fadeIn">
    <!-- سرنویس فصل -->
    <div class="border-b-2 border-[rgba(237,232,223,0.15)] pb-6 text-center md:text-right">
      <div class="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-[#b45309] mb-2 uppercase tracking-widest">
        <span>فصل ششم</span>
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

    <!-- بخش اول: ریشه‌های بحران در دوران پهلوی -->
    <div class="space-y-4 text-[#ede8df] text-base sm:text-lg leading-relaxed text-justify font-light">
      <h3 class="text-2xl font-black text-[#ede8df] border-b border-[rgba(237,232,223,0.1)] pb-2">
        {{ chapter.contentBlocks[0].heading }}
      </h3>
      <p>
        بنیان‌های مهندسی مهار آب در دوران پهلوی با الهام از پروژه‌های عظیمی چون سد هوور در ایالات متحده و با مشارکت مهندسان خارجی گذاشته شد. شاه کشاورزی سنتی ایران و سیستم چند هزار ساله قنات را کهنه‌پرستانه می‌دانست. در این دوره، صنایع فوق‌العاده آب‌بر نظیر ذوب‌آهن و فولاد، با جانمایی نادرست در فلات مرکزی خشک ایران (اصفهان) مستقر شدند و نیاز به 
        <TermHighlight 
          term="انتقال آب بین‌حوضه‌ای" 
          en="Inter-basin Water Transfer" 
          category="مدیریت منابع آب و هیدرولوژی"
          definition="طرح‌های انتقال مکانیکی آب از یک حوضه آبریز پرآب (مانند کارون) به مناطق کویری خشک؛ اقدامی که اکوسیستم مبدأ را نابود و در مقصد توهم فراوانی آب ایجاد می‌کند."
        />
        را پایه‌گذاری کردند.
      </p>
    </div>

    <!-- اینفوگرافیک فاجعه هیدرولوژیک -->
    <WaterCrisisDiagram />

    <!-- بخش دوم: جمهوری اسلامی و فاجعه زیست‌محیطی -->
    <div class="space-y-4 text-[#ede8df] text-base sm:text-lg leading-relaxed text-justify font-light pt-4">
      <h3 class="text-2xl font-black text-[#ede8df] border-b border-[rgba(237,232,223,0.1)] pb-2">
        {{ chapter.contentBlocks[2].heading }}
      </h3>
      <div class="newspaper-cols-2 space-y-4">
        <p>
          پس از انقلاب، شعار «خودکفایی در گندم و محصولات کشاورزی» با منافع مافیای ساخت‌وساز (قرارگاه‌های سازندگی و شرکت‌های وابسته) پیوند خورد. تعداد سدهای کشور تنها بین سال‌های ۲۰۱۲ تا ۲۰۱۸ از ۳۱۶ به ۶۴۷ سد افزایش یافت. بارزترین نمونه این نادانی مهندسی، احداث سد «گتوند علیا» بر روی 
          <TermHighlight 
            term="سازندهای نمکی عنبل" 
            en="Anbal Salt Formation" 
            category="زمین‌شناسی و فجایع مهندسی"
            definition="تپه‌های عظیم نمکی در مخزن سد گتوند؛ با آبگیری سد، میلیون‌ها تن نمک در آب شیرین کارون حل شد و کشاورزی خوزستان را به شوری کشاند."
          />
          بود که میلیون‌ها تن نمک را وارد رودخانه کارون کرد و جلگه خوزستان را به شوری کشاند.
        </p>
        <p>
          با خشک شدن رودها در پشت سدها، کشاورزان به حفر صدها هزار چاه عمیق غیرمجاز روی آوردند. داده‌های ماهواره‌ای نشان می‌دهد که ایران بین سال‌های ۲۰۰۳ تا ۲۰۱۹ بیش از ۲۱۱ کیلومتر مکعب از ذخایر 
          <TermHighlight 
            term="آبخوان‌های زیرزمینی" 
            en="Fossil / Deep Aquifers" 
            category="هیدروژئولوژی"
            definition="سفره‌های آب زیرزمینی باستانی که تجدید آنها هزاران سال زمان می‌برد؛ تخلیه این ذخایر به مرگ غیرقابل بازگشت خاک می‌انجامد."
          />
          خود را از دست داده است. 
          <TermHighlight 
            term="فرونشست زمین" 
            en="Land Subsidence" 
            category="بحران‌های ژئومورفولوژی"
            definition="فروریزش و نشست تدریجی سطح زمین در اثر مکش کامل آب سفره‌های زیرزمینی؛ در دشت تهران به رکورد سالانه ۲۵ سانتیمتر رسیده است."
          />
          در دشت تهران به ۲۵ سانتیمتر در سال رسیده، ۹۰ درصد مساحت دریاچه ارومیه خشکیده و بیش از ۱۲,۰۰۰ روستای ایران به دلیل بی‌آبی به طور کامل متروکه شده‌اند؛ روندی که کشور را وارد دوران 
          <TermHighlight 
            term="مهاجرت اقلیمی" 
            en="Climate Migration" 
            category="جامعه‌شناسی زیست‌محیطی"
            definition="کوچ اجباری ساکنان فلات مرکزی و مناطق جنوبی ایران به دلیل خشکی مفرط، فرونشست زمین و نبود آب آشامیدنی به سمت نوار شمالی کشور."
          />
          کرده است.
        </p>
      </div>
    </div>
  </article>
</template>
