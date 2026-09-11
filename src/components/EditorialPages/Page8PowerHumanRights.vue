<script setup>
import { chapters } from '../../data/publicationData';
import TermHighlight from '../Common/TermHighlight.vue';
import PowerStructureMatrix from '../Visualizations/PowerStructureMatrix.vue';

const chapter = chapters[7];
</script>

<template>
  <article class="max-w-5xl mx-auto py-8 px-4 sm:px-8 space-y-8 animate-fadeIn">
    <!-- سرنویس فصل -->
    <div class="border-b-2 border-[rgba(237,232,223,0.15)] pb-6 text-center md:text-right">
      <div class="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-[#b45309] mb-2 uppercase tracking-widest">
        <span>فصل هشتم</span>
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

    <!-- بخش اول: دیکتاتوری سلطنتی و ساواک -->
    <div class="space-y-4 text-[#ede8df] text-base sm:text-lg leading-relaxed text-justify font-light">
      <h3 class="text-2xl font-black text-[#ede8df] border-b border-[rgba(237,232,223,0.1)] pb-2 font-serif">
        {{ chapter.contentBlocks[0].heading }}
      </h3>
      <div class="newspaper-cols-2 space-y-4">
        <p>
          دولت پهلوی دوم به ویژه پس از کودتای ۲۸ مرداد ۱۳۳۲، تدریجاً تمام منافذ دموکراتیک مشروطه را مسدود کرد. 
          <TermHighlight 
            term="ساواک" 
            en="SAVAK" 
            category="سازمان‌های امنیتی و سرکوب پهلوی"
            definition="سازمان اطلاعات و امنیت کشور (۱۳۳۵ تا ۱۳۵۷)؛ بازوی اصلی تجسس، شکنجه سیستماتیک و سرکوب نیروهای سیاسی مخالف سلطنت."
          />
          با کمک دستگاه‌های امنیتی غربی در سال ۱۳۳۶ تأسیس شد و با گسترش شکنجه‌های بدنی وحشیانه (شوک الکتریکی، قفس داغ، آپولو و شلاق) به مصاف چریک‌های مسلح و منتقدان دانشگاهی رفت.
        </p>
        <p>
          اوج انسداد سیاسی در سال ۱۳۵۴ با انحلال همان احزاب نمایشی «ایران نوین» و «مردم» و پایه‌گذاری نظام تک‌حزبی 
          <TermHighlight 
            term="حزب رستاخیز" 
            en="Rastakhiz Party" 
            category="نظام‌های تک‌حزبی تمامیت‌خواه"
            definition="تنها حزب سراسری قانونی اعلام‌شده توسط شاه در سال ۱۳۵۴ که عضویت در آن برای تمام کارمندان و شهروندان اجباری و مخالفت با آن مستوجب نفی تابعیت دانسته شد."
          />
          رقم خورد؛ جایی که شاه صراحتاً اعلام کرد هر کس به این حزب نمی‌پوندد باید پاسپورتش را بگیرد و از کشور خارج شود. این تحقیر سیاسی، طبقه متوسط تکنوکرات را که خود رژیم پرورده بود، به صف انقلابیون پیوند داد.
        </p>
      </div>
    </div>

    <!-- ماتریس تطبیقی سازوکارهای سرکوب -->
    <PowerStructureMatrix />

    <!-- بخش دوم: تمامیت‌خواهی عقیدتی و اعدام‌های ۶۷ -->
    <div class="space-y-4 text-[#ede8df] text-base sm:text-lg leading-relaxed text-justify font-light pt-4">
      <h3 class="text-2xl font-black text-[#ede8df] border-b border-[rgba(237,232,223,0.1)] pb-2 font-serif">
        {{ chapter.contentBlocks[2].heading }}
      </h3>
      <div class="newspaper-cols-2 space-y-4">
        <p>
          پس از انقلاب، دستگاه سرکوب به شکلی بسیار خشن‌تر، ایدئولوژیک‌تر و 
          <TermHighlight 
            term="توتالیتار (تمامیت‌خواه)" 
            en="Totalitarian" 
            category="فلسفه سیاسی و گونه‌شناسی حکومت‌ها"
            definition="نظامی سیاسی که نظارت خود را فراتر از قدرت سیاسی، بر تمامی جنبه‌های زندگی فردی، پوشش، عقیده، روابط اجتماعی و قلمرو خصوصی شهروندان تحمیل می‌کند."
          />
          بازسازی شد. هدف شکنجه دیگر صرفاً کسب اطلاعات نبود؛ طبق پژوهش یرواند آبراهامیان در «اعترافات شکنجه‌شدگان»، هدف درهم‌شکستن انسانیت و برپایی نمایش‌های 
          <TermHighlight 
            term="تواب‌سازی" 
            en="Ideological Recantation" 
            category="شکنجه روانی و کنترل عقیدتی"
            definition="فرآیند تفتیش عقاید و شکنجه‌های روحی-جسمی برای وادار کردن زندانیان به اعترافات تلویزیونی علیه خود و توبه اجباری از باورهای پیشین."
          />
          و اعترافات تلویزیونی برای اثبات حقانیت نظام بود.
        </p>
        <p>
          فجیع‌ترین جلوه این خشونت، 
          <TermHighlight 
            term="اعدام‌های تابستان ۱۳۶۷" 
            en="1988 Mass Executions" 
            category="تاریخ نقض حقوق بشر"
            definition="کشتار مخفیانه چندین هزار زندانی سیاسی محبوس و در حال گذراندن محکومیت با حکم هیئت‌های موسوم به هیئت مرگ در پی فتوای رهبر وقت جمهوری اسلامی."
          />
          بود؛ جایی که احکام اعدام بیش از ۴,۰۰۰ تا ۸,۰۰۰ زندانی سیاسی صادر شد. فراتر از آن، حکومت با گشت ارشاد، حجاب اجباری، تفکیک جنسیتی و گزینش‌های عقیدتی، حوزه خصوصی شهروندان را به میدان جنگ دائمی بدل ساخت.
        </p>
      </div>
    </div>
  </article>
</template>
