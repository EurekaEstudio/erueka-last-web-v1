import React, { useEffect, useRef } from 'react';

const ChatWidget = () => {
  const isInitialized = useRef(false);

  useEffect(() => {
    // Only initialize once to prevent duplicate listeners or UI elements in React strict mode
    if (isInitialized.current) return;
    isInitialized.current = true;

    const chatConfig = {
      botName: "Dante IA",
      statusText: "En línea",
      welcomeMessage: "Hola, soy Dante ¿Cómo te ayudo?",
      initialBubbleMessage: "Aclara tus dudas conmigo",
      avatarUrl: "https://eurekaestudiocreativo.com/wp-content/uploads/2025/06/Burbuja-Dante.gif",
      headerAvatarUrl: "https://eurekaestudiocreativo.com/wp-content/uploads/2025/06/Dante-foto.png",
      primaryColor: "#00C8D7",
      accentColor: "#1DD1E0",
      quickResponses: [],
      webhookUrl: "https://flow.eurekaestudiocreativo.com/webhook/4e7adeb2-4949-44de-8eb8-c4e59abb6f85/chat",
      timeout: 60000,
      enableDebug: true,
      silentMode500: true,
      silentModeAll: true,
      retryOn500: true,
      maxRetries: 2,
      retryDelay: 1000
    };

    let timeoutId;
    let defaultQRStillAllowed = true;
    let conversationStarted = false;
    let currentRetryCount = 0;
    let isWaitingForResponse = false;

    const debug = (m, d) => chatConfig.enableDebug && console.log('[ChatWidget]', m, d || '');

    function openChat() {
      const el = document.getElementById('chat-widget-container');
      if (el) el.classList.add('is-open');

      const bubble = document.getElementById('initial-message-bubble');
      if (bubble) bubble.classList.remove('show');

      const qrContainer = document.getElementById('quick-responses');
      if (qrContainer) {
        if (chatConfig.quickResponses.length && !conversationStarted) {
          qrContainer.style.display = 'flex';
        } else {
          qrContainer.style.display = 'none';
        }
      }
    }

    function closeChat() {
      const el = document.getElementById('chat-widget-container');
      if (el) el.classList.remove('is-open');
      isWaitingForResponse = false;
      enableChat();
    }

    function toggleChat() {
      const container = document.getElementById('chat-widget-container');
      if (!container) return;
      if (container.classList.contains('is-open')) closeChat();
      else openChat();
    }

    function setupQuickResponses() {
      const container = document.getElementById('quick-responses');
      if (!container) return;
      container.innerHTML = '';
      chatConfig.quickResponses.forEach(r => {
        const btn = document.createElement('button');
        btn.className = 'quick-response-btn';
        btn.textContent = r.text;
        btn.onclick = () => {
          if (isWaitingForResponse) return;
          addMessage(r.text, 'user');
          hideQR();
          conversationStarted = true;
          disableChat();
          sendToWebhook(r.value, true);
        };
        container.appendChild(btn);
      });
      container.style.display = chatConfig.quickResponses.length ? 'flex' : 'none';
    }

    const hideQR = () => {
      const el = document.getElementById('quick-responses');
      if (el) el.style.display = 'none';
    };

    const showQR = (force = false) => {
      const container = document.getElementById('quick-responses');
      if (container && chatConfig.quickResponses.length && (force || (defaultQRStillAllowed && !conversationStarted))) {
        container.style.display = 'flex';
      }
    };

    function disableChat() {
      isWaitingForResponse = true;
      const input = document.getElementById('chat-input');
      const btn = document.getElementById('chat-send-btn');
      if (input) { input.disabled = true; input.placeholder = "Esperando respuesta..."; input.style.opacity = "0.6"; }
      if (btn) { btn.disabled = true; btn.style.opacity = "0.6"; }
      const widget = document.getElementById('gaby-chat-widget');
      if (widget) widget.style.opacity = "1";
      document.querySelectorAll('.quick-response-btn').forEach(b => {
        b.disabled = true; b.style.opacity = "0.6";
      });
    }

    function enableChat() {
      isWaitingForResponse = false;
      const input = document.getElementById('chat-input');
      const btn = document.getElementById('chat-send-btn');
      if (input) { input.disabled = false; input.placeholder = "Escribe tu mensaje..."; input.style.opacity = "1"; }
      if (btn) { btn.disabled = false; btn.style.opacity = "1"; }
      document.querySelectorAll('.quick-response-btn').forEach(b => {
        b.disabled = false; b.style.opacity = "1";
      });
    }

    function addMessage(text, sender, animate = false) {
      if (text === null || text === undefined) return;
      text = String(text);

      const container = document.getElementById('chat-messages');
      if (!container) return;
      const div = document.createElement('div');
      div.className = 'message ' + sender;

      let safe = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      safe = safe.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
      const urlRegex = /(https?:\/\/[^\s<]+?)(?=[.,;:]?(\s|$|<))/g;
      safe = safe.replace(urlRegex, function (url) {
        return '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + url + '</a>';
      });
      safe = safe.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

      div.innerHTML = safe;
      container.appendChild(div);
      setTimeout(() => container.scrollTop = container.scrollHeight, 10);
      return div; // Return element to allow adding specific classes later
    }

    function sendMsg() {
      const input = document.getElementById('chat-input');
      if (!input) return;
      const txt = input.value.trim();
      if (!txt || isWaitingForResponse) return;
      addMessage(txt, 'user');
      input.value = '';
      hideQR();
      defaultQRStillAllowed = false;
      conversationStarted = true;
      currentRetryCount = 0;
      disableChat();
      sendToWebhook(txt, false);
    }

    function isError500(error, response) {
      if (error && error.message) {
        const errorMsg = error.message.toLowerCase();
        if (errorMsg.includes('http 500') || errorMsg.includes('500') || errorMsg.includes('internal server error')) return true;
      }
      if (response && response.status === 500) return true;
      if (error && error.name === 'TypeError' && error.message.includes('fetch')) return true;
      return false;
    }

    function sendToWebhook(message, isQR, isRetry = false) {
      if (!isRetry) {
        removeTyping();
        showTyping();
      }

      const payload = {
        message, chatInput: message, text: message, isQuickResponse: isQR,
        timestamp: new Date().toISOString(), source: 'chat-widget', sessionId: getSID()
      };

      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (chatConfig.silentModeAll) {
          debug('Timeout silenciado'); removeTyping(); enableChat(); if (!isQR) showQR(); return;
        }
        enableChat(); handleErr(new Error('Timeout'));
      }, chatConfig.timeout);

      fetch(chatConfig.webhookUrl, {
        method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(r => {
          clearTimeout(timeoutId);
          if (r.status === 500) {
            if (chatConfig.silentMode500) {
              removeTyping();
              if (chatConfig.retryOn500 && currentRetryCount < chatConfig.maxRetries) {
                currentRetryCount++;
                setTimeout(() => sendToWebhook(message, isQR, true), chatConfig.retryDelay);
                return;
              }
              enableChat(); if (!isQR) showQR(); return;
            }
          }
          if (!r.ok) {
            if (chatConfig.silentModeAll) { removeTyping(); enableChat(); if (!isQR) showQR(); return; }
            throw new Error('HTTP ' + r.status);
          }
          return r.text();
        })
        .then(raw => {
          if (!raw) { enableChat(); return; }
          removeTyping();
          currentRetryCount = 0;
          if (raw.trim() === '' || raw.trim() === '{}') { enableChat(); if (!isQR) showQR(); return; }

          let data;
          try { data = JSON.parse(raw); }
          catch { if (!chatConfig.silentModeAll) addMessage(raw, 'bot', true); enableChat(); if (!isQR) showQR(); return; }

          procBot(data, isQR);
          enableChat();
        })
        .catch(e => {
          clearTimeout(timeoutId);
          if (chatConfig.silentModeAll) { removeTyping(); enableChat(); if (!isQR) showQR(); return; }
          if (isError500(e) && chatConfig.silentMode500) {
            removeTyping();
            if (chatConfig.retryOn500 && currentRetryCount < chatConfig.maxRetries) {
              currentRetryCount++;
              setTimeout(() => sendToWebhook(message, isQR, true), chatConfig.retryDelay);
              return;
            }
            enableChat(); if (!isQR) showQR(); return;
          }
          handleErr(e);
          if (!isQR) showQR();
        });
    }

    function procBot(data, isQR) {
      let txt = null, newQR = null;
      if (typeof data === 'object' && data) {
        txt = data.response || data.message || data.text || data.content || data.output || data.reply;
        if (!txt && data.data) txt = data.data.response || data.data.message || data.data.text || data.data.content || data.data.output;
        newQR = data.quick_replies || data.quickResponses || data.buttons;
        if (newQR && !Array.isArray(newQR)) newQR = null;
        if (newQR) newQR = newQR.map(q => ({ text: q.title || q.text || q.payload, value: q.payload || q.value || q.text }));
      } else if (typeof data === 'string') txt = data;
      if (txt) addMessage(txt, 'bot', true);
      if (newQR && newQR.length) {
        chatConfig.quickResponses = newQR;
        setupQuickResponses();
        defaultQRStillAllowed = false;
        showQR(true);
      }
    }

    function showTyping() {
      const container = document.getElementById('chat-messages');
      if (!container || document.getElementById('typing-indicator')) return;
      const div = document.createElement('div');
      div.id = 'typing-indicator';
      div.className = 'message bot typing';
      div.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
      container.appendChild(div);
      container.scrollTop = container.scrollHeight;
    }

    const removeTyping = () => { const t = document.getElementById('typing-indicator'); if (t) t.remove(); };

    function handleErr(e) {
      removeTyping();
      enableChat();
      setTimeout(() => addMessage('Lo siento, ocurrió un problema de conexión.', 'bot', true), 300);
    }

    function getSID() {
      const key = 'dante-chat-session-id';
      try {
        let id = localStorage.getItem(key);
        if (!id) {
          id = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
          localStorage.setItem(key, id);
        }
        return id;
      } catch { return 'session-' + Date.now() + '-' + Math.random().toString(16).slice(2); }
    }

    // --- BIND EVENTS ---
    const toggleBtn = document.getElementById('chat-toggle-btn');
    if (toggleBtn) toggleBtn.onclick = toggleChat;

    const closeBtn = document.getElementById('chat-close-btn');
    if (closeBtn) closeBtn.onclick = closeChat;

    const bubbleCloseBtn = document.querySelector('.bubble-close');
    if (bubbleCloseBtn) bubbleCloseBtn.onclick = (e) => {
      e.stopPropagation();
      const bubble = document.getElementById('initial-message-bubble');
      if (bubble) bubble.classList.remove('show');
    };

    const sendBtn = document.getElementById('chat-send-btn');
    if (sendBtn) sendBtn.onclick = sendMsg;

    const inputField = document.getElementById('chat-input');
    if (inputField) {
      inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMsg();
        }
      });
    }

    // 1. AGREGAR MENSAJE DE BIENVENIDA E IDENTIFICARLO
    if (chatConfig.welcomeMessage) {
      const msgEl = addMessage(chatConfig.welcomeMessage, 'bot', true);
      if (msgEl) {
        setTimeout(() => {
          msgEl.classList.add('welcome-msg-item');
        }, 50);
      }
    }

    setupQuickResponses();

    setTimeout(() => {
      const container = document.getElementById('chat-widget-container');
      if (container && !container.classList.contains('is-open')) {
        const bubble = document.getElementById('initial-message-bubble');
        if (bubble) bubble.classList.add('show');
      }
    }, 1500);

    // 2. LÓGICA EXTERNA QUE ELIMINA LA BIENVENIDA
    window.sendToWebhook = function (message, isQR) {
      if (isWaitingForResponse) return;

      const container = document.getElementById('chat-widget-container');
      if (container && !container.classList.contains('is-open')) {
        openChat();
      }

      // BORRAR BIENVENIDA SI EXISTE
      const welcomeMsg = document.querySelector('.welcome-msg-item');
      if (welcomeMsg) {
        welcomeMsg.remove();
      }

      hideQR();
      conversationStarted = true;
      disableChat();
      sendToWebhook(message, isQR);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="gaby-chat-widget">
      <div id="chat-widget-container">

        <div id="initial-message-bubble">
          <span className="bubble-icon">👋</span>
          <span className="bubble-text">Aclara tus dudas conmigo</span>
          <div className="bubble-close">×</div>
        </div>

        <div id="chat-toggle-btn">
          <div className="icon-closed">
            <img src="https://eurekaestudiocreativo.com/wp-content/uploads/2026/01/agente-transformado-a-gfi.gif" alt="Chat" id="chat-avatar" />
            <div className="notification-dot"></div>
          </div>
          <div className="icon-open">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </div>
        </div>

        <div id="chat-window">
          <div id="chat-header">
            <div id="chat-header-avatar">
              <img src="https://eurekaestudiocreativo.com/wp-content/uploads/2025/06/Dante-foto.png" alt="Dante" />
              <div className="online-indicator"></div>
            </div>
            <div id="chat-header-text">
              <h3>Dante IA</h3>
              <p>En línea</p>
            </div>
            <button id="chat-close-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
          </div>

          <div id="chat-messages"></div>

          <div id="quick-responses"></div>

          <div id="chat-input-wrapper">
            <div id="chat-input-area">
              <textarea id="chat-input" placeholder="Escribe tu mensaje..."></textarea>
              <button id="chat-send-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
            <div className="powered-by">Powered by Eureka</div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        /* --- VARIABLES EUREKA --- */
        #gaby-chat-widget {
          --primary-color: #00C8D7;
          --primary-gradient: linear-gradient(135deg, #00C8D7 0%, #009aa6 100%);
          --accent-color: #1DD1E0;
          
          --bg-color: #ffffff;
          --chat-bg: #f8f9fa;
          --user-msg-bg: #00C8D7; 
          --bot-msg-bg: #ffffff;
          
          --text-dark: #111827; 
          --text-body: #374151;
          --chat-width: 360px;
          --chat-height: 550px;
          --launcher-size: 60px;
          --radius-window: 12px;
          --radius-bubble: 12px;
          
          --shadow-launcher: 0 4px 14px rgba(0, 200, 215, 0.4);
          --shadow-window: 0 8px 30px rgba(0,0,0,0.12);
          
          font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          z-index: 2147483647;
        }

        #gaby-chat-widget * { box-sizing: border-box; outline: none; -webkit-tap-highlight-color: transparent; }

        /* --- CONTENEDOR --- */
        #gaby-chat-widget #chat-widget-container {
          position: fixed !important; bottom: 20px !important; right: 20px !important;
          display: flex; flex-direction: column; align-items: flex-end; z-index: 2147483647;
          pointer-events: none;
        }
        #gaby-chat-widget #chat-widget-container > * { pointer-events: auto; }

        /* --- BURBUJA INICIAL --- */
        #gaby-chat-widget #initial-message-bubble {
          position: absolute !important;
          bottom: 75px !important; 
          right: 0 !important;
          background: white !important;
          padding: 8px 34px 8px 14px !important; 
          border-radius: 24px !important;
          box-shadow: 0 3px 12px rgba(0,0,0,0.1) !important;
          color: var(--text-body) !important;
          
          white-space: nowrap !important; 
          width: auto !important; 
          max-width: none !important;
          
          display: flex !important; align-items: center !important;
          opacity: 0; transform: translateY(10px) scale(0.95);
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          border: 1px solid rgba(0,0,0,0.05); text-align: left;
        }
        #gaby-chat-widget #initial-message-bubble.show { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }

        #gaby-chat-widget #initial-message-bubble::after {
          content: ''; position: absolute; bottom: -5px; right: 24px; width: 10px; height: 10px;
          background: white; transform: rotate(45deg); border-bottom: 1px solid rgba(0,0,0,0.05); border-right: 1px solid rgba(0,0,0,0.05);
        }

        #gaby-chat-widget .bubble-text { 
          display: inline-block; vertical-align: middle; margin-top: 1px;
          font-size: 13px !important; font-weight: 600 !important; color: var(--text-body);
        }
        #gaby-chat-widget .bubble-icon { font-size: 14px; margin-right: 5px; vertical-align: middle; display: inline-block; }

        #gaby-chat-widget .bubble-close { 
            position: absolute !important; top: 50% !important; transform: translateY(-50%) !important;
            right: 8px !important; font-size: 17px !important; color: #bbb !important; 
            cursor: pointer !important; line-height: 1 !important; padding: 2px !important;
            display: flex !important; align-items: center; justify-content: center;
        }

        /* --- BOTÓN FLOTANTE --- */
        #gaby-chat-widget #chat-toggle-btn {
          width: var(--launcher-size); height: var(--launcher-size); border-radius: 50%;
          background: var(--primary-color); cursor: pointer; box-shadow: var(--shadow-launcher);
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); position: relative;
          display: flex; justify-content: center; align-items: center; color: white;
        }
        #gaby-chat-widget #chat-toggle-btn:hover { transform: scale(1.05); }
        #gaby-chat-widget #chat-toggle-btn img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 2px solid white; transition: opacity 0.3s; }
        #gaby-chat-widget .notification-dot {
          position: absolute; top: 2px; right: 2px; width: 14px; height: 14px; background: #EF4444;
          border: 2px solid white; border-radius: 50%; animation: pulse 2s infinite;
        }
        @keyframes pulse { 0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); } 70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); } 100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }

        #gaby-chat-widget .icon-open { display: none; opacity: 0; position: absolute; width: 100%; height: 100%; align-items: center; justify-content: center; }
        #gaby-chat-widget .icon-open svg { display: block; }
        #gaby-chat-widget .icon-closed { display: block; opacity: 1; width: 100%; height: 100%; }
        #gaby-chat-widget #chat-widget-container.is-open #chat-toggle-btn .icon-closed { display: none; }
        #gaby-chat-widget #chat-widget-container.is-open #chat-toggle-btn .icon-open { display: flex; opacity: 1; }
        #gaby-chat-widget #chat-widget-container.is-open #chat-toggle-btn { transform: rotate(90deg); }

        /* --- VENTANA CHAT --- */
        #gaby-chat-widget #chat-window {
          display: flex; flex-direction: column; position: absolute; bottom: 80px; right: 0;
          width: var(--chat-width); height: var(--chat-height); max-height: 80vh; background: var(--chat-bg);
          border-radius: var(--radius-window); box-shadow: var(--shadow-window);
          overflow: hidden; border: 1px solid rgba(0,0,0,0.06);
          opacity: 0; visibility: hidden; 
          transform: translateY(20px) scale(0.95); 
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1); transform-origin: bottom right;
        }
        #gaby-chat-widget #chat-widget-container.is-open #chat-window { opacity: 1; visibility: visible; transform: translateY(0) scale(1); }

        /* --- HEADER --- */
        #gaby-chat-widget #chat-header {
          background: var(--primary-color); padding: 10px 16px; display: flex; align-items: center; color: white; flex-shrink: 0;
        }
        #gaby-chat-widget #chat-header-avatar { position: relative; width: 50px; height: 50px; margin-right: 15px; }
        #gaby-chat-widget #chat-header-avatar img { width: 100%; height: 100%; border-radius: 50%; border: 2px solid rgba(255,255,255,0.9); }
        #gaby-chat-widget .online-indicator {
          position: absolute; bottom: 2px; right: 2px; width: 11px; height: 11px; background: #10B981; border: 1.5px solid var(--primary-color); border-radius: 50%;
        }
        #gaby-chat-widget #chat-header-text { display: flex; flex-direction: column; justify-content: center; height: auto; }
        #gaby-chat-widget #chat-header-text h3 { font-size: 18px; font-weight: 700; margin: 8px 0 0 0; letter-spacing: 0.3px; color: #fff !important; line-height: 1.1; }
        #gaby-chat-widget #chat-header-text p { 
            font-size: 12px !important; opacity: 0.9; margin: 3px 0 0 0; font-weight: 400; color: rgba(255,255,255,0.95) !important; 
        }
        #gaby-chat-widget #chat-close-btn { margin-left: auto; background: none; border: none; color: white; cursor: pointer; opacity: 0.7; padding: 4px; }

        /* --- MENSAJES --- */
        #gaby-chat-widget #chat-messages { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; background-color: #f8f9fa; scroll-behavior: smooth; }
        #gaby-chat-widget .message {
          max-width: 85%; padding: 10px 14px; font-size: 14px; line-height: 1.5; position: relative; word-wrap: break-word;
          animation: messageSlideIn 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }
        @keyframes messageSlideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        #gaby-chat-widget .message.bot {
          align-self: flex-start; background: var(--bot-msg-bg); color: var(--text-body);
          border-radius: var(--radius-bubble) var(--radius-bubble) var(--radius-bubble) 2px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05); border: 1px solid rgba(0,0,0,0.03);
        }
        #gaby-chat-widget .message.bot a { color: var(--primary-color); font-weight: 600; text-decoration: none; border-bottom: 1px solid var(--primary-color); }
        #gaby-chat-widget .message.user {
          align-self: flex-end; background: var(--user-msg-bg); color: white;
          border-radius: var(--radius-bubble) var(--radius-bubble) 2px var(--radius-bubble);
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
        #gaby-chat-widget .message.user a { color: white; text-decoration: underline; }

        /* --- RESPUESTAS RÁPIDAS --- */
        #gaby-chat-widget #quick-responses { display: flex; flex-wrap: wrap; gap: 8px; padding: 10px 16px; background: var(--chat-bg); }
        #gaby-chat-widget .quick-response-btn {
          padding: 8px 12px; background: white; color: var(--primary-color); border: 1px solid var(--accent-color); border-radius: 20px;
          font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }
        #gaby-chat-widget .quick-response-btn:disabled { cursor: not-allowed !important; opacity: 0.6 !important; }

        /* --- TYPING --- */
        #gaby-chat-widget .message.typing { padding: 12px 16px; display: flex; align-items: center; gap: 4px; width: fit-content; }
        .typing-dot { width: 6px; height: 6px; background: #9ca3af; border-radius: 50%; animation: typingBounce 1.4s infinite ease-in-out both; }
        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }
        @keyframes typingBounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }

        /* --- INPUT --- */
        #gaby-chat-widget #chat-input-wrapper { background: white; padding: 8px 12px 4px 12px; border-top: 1px solid #f0f0f0; }
        #gaby-chat-widget #chat-input-area {
          display: flex; align-items: center; background: #f3f4f6; border-radius: 24px; padding: 4px 4px 4px 14px;
          border: 1px solid transparent; transition: all 0.2s; min-height: 50px !important;
        }
        #gaby-chat-widget #chat-input-area:focus-within { background: white; border-color: var(--primary-color); box-shadow: 0 0 0 2px rgba(0, 200, 215, 0.2); }
        #gaby-chat-widget #chat-input {
          flex: 1; border: none; background: transparent; padding: 0; height: 38px; max-height: 80px; font-size: 16px; resize: none; color: var(--text-dark); line-height: 1.4;
        }
        #gaby-chat-widget #chat-input:disabled { cursor: not-allowed !important; opacity: 0.6 !important; }
        #gaby-chat-widget #chat-send-btn {
          width: 42px; height: 42px; background: transparent !important; color: var(--primary-color); border: none; border-radius: 50%;
          margin-left: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: none !important;
        }
        #gaby-chat-widget #chat-send-btn:disabled { cursor: not-allowed !important; opacity: 0.6 !important; }
        #gaby-chat-widget #chat-send-btn svg { width: 28px; height: 28px; transform: rotate(45deg); margin-left: -4px; margin-top: 2px; stroke-width: 2.5px; }
        #gaby-chat-widget .powered-by { font-size: 9px; color: #d1d5db; text-align: center; margin-top: 4px; font-weight: 500; letter-spacing: 0.5px; }

        /* 🚨 MOBILE FIX (FORZADO EXPLICITO) 🚨 */
        @media (max-width: 480px) {
          #gaby-chat-widget #chat-widget-container { bottom: 20px !important; right: 20px !important; }
          #gaby-chat-widget #chat-window {
            width: calc(100vw - 40px) !important; height: 75vh !important; max-height: 600px !important; border-radius: 16px !important;
            position: fixed !important; bottom: 90px !important; right: 20px !important; box-shadow: 0 10px 40px rgba(0,0,0,0.2) !important;
          }
          #gaby-chat-widget #chat-widget-container.is-open #chat-toggle-btn { display: flex !important; }

          /* 🔥 FORZAR TAMAÑOS EN MÓVIL 🔥 */
          #gaby-chat-widget #chat-header-text p { font-size: 12px !important; }
          #gaby-chat-widget #chat-send-btn svg { width: 28px !important; height: 28px !important; }
          #gaby-chat-widget .bubble-text { font-size: 13px !important; }
        }
      `}} />
    </div>
  );
};

export default ChatWidget;
