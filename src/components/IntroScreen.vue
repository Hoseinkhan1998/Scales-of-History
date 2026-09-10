<script setup>
import { onMounted } from 'vue';
import { useAudioPlayer } from '../composables/useAudioPlayer';
import { useSyncState } from '../composables/useSyncState';

const emit = defineEmits(['start-experience']);
const { startExperienceAudio, isAudioPlaying, isBlockedByBrowser } = useAudioPlayer();
const { roomId } = useSyncState();

onMounted(() => {
  // پخش بیدرنگ موزیک اول از ثانیه اول ورود به صفحه
  startExperienceAudio();
});

// با هر کلیک یا لمس در هر کجای صفحه آغازین، موسیقی بی‌درنگ از ثانیه صفر پخش می‌شود
function handleScreenTap() {
  if (!isAudioPlaying.value) {
    startExperienceAudio();
  }
}

function handleEnter(e) {
  e.stopPropagation();
  startExperienceAudio();
  emit('start-experience');
}
</script>

<template>
  <div 
    @click="handleScreenTap"
    @pointerdown="handleScreenTap"
    class="fixed inset-0 z-50 bg-[#07080a] flex flex-col justify-between items-center p-6 md:p-12 overflow-hidden select-none cursor-pointer"
  >
    <!-- پس‌زمینه تصویر تاریخی fight.png با شفافیت بیشتر و وضوح بالاتر -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
      <img 
        src="/fight.png" 
        alt="رویارویی تاریخی"
        class="w-full h-full object-cover object-center animate-cinematic transition-all duration-1000 transform"
      />
      <!-- لایه گرادینت سبک‌تر و ملایم‌تر برای نمایش واضح‌تر و زنده‌تر جزئیات عکس -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#07080a]/85 via-transparent to-[#07080a]/40"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,#07080a_90%)]"></div>
      <!-- بافت گرانولار روزنامه‌ای قدیمی -->
      <div class="absolute inset-0 paper-grain opacity-30"></div>
    </div>

    <!-- سربرگ مینیمال آغازین -->
    <header class="relative z-10 w-full max-w-5xl flex flex-col sm:flex-row justify-between items-center gap-3 text-xs tracking-widest text-[#a8a39a]/90">
      <div class="flex items-center gap-2 bg-black/40 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
        <span class="w-2 h-2 rounded-full bg-[#b45309] animate-pulse"></span>
        <span class="font-mono text-[11px] text-[#ede8df]">آرشیو اسناد معاصر ایران • ۱۹۶۳ تا ۲۰۲۶</span>
      </div>      
    </header>

    <!-- کانون محتوایی مرکزی: عنوان اثر همراه با پس‌زمینه بلور برای خوانایی کامل متن -->
    <main class="relative z-10 max-w-3xl text-center space-y-5 px-6 sm:px-10 py-8 bg-[#07080a]/45 backdrop-blur-md rounded-lg border border-[rgba(237,232,223,0.12)] shadow-2xl">
      <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#ede8df] leading-tight font-serif drop-shadow-md">
        تــرازوی تـاریـخ
      </h1>

      <p class="text-lg sm:text-xl text-[#ede8df]/95 max-w-2xl mx-auto font-light leading-relaxed">
        پژوهشی عریان، مستند و فارغ از تعصب پیرامون پنجاه سال گذار سیاسی، دگرگونی طبقاتی، توسعه انسانی و سرنوشت اکولوژیک ایران
      </p>
    </main>

    <!-- کادر هوشمند ورود: نمایش کد اتصال در حالت عادی، و تبدیل نرم به دکمه ورود با هاور -->
    <footer class="relative z-10 w-full max-w-md flex flex-col items-center">
      <div class="relative group cursor-pointer w-full">
        <button 
          @click="handleEnter"
          class="w-full relative h-16 rounded-sm border border-[rgba(237,232,223,0.25)] bg-[#121319]/85 backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-[#b45309] hover:shadow-[0_0_30px_rgba(180,83,9,0.35)] active:scale-98 cursor-pointer"
        >
          <!-- ۱. حالت عادی (بدون هاور): فقط کد ۳ رقمی بزرگ، تمیز و چشم‌نواز بدون هیچ متن اضافی -->
          <div class="absolute inset-0 flex items-center justify-center transition-all duration-500 opacity-100 group-hover:opacity-0 pointer-events-none">
            <span class="text-2xl sm:text-3xl font-mono font-black text-[#f59e0b] tracking-[0.35em] drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
              {{ roomId || '...' }}
            </span>
          </div>

          <!-- ۲. حالت هاور: محو شدن کد و نمایان شدن آرام و چشم‌نواز دکمه ورود و آغاز بازخوانی تاریخی -->
          <div class="absolute inset-0 bg-[#ede8df] text-[#0d0e11] flex items-center justify-center gap-3 transition-all duration-500 opacity-0 group-hover:opacity-100 font-bold text-base shadow-2xl">
            <span>ورود و آغاز بازخوانی تاریخی</span>
            <span class="text-xl group-hover:-translate-x-1.5 transition-transform duration-300">←</span>
          </div>
        </button>
      </div>
    </footer>
  </div>
</template>
