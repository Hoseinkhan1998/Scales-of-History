/**
 * پیش‌بارگذاری ترتیبی و بهینه فایل‌های صوتی پروژه (Preloader)
 * ترتیب دقیق دانلود مطابق اولویت تجربه کاربری:
 * ۱. موسیقی اول (music1.mp3) جهت پخش فوری و بی‌درنگ در لندینگ
 * ۲. صوت فصل اول (season1.mp3)
 * ۳. صوت فصل دوم (season2.mp3)
 * ۴. موسیقی دوم (music2.mp3)
 * ۵. صوت فصل‌های سوم تا دهم (season3.mp3 تا season10.mp3)
 */

export const AUDIO_DOWNLOAD_QUEUE = [
  { url: '/music/music1.mp3', label: 'موسیقی اول' },
  { url: '/music/speach/season1.mp3', label: 'صوت فصل اول' },
  { url: '/music/speach/season2.mp3', label: 'صوت فصل دوم' },
  { url: '/music/music2.mp3', label: 'موسیقی دوم' },
  { url: '/music/speach/season3.mp3', label: 'صوت فصل سوم' },
  { url: '/music/speach/season4.mp3', label: 'صوت فصل چهارم' },
  { url: '/music/speach/season5.mp3', label: 'صوت فصل پنجم' },
  { url: '/music/speach/season6.mp3', label: 'صوت فصل ششم' },
  { url: '/music/speach/season7.mp3', label: 'صوت فصل هفتم' },
  { url: '/music/speach/season8.mp3', label: 'صوت فصل هشتم' },
  { url: '/music/speach/season9.mp3', label: 'صوت فصل نهم' },
  { url: '/music/speach/season10.mp3', label: 'صوت فصل دهم' }
];

let isPreloadStarted = false;

export async function startSequentialAudioPreload() {
  if (typeof window === 'undefined' || isPreloadStarted) return;
  isPreloadStarted = true;

  const hasCacheStorage = 'caches' in window;
  let cache = null;

  if (hasCacheStorage) {
    try {
      cache = await caches.open('iran-history-audio-v2');
    } catch (err) {
      console.warn('Cache storage not accessible:', err);
    }
  }

  // دانلود ترتیبی و گام‌به‌گام (تا دانلود فایل قبلی ۱۰۰٪ تمام نشود، فایل بعدی آغاز نمی‌شود)
  for (const item of AUDIO_DOWNLOAD_QUEUE) {
    try {
      // اگر از قبل در کش ذخیره شده است، مستقیماً به گام بعدی برو
      if (cache) {
        const existing = await cache.match(item.url);
        if (existing) {
          continue;
        }
      }

      // دریافت کامل فایل صوتی از طریق fetch با اولویت پایین برای جلوگیری از کندی برنامه
      const response = await fetch(item.url);
      if (response.ok) {
        const blob = await response.blob();
        if (cache) {
          const cacheResponse = new Response(blob, {
            headers: {
              'Content-Type': 'audio/mpeg',
              'Content-Length': String(blob.size),
              'Cache-Control': 'public, max-age=31536000, immutable'
            }
          });
          await cache.put(item.url, cacheResponse);
        }
      }

      // وقفه ۲۰۰ میلی‌ثانیه‌ای بین دانلود فایل‌ها جهت حفظ پایداری کامل پهنای باند و روان ماندن انیمیشن‌ها
      await new Promise((resolve) => setTimeout(resolve, 200));
    } catch (e) {
      console.warn(`Preload notice for ${item.label}:`, e);
    }
  }
}
