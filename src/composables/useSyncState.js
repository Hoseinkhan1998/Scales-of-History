import { ref } from 'vue';
import { Peer } from 'peerjs';

// وضعیت مشترک سراسری (Singleton)
const currentPage = ref(1);
const totalPages = ref(11);
const volume = ref(75); // ۰ تا ۱۰۰
const isAudioPlaying = ref(false);
const isHost = ref(true);
const isConnected = ref(false);
const roomId = ref('');
const connectionError = ref('');
const connectedPeersCount = ref(0);
const hasEnteredExperience = ref(false);

let peer = null;
let activeConnections = [];
let controllerConn = null;
let broadcastChannel = null;

// تولید کد اتاق کاملاً عددی و ۵ رقمی (مثلاً 48291)
function generateShortRoomId() {
  return String(Math.floor(10000 + Math.random() * 90000));
}

export function useSyncState() {
  // مقداردهی اولیه کانال BroadcastChannel جهت تبادل اطلاعات در تب‌ها و محیط محلی
  function initBroadcastChannel() {
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        broadcastChannel = new BroadcastChannel('iran_history_sync_channel');
        broadcastChannel.onmessage = (event) => {
          handleIncomingMessage(event.data);
        };
      }
    } catch (e) {
      console.warn('BroadcastChannel not supported:', e);
    }
  }

  // اسکرول نرم در صفحه مانیتور اصلی
  function performScroll(delta) {
    if (typeof window === 'undefined') return;
    window.scrollBy({ top: delta, behavior: 'smooth' });
    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.scrollBy({ top: delta, behavior: 'smooth' });
    }
  }

  // پردازش پیام‌های دریافتی از PeerJS یا BroadcastChannel
  function handleIncomingMessage(data) {
    if (!data || typeof data !== 'object') return;

    if (data.roomId && data.roomId !== roomId.value && !roomId.value.includes(data.roomId)) {
      // پیام مربوط به اتاقی دیگر است
      return;
    }

    switch (data.type) {
      case 'NEXT_PAGE':
        if (currentPage.value < totalPages.value) {
          currentPage.value++;
          broadcastState();
        }
        break;

      case 'PREV_PAGE':
        if (currentPage.value > 1) {
          currentPage.value--;
          broadcastState();
        }
        break;

      case 'GOTO_PAGE':
        if (typeof data.page === 'number' && data.page >= 1 && data.page <= totalPages.value) {
          currentPage.value = data.page;
          broadcastState();
        }
        break;

      case 'SET_VOLUME':
        if (typeof data.volume === 'number') {
          volume.value = Math.max(0, Math.min(100, data.volume));
          broadcastState();
        }
        break;

      case 'TOGGLE_AUDIO':
        isAudioPlaying.value = !isAudioPlaying.value;
        broadcastState();
        break;

      case 'SET_AUDIO_STATE':
        if (typeof data.isPlaying === 'boolean') {
          isAudioPlaying.value = data.isPlaying;
          broadcastState();
        }
        break;

      case 'SCROLL_DOWN':
        performScroll(380);
        break;

      case 'SCROLL_UP':
        performScroll(-380);
        break;

      case 'ENTER_PUBLICATION':
        hasEnteredExperience.value = true;
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('host-enter-publication'));
        }
        broadcastState();
        break;

      case 'SYNC_STATE':
        // دریافت وضعیت از میزبان (مخصوص کنترلر)
        if (typeof data.currentPage === 'number') currentPage.value = data.currentPage;
        if (typeof data.volume === 'number') volume.value = data.volume;
        if (typeof data.isPlaying === 'boolean') isAudioPlaying.value = data.isPlaying;
        if (typeof data.hasEnteredExperience === 'boolean') hasEnteredExperience.value = data.hasEnteredExperience;
        isConnected.value = true;
        break;

      case 'REQUEST_STATE':
        // درخواست کنترلر برای دریافت آخرین وضعیت
        if (isHost.value) {
          broadcastState();
        }
        break;
    }
  }

  // ارسال وضعیت جاری به کلیه اتصالات PeerJS و کانال محلی
  function broadcastState() {
    const statePayload = {
      type: 'SYNC_STATE',
      roomId: roomId.value,
      currentPage: currentPage.value,
      totalPages: totalPages.value,
      volume: volume.value,
      isPlaying: isAudioPlaying.value,
      hasEnteredExperience: hasEnteredExperience.value,
      timestamp: Date.now()
    };

    // ارسال به اتصالات فعال WebRTC
    activeConnections.forEach(conn => {
      if (conn && conn.open) {
        try { conn.send(statePayload); } catch (err) {}
      }
    });

    // ارسال به BroadcastChannel
    if (broadcastChannel) {
      try { broadcastChannel.postMessage(statePayload); } catch (err) {}
    }

    // ارسال به localStorage برای شنودگران احتمالی
    try {
      localStorage.setItem('iran_history_sync_state', JSON.stringify(statePayload));
    } catch (e) {}
  }

  // راه‌اندازی میزبان (صفحه نمایش اصلی / دسکتاپ / تلویزیون)
  function startHost(customRoomId) {
    isHost.value = true;
    const finalRoomId = customRoomId || generateShortRoomId();
    roomId.value = finalRoomId;
    connectionError.value = '';

    initBroadcastChannel();

    // ایجاد اتصال PeerJS با شناسه عددی
    const peerId = `hist-host-${finalRoomId}`;

    try {
      peer = new Peer(peerId, {
        debug: 1,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:global.stun.twilio.com:3478' }
          ]
        }
      });

      peer.on('open', (id) => {
        console.log('Host Peer opened with ID:', id);
        isConnected.value = true;
      });

      peer.on('connection', (conn) => {
        console.log('Mobile controller connected:', conn.peer);
        activeConnections.push(conn);
        connectedPeersCount.value = activeConnections.length;

        conn.on('open', () => {
          conn.send({
            type: 'SYNC_STATE',
            roomId: roomId.value,
            currentPage: currentPage.value,
            totalPages: totalPages.value,
            volume: volume.value,
            isPlaying: isAudioPlaying.value,
            hasEnteredExperience: hasEnteredExperience.value
          });
        });

        conn.on('data', (data) => {
          handleIncomingMessage(data);
        });

        conn.on('close', () => {
          activeConnections = activeConnections.filter(c => c !== conn);
          connectedPeersCount.value = activeConnections.length;
        });

        conn.on('error', () => {
          activeConnections = activeConnections.filter(c => c !== conn);
          connectedPeersCount.value = activeConnections.length;
        });
      });

      peer.on('error', (err) => {
        console.warn('Host Peer error:', err);
        if (err.type === 'unavailable-id') {
          startHost(generateShortRoomId());
        }
      });
    } catch (e) {
      console.warn('Failed to start PeerJS host:', e);
    }
  }

  // راه‌اندازی حالت کنترلر (گوشی تلفن همراه)
  function connectAsController(targetRoomId) {
    isHost.value = false;
    const cleanRoom = String(targetRoomId).trim();
    roomId.value = cleanRoom;
    connectionError.value = '';
    isConnected.value = false;

    initBroadcastChannel();

    const hostPeerId = `hist-host-${cleanRoom}`;

    try {
      peer = new Peer(null, {
        debug: 1,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:global.stun.twilio.com:3478' }
          ]
        }
      });

      peer.on('open', () => {
        console.log('Controller Peer opened, connecting to host:', hostPeerId);
        controllerConn = peer.connect(hostPeerId, { reliable: true });

        controllerConn.on('open', () => {
          console.log('Connected to host successfully!');
          isConnected.value = true;
          connectionError.value = '';

          // درخواست آخرین وضعیت از میزبان
          controllerConn.send({
            type: 'REQUEST_STATE',
            roomId: cleanRoom
          });
        });

        controllerConn.on('data', (data) => {
          handleIncomingMessage(data);
        });

        controllerConn.on('close', () => {
          isConnected.value = false;
        });

        controllerConn.on('error', (err) => {
          console.warn('Controller connection error:', err);
          connectionError.value = 'خطا در برقراری ارتباط با نمایشگر';
        });
      });

      peer.on('error', (err) => {
        console.warn('Controller peer error:', err);
        connectionError.value = 'دستگاهی با این کد ۵ رقمی یافت نشد یا در دسترس نیست';
      });
    } catch (e) {
      console.warn('Failed to initialize controller peer:', e);
      connectionError.value = 'امکان اتصال مستقیم فراهم نشد';
    }
  }

  // دستورات ارسالی از کنترلر به میزبان
  function sendCommand(commandPayload) {
    const payload = {
      ...commandPayload,
      roomId: roomId.value,
      timestamp: Date.now()
    };

    // ۱. ارسال از طریق کانال PeerJS اگر متصل است
    if (controllerConn && controllerConn.open) {
      try { controllerConn.send(payload); } catch (e) {}
    }

    // ۲. ارسال از طریق BroadcastChannel برای تب‌های موازی
    if (broadcastChannel) {
      try { broadcastChannel.postMessage(payload); } catch (e) {}
    }

    // ۳. ارسال از طریق ذخیره‌ساز محلی (Fallback)
    try {
      localStorage.setItem('iran_history_sync_command', JSON.stringify(payload));
    } catch (e) {}

    // اعمال موقت روی کنترلر جهت پاسخگویی آنی
    if (commandPayload.type === 'NEXT_PAGE' && currentPage.value < totalPages.value) {
      currentPage.value++;
    } else if (commandPayload.type === 'PREV_PAGE' && currentPage.value > 1) {
      currentPage.value--;
    } else if (commandPayload.type === 'GOTO_PAGE') {
      currentPage.value = commandPayload.page;
    } else if (commandPayload.type === 'SET_VOLUME') {
      volume.value = commandPayload.volume;
    } else if (commandPayload.type === 'TOGGLE_AUDIO') {
      isAudioPlaying.value = !isAudioPlaying.value;
    } else if (commandPayload.type === 'ENTER_PUBLICATION') {
      hasEnteredExperience.value = true;
    }
  }

  // توابع کمکی برای ناوبری، اسکرول و کنترل صدا
  const nextPage = () => {
    if (isHost.value) {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
        broadcastState();
      }
    } else {
      sendCommand({ type: 'NEXT_PAGE' });
    }
  };

  const prevPage = () => {
    if (isHost.value) {
      if (currentPage.value > 1) {
        currentPage.value--;
        broadcastState();
      }
    } else {
      sendCommand({ type: 'PREV_PAGE' });
    }
  };

  const scrollDown = () => {
    if (isHost.value) {
      performScroll(380);
    } else {
      sendCommand({ type: 'SCROLL_DOWN' });
    }
  };

  const scrollUp = () => {
    if (isHost.value) {
      performScroll(-380);
    } else {
      sendCommand({ type: 'SCROLL_UP' });
    }
  };

  const enterPublication = () => {
    hasEnteredExperience.value = true;
    if (isHost.value) {
      broadcastState();
    } else {
      sendCommand({ type: 'ENTER_PUBLICATION' });
    }
  };

  const gotoPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages.value) {
      if (isHost.value) {
        currentPage.value = pageNum;
        broadcastState();
      } else {
        sendCommand({ type: 'GOTO_PAGE', page: pageNum });
      }
    }
  };

  const setVolume = (val) => {
    const clamped = Math.max(0, Math.min(100, Math.round(val)));
    if (isHost.value) {
      volume.value = clamped;
      broadcastState();
    } else {
      sendCommand({ type: 'SET_VOLUME', volume: clamped });
    }
  };

  const toggleAudio = () => {
    if (isHost.value) {
      isAudioPlaying.value = !isAudioPlaying.value;
      broadcastState();
    } else {
      sendCommand({ type: 'TOGGLE_AUDIO' });
    }
  };

  return {
    currentPage,
    totalPages,
    volume,
    isAudioPlaying,
    isHost,
    isConnected,
    roomId,
    connectionError,
    connectedPeersCount,
    hasEnteredExperience,
    startHost,
    connectAsController,
    nextPage,
    prevPage,
    scrollDown,
    scrollUp,
    enterPublication,
    gotoPage,
    setVolume,
    toggleAudio,
    broadcastState
  };
}
