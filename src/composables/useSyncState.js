import { ref } from 'vue';
import { Peer } from 'peerjs';
import mqtt from 'mqtt';

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
let mqttClient = null;
let currentClientId = '';

// تولید کد اتاق کاملاً عددی و ۵ رقمی (مثلاً 48291)
function generateShortRoomId() {
  return String(Math.floor(10000 + Math.random() * 90000));
}

export function useSyncState() {
  // ۱. راه‌اندازی موتور ابری اینترنتی MQTT بر بستر WSS (اتصال ایمن و پرسرعت در تمام شبکه‌های ایرانسل، همراه‌اول و وای‌فای)
  function initMqttChannel(targetRoomId) {
    if (typeof window === 'undefined') return;

    try {
      if (mqttClient) {
        try { mqttClient.end(true); } catch (e) {}
      }

      const topic = `scales_history_room_${targetRoomId}`;
      currentClientId = `scales_${isHost.value ? 'host' : 'ctrl'}_${targetRoomId}_${Math.random().toString(16).substring(2, 8)}`;

      // اولویت اول: سرور عمومی بسیار پرسرعت EMQX
      const primaryBroker = 'wss://broker.emqx.io:8084/mqtt';
      const fallbackBroker = 'wss://test.mosquitto.org:8081';

      let activeBrokerUrl = primaryBroker;

      const connectBroker = (brokerUrl) => {
        mqttClient = mqtt.connect(brokerUrl, {
          clientId: currentClientId,
          clean: true,
          connectTimeout: 5000,
          reconnectPeriod: 3000
        });

        mqttClient.on('connect', () => {
          console.log(`[MQTT] Connected via ${brokerUrl} for room:`, targetRoomId);
          mqttClient.subscribe(topic, { qos: 1 }, (err) => {
            if (!err) {
              isConnected.value = true;
              connectionError.value = '';
              // در حالت کنترلر، درخواست وضعیت کنونی را به مانیتور بفرست
              if (!isHost.value) {
                mqttClient.publish(topic, JSON.stringify({
                  type: 'REQUEST_STATE',
                  roomId: targetRoomId,
                  senderClientId: currentClientId
                }));
              }
            }
          });
        });

        mqttClient.on('message', (t, msg) => {
          try {
            const parsed = JSON.parse(msg.toString());
            // جلوگیری از پردازش مجدد پیام‌های ارسالی توسط خود این کلاینت
            if (parsed.senderClientId && parsed.senderClientId === currentClientId) return;

            handleIncomingMessage(parsed);
          } catch (e) {}
        });

        mqttClient.on('error', (err) => {
          console.warn(`[MQTT] Warning on ${brokerUrl}:`, err);
          if (brokerUrl === primaryBroker) {
            try { mqttClient.end(true); } catch (e) {}
            activeBrokerUrl = fallbackBroker;
            connectBroker(fallbackBroker);
          }
        });
      };

      connectBroker(activeBrokerUrl);
    } catch (err) {
      console.warn('MQTT setup error:', err);
    }
  }

  // ۲. مقداردهی اولیه کانال BroadcastChannel جهت تبادل اطلاعات در تب‌های هم‌نام در یک سیستم
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

  // پردازش پیام‌های دریافتی از PeerJS، MQTT یا BroadcastChannel
  function handleIncomingMessage(data) {
    if (!data || typeof data !== 'object') return;

    if (data.roomId && data.roomId !== roomId.value && !roomId.value.includes(data.roomId)) {
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
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent(isAudioPlaying.value ? 'host-play-audio' : 'host-pause-audio'));
        }
        broadcastState();
        break;

      case 'PLAY_AUDIO':
        isAudioPlaying.value = true;
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('host-play-audio'));
        }
        broadcastState();
        break;

      case 'PAUSE_AUDIO':
        isAudioPlaying.value = false;
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('host-pause-audio'));
        }
        broadcastState();
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
          window.dispatchEvent(new CustomEvent('host-play-audio'));
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
        if (isHost.value) {
          broadcastState();
        }
        break;
    }
  }

  // ارسال وضعیت جاری به کلیه کانال‌های ارتباطی (MQTT + WebRTC + BroadcastChannel)
  function broadcastState() {
    const statePayload = {
      type: 'SYNC_STATE',
      roomId: roomId.value,
      currentPage: currentPage.value,
      totalPages: totalPages.value,
      volume: volume.value,
      isPlaying: isAudioPlaying.value,
      hasEnteredExperience: hasEnteredExperience.value,
      senderClientId: currentClientId,
      timestamp: Date.now()
    };

    // ۱. ارسال از طریق کانال اینترنتی ابری MQTT
    if (mqttClient && mqttClient.connected) {
      try {
        const topic = `scales_history_room_${roomId.value}`;
        mqttClient.publish(topic, JSON.stringify(statePayload));
      } catch (err) {}
    }

    // ۲. ارسال به اتصالات فعال WebRTC PeerJS
    activeConnections.forEach(conn => {
      if (conn && conn.open) {
        try { conn.send(statePayload); } catch (err) {}
      }
    });

    // ۳. ارسال به BroadcastChannel
    if (broadcastChannel) {
      try { broadcastChannel.postMessage(statePayload); } catch (err) {}
    }

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
    initMqttChannel(finalRoomId);

    // راه‌اندازی موازی PeerJS با سرورهای قدرتمند STUN بین‌المللی
    const peerId = `hist-host-${finalRoomId}`;

    try {
      peer = new Peer(peerId, {
        debug: 1,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun2.l.google.com:19302' },
            { urls: 'stun:stun3.l.google.com:19302' },
            { urls: 'stun:stun.cloudflare.com:3478' },
            { urls: 'stun:global.stun.twilio.com:3478' }
          ]
        }
      });

      peer.on('open', (id) => {
        console.log('Host Peer opened with ID:', id);
        isConnected.value = true;
      });

      peer.on('connection', (conn) => {
        console.log('Mobile controller connected via WebRTC:', conn.peer);
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

  // راه‌اندازی حالت کنترلر (گوشی تلفن همراه با هر اپراتوری)
  function connectAsController(targetRoomId) {
    isHost.value = false;
    const cleanRoom = String(targetRoomId).trim();
    roomId.value = cleanRoom;
    connectionError.value = '';
    isConnected.value = false;

    initBroadcastChannel();
    initMqttChannel(cleanRoom);

    const hostPeerId = `hist-host-${cleanRoom}`;

    try {
      peer = new Peer(null, {
        debug: 1,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun2.l.google.com:19302' },
            { urls: 'stun:stun3.l.google.com:19302' },
            { urls: 'stun:stun.cloudflare.com:3478' },
            { urls: 'stun:global.stun.twilio.com:3478' }
          ]
        }
      });

      peer.on('open', () => {
        console.log('Controller Peer opened, connecting to host:', hostPeerId);
        controllerConn = peer.connect(hostPeerId, { reliable: true });

        controllerConn.on('open', () => {
          console.log('Connected to host successfully via WebRTC!');
          isConnected.value = true;
          connectionError.value = '';

          controllerConn.send({
            type: 'REQUEST_STATE',
            roomId: cleanRoom
          });
        });

        controllerConn.on('data', (data) => {
          handleIncomingMessage(data);
        });

        controllerConn.on('close', () => {});
        controllerConn.on('error', (err) => {
          console.warn('Controller WebRTC connection warning:', err);
        });
      });

      peer.on('error', (err) => {
        console.warn('Controller peer warning (falling back to MQTT):', err);
      });
    } catch (e) {
      console.warn('PeerJS init fallback:', e);
    }
  }

  // دستورات ارسالی از کنترلر به میزبان به صورت هم‌زمان در همه کانال‌ها
  function sendCommand(commandPayload) {
    const payload = {
      ...commandPayload,
      roomId: roomId.value,
      senderClientId: currentClientId,
      timestamp: Date.now()
    };

    // ۱. ارسال بیدرنگ اینترنتی از طریق MQTT بر بستر WSS
    if (mqttClient && mqttClient.connected) {
      try {
        const topic = `scales_history_room_${roomId.value}`;
        mqttClient.publish(topic, JSON.stringify(payload));
      } catch (e) {}
    }

    // ۲. ارسال از طریق کانال WebRTC PeerJS
    if (controllerConn && controllerConn.open) {
      try { controllerConn.send(payload); } catch (e) {}
    }

    // ۳. ارسال از طریق BroadcastChannel
    if (broadcastChannel) {
      try { broadcastChannel.postMessage(payload); } catch (e) {}
    }

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
    } else if (commandPayload.type === 'TOGGLE_AUDIO' || commandPayload.type === 'PLAY_AUDIO') {
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
      sendCommand({ type: isAudioPlaying.value ? 'PAUSE_AUDIO' : 'PLAY_AUDIO' });
    }
  };

  const playAudioForce = () => {
    isAudioPlaying.value = true;
    if (isHost.value) {
      broadcastState();
    } else {
      sendCommand({ type: 'PLAY_AUDIO' });
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
    playAudioForce,
    broadcastState
  };
}
