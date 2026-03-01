// add delayed functionality here
import { loadCSS } from './aem.js';

async function loadWhatsAppChat() {
  loadCSS(`${window.hlx.codeBasePath}/blocks/whatsapp-chat/whatsapp-chat.css`);
  const { default: initWhatsAppChat } = await import('../blocks/whatsapp-chat/whatsapp-chat.js');
  initWhatsAppChat();
}

loadWhatsAppChat();
