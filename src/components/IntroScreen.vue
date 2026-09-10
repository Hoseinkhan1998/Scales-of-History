<script setup>
import { onMounted } from 'vue';
import { useAudioPlayer } from '../composables/useAudioPlayer';

const emit = defineEmits(['start-experience']);
const { startExperienceAudio } = useAudioPlayer();

onMounted(() => {
  // پخش بیدرنگ موزیک اول دقیقا از ثانیه اول ورود به پرده آغازین
  startExperienceAudio();
});

function handleEnter() {
  emit('start-experience');
}
</script>

<template>
  <div class="fixed inset-0 z-50 bg-[#07080a] flex flex-col justify-between items-center p-6 md:p-12 overflow-hidden select-none">
    <!-- پس‌زمینه تصویر تاریخی fight.png با انیمیشن آشکارسازی سینمایی ۱۵ ثانیه‌ای -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
      <img 
        src="/fight.png" 
        alt="رویارویی تاریخی"
        class="w-full h-full object-cover object-center animate-cinematic transition-all duration-1000 transform"
      />
      <!-- لایه تاریک‌کننده، گرادینت دودی و بافت فیلم آنالوگ -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#07080a] via-[#07080a]/65 to-[#07080a]/80"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#07080a_95%)]"></div>
      <!-- بافت گرانولار روزنامه‌ای قدیمی -->
      <div class="absolute inset-0 paper-grain opacity-40"></div>
    </div>

    <!-- سربرگ مینیمال آغازین -->
    <header class="relative z-10 w-full max-w-5xl flex justify-center items-center text-xs tracking-widest text-[#a8a39a]/80">
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-[#b45309] animate-pulse"></span>
        <span class="font-mono text-[11px] text-[#ede8df]">آرشیو اسناد معاصر ایران • ۱۹۶۳ تا ۲۰۲۶</span>
      </div>
    </header>

    <!-- کانون محتوایی مرکزی: عنوان اثر و متون فضاسازی تاریخی -->
    <main class="relative z-10 max-w-3xl text-center space-y-6 px-4">
      <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#ede8df] leading-tight font-serif">
        تــرازوی تـاریـخ
      </h1>

      <p class="text-lg sm:text-xl text-[#a8a39a] max-w-2xl mx-auto font-light leading-relaxed">
        پژوهشی عریان، مستند و فارغ از تعصب پیرامون پنجاه سال گذار سیاسی، دگرگونی طبقاتی، توسعه انسانی و سرنوشت اکولوژیک ایران
      </p>
    </main>

    <!-- کلید ورود به نشریه -->
    <footer class="relative z-10 w-full max-w-lg flex flex-col items-center">
      <button 
        @click="handleEnter"
        class="w-full sm:w-auto px-10 py-4 bg-[#ede8df] text-[#0d0e11] hover:bg-white active:scale-98 font-bold text-base rounded-sm shadow-2xl flex items-center justify-center gap-3 transition-all cursor-pointer group border border-white"
      >
        <span>ورود و آغاز بازخوانی تاریخی</span>
        <span class="text-xl group-hover:-translate-x-1.5 transition-transform">←</span>
      </button>
    </footer>
  </div>
</template>
