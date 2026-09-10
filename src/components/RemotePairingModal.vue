<script setup>
import { ref, onMounted, watch } from 'vue';
import QRCode from 'qrcode';
import { useSyncState } from '../composables/useSyncState';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close']);

const { roomId, connectedPeersCount } = useSyncState();
const qrDataUrl = ref('');
const controllerUrl = ref('');
const copied = ref(false);

async function generateQr() {
  if (typeof window === 'undefined' || !roomId.value) return;
  const baseUrl = window.location.origin + window.location.pathname;
  controllerUrl.value = `${baseUrl}?role=controller&room=${roomId.value}`;

  try {
    qrDataUrl.value = await QRCode.toDataURL(controllerUrl.value, {
      width: 260,
      margin: 2,
      color: {
        dark: '#0d0e11',
        light: '#ede8df'
      }
    });
  } catch (err) {
    console.warn('QR code generation error:', err);
  }
}

function copyUrl() {
  if (!controllerUrl.value) return;
  navigator.clipboard.writeText(controllerUrl.value).then(() => {
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 2500);
  });
}

function openControllerSimulator() {
  if (!controllerUrl.value) return;
  window.open(controllerUrl.value, '_blank', 'width=390,height=844,resizable=yes');
}

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    generateQr();
  }
});

onMounted(() => {
  if (roomId.value) generateQr();
});
</script>

<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    @click.self="emit('close')"
  >
    <div class="bg-[#121318] border border-[rgba(237,232,223,0.2)] max-w-md w-full p-6 text-right shadow-2xl relative rounded-sm">
      <!-- دکمه بستن -->
      <button 
        @click="emit('close')"
        class="absolute top-4 left-4 text-[#a8a39a] hover:text-white text-lg p-1 cursor-pointer"
        aria-label="بستن پنجره"
      >
        ✕
      </button>

      <!-- سربرگ مدال -->
      <div class="border-b border-[rgba(237,232,223,0.12)] pb-3 mb-5">
        <span class="text-xs text-[#b45309] font-bold">قابلیت انحصاری همگام‌سازی بین‌دستگاهی</span>
        <h3 class="text-xl font-black text-[#ede8df] mt-1">اتصال تلفن همراه به عنوان ریموت کنترل</h3>
      </div>

      <p class="text-xs text-[#a8a39a] leading-relaxed mb-5">
        برای ورق زدن صفحات نشریه بر روی این مانیتور یا تلویزیون بزرگ و تنظیم بلندی صدا از راه دور، با دوربین گوشی خود بارکد زیر را اسکن کنید:
      </p>

      <!-- بخش تصویر کد QR -->
      <div class="flex flex-col items-center justify-center p-4 bg-[#ede8df] rounded-sm mx-auto w-fit mb-4">
        <img v-if="qrDataUrl" :src="qrDataUrl" alt="بارکد اتصال گوشی" class="w-52 h-52 object-contain" />
        <div v-else class="w-52 h-52 flex items-center justify-center text-xs text-[#0d0e11]">
          در حال تولید بارکد...
        </div>
      </div>

      <!-- راهنمای پیوند مستقیم در مرورگر گوشی -->
      <div class="bg-[#181921] p-2.5 border border-[rgba(237,232,223,0.1)] rounded-sm text-center mb-3 text-[11px] text-[#a8a39a]">
        <span>پیوند مستقیم کنترلر در مرورگر گوشی:</span>
        <div class="font-mono text-[#38bdf8] font-bold dir-ltr mt-0.5 select-all truncate text-xs">
          {{ controllerUrl }}
        </div>
      </div>

      <!-- کد اتاق ۳ رقمی -->
      <div class="bg-[#181921] p-3.5 border border-[rgba(237,232,223,0.1)] rounded-sm text-center mb-5">
        <span class="text-[11px] text-[#736f68] block mb-1">کد اتصال مستقیم اتاق:</span>
        <span class="text-3xl font-mono font-black text-[#f59e0b] tracking-[0.25em] select-all">
          {{ roomId }}
        </span>
      </div>

      <!-- وضعیت اتصال زنده -->
      <div class="flex items-center justify-between text-xs py-2 px-3 bg-[#0d0e11] border border-[rgba(237,232,223,0.08)] mb-5 rounded-sm">
        <span class="text-[#a8a39a]">تعداد کنترلرهای متصل:</span>
        <span class="font-bold flex items-center gap-1.5" :class="connectedPeersCount > 0 ? 'text-[#86efac]' : 'text-[#fca5a5]'">
          <span class="w-2 h-2 rounded-full" :class="connectedPeersCount > 0 ? 'bg-[#22c55e] animate-ping' : 'bg-[#ef4444]'"></span>
          {{ connectedPeersCount }} دستگاه
        </span>
      </div>

      <!-- دکمه‌های عملیاتی -->
      <div class="flex flex-col sm:flex-row gap-2">
        <button 
          @click="copyUrl"
          class="flex-1 py-2.5 px-4 bg-[#232430] hover:bg-[#2e3040] text-xs font-bold text-[#ede8df] rounded-sm transition-all border border-[rgba(237,232,223,0.12)] cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>{{ copied ? 'لینک کپی شد ✓' : 'کپی پیوند مستقیم' }}</span>
        </button>

        <button 
          @click="openControllerSimulator"
          class="flex-1 py-2.5 px-4 bg-[#b45309] hover:bg-[#d97706] text-xs font-bold text-white rounded-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>آزمایش در پنجره کنترلر</span>
          <span class="text-sm">↗</span>
        </button>
      </div>
    </div>
  </div>
</template>
