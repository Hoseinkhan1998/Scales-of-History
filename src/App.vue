<script setup>
import { ref, computed, onMounted } from 'vue';
import { useSyncState } from './composables/useSyncState';
import { useAudioPlayer } from './composables/useAudioPlayer';
import { useKeyboardNav } from './composables/useKeyboardNav';

import IntroScreen from './components/IntroScreen.vue';
import HeaderBar from './components/HeaderBar.vue';
import PageNavigation from './components/PageNavigation.vue';
import RemotePairingModal from './components/RemotePairingModal.vue';
import MobileController from './components/MobileController.vue';

// مؤلفه‌های ۱۱ گانه فصول نشریه
import Page1Methodology from './components/EditorialPages/Page1Methodology.vue';
import Page2MacroEconomy from './components/EditorialPages/Page2MacroEconomy.vue';
import Page3ClassPoverty from './components/EditorialPages/Page3ClassPoverty.vue';
import Page4HealthDemographics from './components/EditorialPages/Page4HealthDemographics.vue';
import Page5EducationGender from './components/EditorialPages/Page5EducationGender.vue';
import Page6WaterEcology from './components/EditorialPages/Page6WaterEcology.vue';
import Page7BrainDrainCapital from './components/EditorialPages/Page7BrainDrainCapital.vue';
import Page8PowerHumanRights from './components/EditorialPages/Page8PowerHumanRights.vue';
import Page9Counterfactual from './components/EditorialPages/Page9Counterfactual.vue';
import Page10VerdictSynthesis from './components/EditorialPages/Page10VerdictSynthesis.vue';
import Page11Bibliography from './components/EditorialPages/Page11Bibliography.vue';

const isMobileControllerRole = ref(false);
const hasEnteredExperience = ref(false);
const isPairingModalOpen = ref(false);

const { currentPage, totalPages, startHost, isHost } = useSyncState();
const { startExperienceAudio } = useAudioPlayer();

// فعال‌سازی کلیدهای میانبر صفحه‌کلید در حالت دسکتاپ
useKeyboardNav();

// نگاشت صفحات به مؤلفه‌ها
const pageComponents = {
  1: Page1Methodology,
  2: Page2MacroEconomy,
  3: Page3ClassPoverty,
  4: Page4HealthDemographics,
  5: Page5EducationGender,
  6: Page6WaterEcology,
  7: Page7BrainDrainCapital,
  8: Page8PowerHumanRights,
  9: Page9Counterfactual,
  10: Page10VerdictSynthesis,
  11: Page11Bibliography,
};

const currentPageComponent = computed(() => {
  return pageComponents[currentPage.value] || Page1Methodology;
});

function handleStartExperience() {
  hasEnteredExperience.value = true;
  startExperienceAudio();
}

function handleSkipIntro() {
  hasEnteredExperience.value = true;
  startExperienceAudio();
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get('role');
    const isSmallScreen = window.innerWidth < 768;

    // اگر کاربر در موبایل باشد یا پارامتر role=controller باشد، حالت کنترلر فعال می‌شود
    if (roleParam === 'controller' || (isSmallScreen && roleParam !== 'desktop')) {
      isMobileControllerRole.value = true;
    } else {
      // در غیر این صورت، این دستگاه نمایشگر اصلی (Host) است
      startHost();
    }
  }
});
</script>

<template>
  <!-- ۱. حالت کنترل از راه دور روی تلفن همراه -->
  <div v-if="isMobileControllerRole">
    <MobileController />
  </div>

  <!-- ۲. حالت نشریه دیجیتال روی نمایشگر اصلی (دسکتاپ / تلویزیون / سالن نمایش) -->
  <div v-else class="min-h-screen bg-[#0d0e11] text-[#ede8df] flex flex-col justify-between selection:bg-[#991b1b] selection:text-white paper-grain">
    <!-- پرده آغازین سینمایی ۱۵ ثانیه‌ای -->
    <IntroScreen 
      v-if="!hasEnteredExperience"
      @start-experience="handleStartExperience"
    />

    <!-- بدنه اصلی نشریه پس از ورود -->
    <template v-else>
      <!-- سربرگ نشریه و کنترل‌های هوشمند -->
      <HeaderBar @open-pairing-modal="isPairingModalOpen = true" />

      <!-- محتوای فصل جاری با جلوه انیمیشنی ملایم تغییر صفحه -->
      <main class="flex-1 w-full overflow-y-auto py-4">
        <Transition name="page-fade" mode="out-in">
          <component :is="currentPageComponent" :key="currentPage" />
        </Transition>
      </main>

      <!-- نوار ناوبری مطبوعاتی پایین صفحه -->
      <PageNavigation />

      <!-- مدال اتصال و کد QR جهت اتصال گوشی -->
      <RemotePairingModal 
        :is-open="isPairingModalOpen" 
        @close="isPairingModalOpen = false" 
      />
    </template>
  </div>
</template>

<style scoped>
/* ترنزیشن ملایم میان صفحات نشریه */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
