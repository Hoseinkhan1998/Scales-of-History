<script setup>
import { chapters } from '../../data/publicationData';
import TermHighlight from '../Common/TermHighlight.vue';
import GdpComparisonChart from '../Visualizations/GdpComparisonChart.vue';
import RegionalEconomyTable from '../Visualizations/RegionalEconomyTable.vue';

const chapter = chapters[1];
</script>

<template>
  <article class="max-w-5xl mx-auto py-8 px-4 sm:px-8 space-y-8 animate-fadeIn">
    <!-- سرنویس فصل -->
    <div class="border-b-2 border-[rgba(237,232,223,0.15)] pb-6 text-center md:text-right">
      <div class="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-[#b45309] mb-2 uppercase tracking-widest">
        <span>فصل دوم</span>
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
      «سرازیر شدن دلارهای نفتی پس از ۱۹۷۳، ظرفیت جذب اقتصاد پهلوی را در هم شکست و بیماری هلندی را پدید آورد؛ در جمهوری اسلامی اما انزوای 
      <TermHighlight 
        term="ژئوپلیتیک" 
        en="Geopolitical" 
        category="جغرافیای سیاسی و روابط بین‌الملل"
        definition="پیوند میان جغرافیا، موقعیت سرزمینی و قدرت سیاسی بین‌المللی؛ در این متن اشاره به انزوای دیپلماتیک و منطقه‌ای ایران در اثر تنش‌های خارجی و تحریم‌ها دارد."
      /> 
      و تحریم، شاهرگ ارزی را مسدود و اقتصاد را به رانت خصولتی پیوند زد.»
    </blockquote>

    <!-- بخش اول: عصر پهلوی و رشد شتابان -->
    <div class="space-y-4 text-[#ede8df] text-base sm:text-lg leading-relaxed text-justify font-light">
      <h3 class="text-2xl font-black text-[#ede8df] border-b border-[rgba(237,232,223,0.1)] pb-2 font-serif">
        {{ chapter.contentBlocks[0].heading }}
      </h3>
      <div class="newspaper-cols-2 space-y-4">
        <p>
          اقتصاد ایران بین سال‌های ۱۹۶۰ تا ۱۹۷۶ (۱۳۳۹ تا ۱۳۵۵) یکی از بالاترین نرخ‌های رشد اقتصادی در جهان را به ثبت رساند. میانگین رشد سالانه تولید ناخالص داخلی واقعی به ۹.۸ تا ۱۰.۵ درصد رسید و حجم اقتصاد نزدیک به پنج برابر شد. درآمد سرانه از حدود ۱۷۰ دلار در سال ۱۹۶۳ به ۲۰۶۰ دلار در سال ۱۹۷۷ بالغ گردید. در سال ۱۹۷۶، سرانه تولید ناخالص داخلی بر مبنای 
          <TermHighlight 
            term="برابری قدرت خرید" 
            en="Purchasing Power Parity - PPP" 
            category="اقتصاد کلان و شاخص‌های بین‌المللی"
            definition="روشی در اقتصاد برای سنجش توان واقعی خرید مردم در کشورهای مختلف بر اساس یک سبد کالای یکسان، تا اثر نوسانات کاذب نرخ ارز حذف شود."
          />
          (دلار ۲۰۱۱) به رقم بی‌سابقه ۷,۷۰۰ دلار (و ۷,۴۲۲ دلار بر مبنای دلار ۲۰۱۵) رسید؛ رقمی که در چهار دهه پس از انقلاب هرگز به صورت پایدار تکرار نشد.
        </p>
        <p>
          اما نقطه عطف ویرانگر در اقتصاد سیاسی پهلوی، شوک نفتی ۱۹۷۳ بود؛ جهش قیمت هر بشکه نفت از ۲.۹۰ دلار به ۱۱.۶۵ دلار، سیلابی از درآمدهای ارزی را روانه بودجه دولتی کرد که ساختار اداری و تولیدی کشور گنجایش جذب آن را نداشت. پدیده کلاسیک 
          <TermHighlight 
            term="بیماری هلندی" 
            en="Dutch Disease" 
            category="اقتصاد منابع و نفت"
            definition="عارضه ناشی از تزریق ناگهانی دلارهای نفتی به اقتصاد؛ این امر به تقویت کاذب پول ملی، گرانی تولیدات بومی، تضعیف صنعت و کشاورزی و وابستگی کامل به واردات مصرفی می‌انجامد."
            context="نخستین بار در دهه ۱۹۶۰ در هلند پس از کشف گاز طبیعی مشاهده شد و در سال‌های ۱۳۵۲-۱۳۵۶ ساختار اقتصاد ایران را ویران کرد."
          />
          رخ داد: تورم شدید، تقویت کاذب نرخ واقعی ارز، ویرانی قدرت رقابت کشاورزی و صنعت سنتی در برابر واردات ارزان‌قیمت، و شکاف فزاینده میان نخبگان دربار با توده‌های زیر فشار تورم مسکن.
        </p>
      </div>
    </div>

    <!-- مصورسازی اول: نمودار رشد GDP و نوسانات تاریخی -->
    <GdpComparisonChart />

    <!-- بخش دوم: جمهوری اسلامی و اقتصاد خصولتی -->
    <div class="space-y-4 text-[#ede8df] text-base sm:text-lg leading-relaxed text-justify font-light pt-4">
      <h3 class="text-2xl font-black text-[#ede8df] border-b border-[rgba(237,232,223,0.1)] pb-2 font-serif">
        {{ chapter.contentBlocks[2].heading }}
      </h3>
      <div class="newspaper-cols-2 space-y-4">
        <p>
          با وقوع انقلاب ۱۳۵۷، اقتصاد ایران با شوک خروج سرمایه (۳۰ تا ۴۰ میلیارد دلار)، جنگ ویرانگر ۸ ساله با عراق و سپس استقرار شبکه نهادهای شبه‌دولتی («خصولتی») مواجه شد. بنیاد مستضعفان، آستان قدس، ستاد اجرایی و قرارگاه خاتم‌الانبیاء با تصاحب اموال مصادره‌شده، بین ۲۰ تا ۵۰ درصد از تولید ناخالص داخلی را به انحصار خود درآوردند؛ نهادهایی که با معافیت‌های مالیاتی و رانت‌های چندنرخی ارزی، بخش خصوصی واقعی را به حاشیه راندند.
        </p>
        <p>
          تحریم‌های فزاینده دهه‌های ۲۰۱۰ و ۲۰۲۰ و پیگیری پارادایم 
          <TermHighlight 
            term="اقتصاد مقاومتی" 
            en="Resistance Economy" 
            category="اقتصاد سیاسی حکمرانی"
            definition="دکترین اقتصادی مبتنی بر خودکفایی، قطع وابستگی خارجی و مقاومت در برابر تحریم‌های بین‌المللی که در عمل به انزوای تجارت خارجی و تسلط نهادهای شبه‌دولتی انجامید."
          />
          صادرات نفت را که زمانی بالغ بر ۲.۵ میلیون بشکه در روز بود به شدت محدود ساخت. تورم که در دوران پهلوی به جز سال‌های پایانی عمدتاً تک‌رقمی یا زیر ۱۵ درصد بود، در سال‌های اخیر به بالاتر از ۴۰ تا ۴۸.۶ درصد رسید و با صعود شبکه 
          <TermHighlight 
            term="الیگارشی رانتی" 
            en="Rentier Oligarchy" 
            category="جامعه‌شناسی اقتصادی"
            definition="تسلط حلقه محدودی از کارگزاران و وابستگان به کانون‌های قدرت بر منابع مالی، ارز ترجیحی و امتیازات تجاری انحصاری کشور."
          />
          و سقوط ارزش ریال، قدرت خرید طبقه متوسط و پس‌اندازهای بازنشستگان نابود شد.
        </p>
      </div>
    </div>

    <!-- مصورسازی دوم: جدول مقایسه منطقه‌ای با کره و ترکیه -->
    <RegionalEconomyTable />
  </article>
</template>
