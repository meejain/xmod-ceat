/**
 * WhatsApp Chat Widget - floating button with slide-up chat popup.
 * Styled to match interakt.shop widget on the original site.
 * Loaded globally via delayed.js (not a content block).
 */

function createWhatsAppIcon() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 32 32');
  svg.setAttribute('width', '32');
  svg.setAttribute('height', '32');
  svg.innerHTML = '<path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.132 6.744 3.052 9.38L1.056 31.1l5.904-1.96A15.88 15.88 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.31 22.608c-.39 1.098-1.932 2.01-3.18 2.276-.852.18-1.964.324-5.708-1.226-4.792-1.984-7.874-6.836-8.114-7.152-.228-.316-1.924-2.564-1.924-4.89s1.218-3.468 1.65-3.942c.432-.474.944-.592 1.258-.592.314 0 .63.002.904.016.29.014.68-.11 1.064.812.39.94 1.33 3.266 1.446 3.504.118.238.196.514.04.83-.158.316-.236.514-.472.79-.236.278-.498.62-.71.832-.236.236-.482.492-.208.964.276.474 1.226 2.022 2.632 3.276 1.81 1.614 3.336 2.114 3.81 2.352.474.236.75.198 1.026-.118.276-.316 1.18-1.374 1.494-1.846.316-.474.63-.394 1.064-.236.432.158 2.756 1.3 3.228 1.536.474.236.788.354.906.552.116.198.116 1.148-.274 2.252z" fill="#fff"/>';
  return svg;
}

function createCloseIcon() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', '24');
  svg.setAttribute('height', '24');
  svg.innerHTML = '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="#fff"/>';
  return svg;
}

function createChevronUp() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', '28');
  svg.setAttribute('height', '28');
  svg.innerHTML = '<path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" fill="#333"/>';
  return svg;
}

export default function initWhatsAppChat() {
  // Floating button — shows WA icon by default, X icon when open
  const fab = document.createElement('button');
  fab.className = 'wa-chat-fab';
  fab.setAttribute('aria-label', 'Chat on WhatsApp');

  const waIcon = document.createElement('span');
  waIcon.className = 'wa-chat-fab-wa';
  waIcon.append(createWhatsAppIcon());

  const closeIcon = document.createElement('span');
  closeIcon.className = 'wa-chat-fab-close';
  closeIcon.append(createCloseIcon());

  fab.append(waIcon, closeIcon);

  // Popup card — simple white card, no header
  const popup = document.createElement('div');
  popup.className = 'wa-chat-popup';

  // Collapse chevron at top-right
  const chevron = document.createElement('button');
  chevron.className = 'wa-chat-chevron';
  chevron.setAttribute('aria-label', 'Collapse');
  chevron.append(createChevronUp());

  // Content area
  const content = document.createElement('div');
  content.className = 'wa-chat-content';

  const greeting = document.createElement('p');
  greeting.className = 'wa-chat-greeting';
  greeting.textContent = 'HI THERE!';

  const message = document.createElement('p');
  message.className = 'wa-chat-message';
  message.textContent = 'We are here to help you! Chat with us on WhatsApp for any queries.';

  const startChat = document.createElement('a');
  startChat.className = 'wa-chat-start';
  startChat.href = 'https://api.whatsapp.com/send?phone=918657470799&text=Hi';
  startChat.target = '_blank';
  startChat.rel = 'noopener noreferrer';

  const startIcon = createWhatsAppIcon();
  startIcon.setAttribute('width', '22');
  startIcon.setAttribute('height', '22');
  startChat.append(startIcon);

  const startText = document.createElement('span');
  startText.textContent = 'START CHAT';
  startChat.append(startText);

  const powered = document.createElement('p');
  powered.className = 'wa-chat-powered';
  powered.innerHTML = 'Powered by <strong>interakt.shop</strong>';

  content.append(greeting, message, startChat, powered);

  // Assemble popup
  popup.append(chevron, content);

  // Append to body
  document.body.append(fab, popup);

  // Toggle popup
  function openPopup() {
    popup.classList.add('active');
    fab.classList.add('active');
  }

  function closePopup() {
    popup.classList.remove('active');
    fab.classList.remove('active');
  }

  fab.addEventListener('click', () => {
    if (popup.classList.contains('active')) {
      closePopup();
    } else {
      openPopup();
    }
  });

  chevron.addEventListener('click', closePopup);
}
