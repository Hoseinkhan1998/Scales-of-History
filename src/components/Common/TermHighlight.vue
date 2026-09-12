<script setup>
defineProps({
  term: {
    type: String,
    required: true
  },
  en: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: 'اصطلاح مفهومی'
  },
  definition: {
    type: String,
    required: true
  },
  context: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <span class="term-highlight-container relative inline-block cursor-help group mx-0.5 align-baseline select-text">
    <!-- کلمه اصلی درون متن -->
    <span class="term-text relative z-10 px-1 py-0.5 font-medium text-[#f3ede2] transition-all duration-300 group-hover:text-amber-300 group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
      {{ term }}
    </span>

    <!-- لایه متحرک ماژیک / بوردر چرخشی دور کلمه با SVG -->
    <svg class="marker-svg absolute inset-0 w-full h-full pointer-events-none overflow-visible" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        rx="4"
        ry="4"
        class="marker-rect"
        pathLength="100"
      />
    </svg>

    <!-- پس‌زمینه هایلایت ملایم که همگام با هاور روشن می‌شود -->
    <span class="marker-bg absolute inset-0 rounded bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></span>

    <!-- تولتیپ شناور و شیک بالای کلمه -->
    <div 
      class="tooltip-card absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 sm:w-80 p-3.5 bg-[#14151e]/95 backdrop-blur-xl border border-amber-500/40 rounded-lg shadow-[0_12px_32px_rgba(0,0,0,0.8),0_0_15px_rgba(217,119,6,0.15)] text-right z-50 pointer-events-none opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out"
    >
      <!-- سربرگ تولتیپ -->
      <div class="flex items-center justify-between border-b border-white/10 pb-2 mb-2 gap-2">
        <div class="flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
          <span class="text-xs font-black text-amber-400">{{ term }}</span>
          <span v-if="en" class="text-[10px] text-[#a8a39a] font-mono tracking-wider">({{ en }})</span>
        </div>
        <span class="text-[9px] bg-amber-500/15 text-amber-300 px-2 py-0.5 rounded-full font-medium border border-amber-500/20">
          {{ category }}
        </span>
      </div>

      <!-- متن تعریف -->
      <p class="text-xs leading-relaxed text-[#ede8df] font-light text-justify">
        {{ definition }}
      </p>

      <!-- نکته بافتی / تاریخی متن (در صورت وجود) -->
      <div v-if="context" class="mt-2 pt-2 border-t border-white/5 flex items-start gap-1.5 text-[11px] text-amber-200/80 leading-normal">
        <span class="shrink-0 text-amber-500">📌</span>
        <span>{{ context }}</span>
      </div>

      <!-- فلش اشاره‌گر به سمت کلمه -->
      <div class="tooltip-arrow absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] w-0 h-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-amber-500/40"></div>
      <div class="tooltip-arrow-inner absolute top-full left-1/2 -translate-x-1/2 -mt-[2px] w-0 h-0 border-x-[5px] border-x-transparent border-t-[5px] border-t-[#14151e]"></div>
    </div>
  </span>
</template>

<style scoped>
.term-highlight-container {
  vertical-align: baseline;
}

/* افکت مقیاس کلمه بدون به هم زدن چیدمان متنی */
.term-text {
  display: inline-block;
  transform-origin: center;
}

.group:hover .term-text {
  transform: scale(1.05);
}

/* انیمیشن کشیده شدن خط ماژیک دور کلمه همراه با نقطه مشخص در گوشه کلمه */
.marker-rect {
  fill: none;
  stroke: #f59e0b;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 100;
  stroke-dashoffset: 98.8;
  transition: stroke-dashoffset 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 0 2px rgba(245, 158, 11, 0.5));
}

.group:hover .marker-rect {
  stroke-dashoffset: 0;
}
</style>
