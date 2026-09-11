<script setup>
import { chapters } from '../../data/publicationData';
import TermHighlight from '../Common/TermHighlight.vue';

const chapter = chapters[8];
</script>

<template>
  <article class="max-w-5xl mx-auto py-8 px-4 sm:px-8 space-y-8 animate-fadeIn">
    <!-- سرنویس فصل -->
    <div class="border-b-2 border-[rgba(237,232,223,0.15)] pb-6 text-center md:text-right">
      <div class="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-[#b45309] mb-2 uppercase tracking-widest">
        <span>فصل نهم</span>
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

    <!-- متن تحلیل فرضی و سناریونویسی -->
    <div class="space-y-4 text-[#ede8df] text-base sm:text-lg leading-relaxed text-justify font-light">
      <h3 class="text-2xl font-black text-[#ede8df] border-b border-[rgba(237,232,223,0.1)] pb-2 font-serif">
        {{ chapter.contentBlocks[0].heading }}
      </h3>
      <div class="newspaper-cols-2 space-y-4">
        <p>
          اگر انقلاب ۱۳۵۷ رخ نمی‌داد یا حکومت موفق به مهار امواج اعتراضی می‌شد، ایران در دهه‌های ۱۹۸۰ و ۱۹۹۰ چه مسیری را طی می‌کرد؟ تاریخ‌نگارانی چون نیکی کدی، علی انصاری و رهام الوندی با روش 
          <TermHighlight 
            term="تاریخ ضدواقعیت" 
            en="Counterfactual History" 
            category="روش‌شناسی تاریخ و آینده‌پژوهی"
            definition="رویکردی علمی در اقتصاد سیاسی و تاریخ تحلیلی که با تغییر یک گره‌گاه تاریخی مشخص، سناریوهای جایگزین را با تکیه بر متغیرهای عینی شبیه‌سازی می‌کند."
          />
          نشان می‌دهند که سناریوی ادامه سلطنت با متغیرهای اقتصادی و ژئوپلیتیک تکان‌دهنده‌ای روبرو می‌شد.
        </p>
        <p>
          نخستین ضربه، سقوط قیمت نفت در دهه ۱۹۸۰ (رسیدن نفت به زیر ۱۰ دلار) بود. اقتصاد ایران در سال‌های ۵۶-۵۷ نیز به دلیل ولخرجی‌های شاه دچار کسری بودجه و 
          <TermHighlight 
            term="رکود تورمی" 
            en="Stagflation" 
            category="اقتصاد کلان"
            definition="همزمانی بحرانی رکود اقتصادی و بیکاری همراه با تورم لجام‌گسیخته قیمت‌ها که مهار آن یکی از دشوارترین چالش‌های سیاست‌گذاری پولی است."
          />
          شده بود. سقوط درآمدهای نفتی، دولت پهلوی را مجبور به انقباض شدید مالی، تعطیلی پروژه‌های بلندپروازانه و مواجهه با اعتصابات گسترده کارگری می‌کرد.
        </p>
      </div>
    </div>

    <!-- کارت‌های سه سناریوی تاریخی جایگزین -->
    <div class="my-8 space-y-4">
      <h4 class="text-lg font-black text-[#ede8df] border-b border-[rgba(237,232,223,0.1)] pb-2">
        سه شاخه فرضی از مسیر تحولات معاصر
      </h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          v-for="(sc, idx) in chapter.contentBlocks[1].items" 
          :key="idx"
          class="bg-[#181921] p-5 border border-[rgba(237,232,223,0.1)] rounded-sm flex flex-col justify-between"
        >
          <div>
            <span class="text-[10px] font-bold text-[#b45309] bg-[#b45309]/15 px-2 py-0.5 rounded-full inline-block mb-2">
              {{ sc.prob }}
            </span>
            <div class="text-sm font-bold text-[#ede8df] mb-2 leading-tight">
              {{ sc.title }}
            </div>
          </div>
          <p class="text-xs text-[#a8a39a] leading-relaxed pt-3 border-t border-[rgba(237,232,223,0.06)] mt-2">
            <template v-if="idx === 0">
              با مرگ محمدرضا شاه در اثر بیماری، ولیعهد با همراهی 
              <TermHighlight 
                term="تکنوکرات‌های ملی" 
                en="National Technocrats" 
                category="مدیریت دولتی و نخبگان علمی"
                definition="متخصصان، مهندسان و اقتصاددانان کاردان و غیرایدئولوژیک که در سازمان برنامه‌وبودجه و وزارتخانه‌ها به جای وفاداری سیاسی، بر پایه دانش تخصصی و شایسته‌سالاری تصمیم‌گیری می‌کردند."
              /> 
              و طبقه متوسط، فضای سیاسی را باز می‌کرد و الگویی شبیه به گذار پادشاهی خوآن کارلوس در اسپانیا پس از فرانکو را رقم می‌زد.
            </template>
            <template v-else>
              {{ sc.desc }}
            </template>
          </p>
        </div>
      </div>
    </div>

    <!-- پانویس متدولوژی تاریخ فرضی -->
    <div class="p-4 bg-[#14151e] border-r-2 border-[#b45309] text-xs text-[#a8a39a] leading-relaxed">
      <strong>تذکر روش‌شناختی:</strong>
      تحلیل‌های تاریخ جایگزین (Counterfactual History) نه برای حسرت‌ورزی نوستالژیک، بلکه برای درک وزن متغیرهای عینی (مانند نوسانات قیمت نفت و تقاضای طبقه متوسط برای دموکراسی) در علم اقتصاد سیاسی به کار گرفته می‌شوند.
    </div>
  </article>
</template>
