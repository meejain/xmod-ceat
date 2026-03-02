// add delayed functionality here
import { loadCSS } from './aem.js';

async function loadWhatsAppChat() {
  loadCSS(`${window.hlx.codeBasePath}/blocks/whatsapp-chat/whatsapp-chat.css`);
  const { default: initWhatsAppChat } = await import('../blocks/whatsapp-chat/whatsapp-chat.js');
  initWhatsAppChat();
}

loadWhatsAppChat();

async function loadScrollToTop() {
  loadCSS(`${window.hlx.codeBasePath}/blocks/scroll-to-top/scroll-to-top.css`);
  const { default: initScrollToTop } = await import('../blocks/scroll-to-top/scroll-to-top.js');
  initScrollToTop();
}

loadScrollToTop();
