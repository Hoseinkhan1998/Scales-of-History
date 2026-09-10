import { onMounted, onUnmounted } from 'vue';
import { useSyncState } from './useSyncState';

export function useKeyboardNav() {
  const { nextPage, prevPage, isHost } = useSyncState();

  function handleKeyDown(event) {
    // عدم تداخل با فیلدهای ورودی فرم یا مدال
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target?.tagName)) {
      return;
    }

    if (!isHost.value) return;

    // در چیدمان راست‌به‌چپ (RTL):
    // کلید چپ (ArrowLeft) به معنی صفحه بعد است (ورق زدن به سمت جلو در کتاب فارسی)
    // کلید راست (ArrowRight) به معنی صفحه قبل است (برگشت به راست)
    switch (event.key) {
      case 'ArrowLeft':
      case 'PageDown':
      case ' ': // Space
        event.preventDefault();
        nextPage();
        break;

      case 'ArrowRight':
      case 'PageUp':
        event.preventDefault();
        prevPage();
        break;
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
  });
}
