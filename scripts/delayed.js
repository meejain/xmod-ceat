// add delayed functionality here
import { loadCSS } from './aem.js';

async function loadRequestCallback() {
  loadCSS(`${window.hlx.codeBasePath}/blocks/request-callback/request-callback.css`);
  const { default: initRequestCallback } = await import('../blocks/request-callback/request-callback.js');
  initRequestCallback();
}

async function loadWhatsAppChat() {
  loadCSS(`${window.hlx.codeBasePath}/blocks/whatsapp-chat/whatsapp-chat.css`);
  const { default: initWhatsAppChat } = await import('../blocks/whatsapp-chat/whatsapp-chat.js');
  initWhatsAppChat();
}

loadRequestCallback();
loadWhatsAppChat();
