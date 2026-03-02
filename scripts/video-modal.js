/**
 * Shared video modal for YouTube embeds.
 * Usage:
 *   import { openVideoModal } from '../../scripts/video-modal.js';
 *   openVideoModal('https://www.youtube.com/watch?v=abc123');
 */

let overlay;

function getEmbedUrl(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtube.com') && u.searchParams.has('v')) {
      return `https://www.youtube.com/embed/${u.searchParams.get('v')}?autoplay=1&rel=0`;
    }
    if (u.hostname === 'youtu.be') {
      return `https://www.youtube.com/embed${u.pathname}?autoplay=1&rel=0`;
    }
    if (u.pathname.includes('/embed/')) {
      const sep = u.search ? '&' : '?';
      return `${url}${sep}autoplay=1&rel=0`;
    }
  } catch { /* ignore */ }
  return url;
}

function closeModal() {
  if (!overlay) return;
  overlay.classList.remove('active');
  const iframe = overlay.querySelector('iframe');
  if (iframe) iframe.src = '';
  document.body.style.overflow = '';
}

function ensureOverlay() {
  if (overlay) return overlay;

  overlay = document.createElement('div');
  overlay.classList.add('video-modal-overlay');

  const dialog = document.createElement('div');
  dialog.classList.add('video-modal-dialog');

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('video-modal-close');
  closeBtn.setAttribute('type', 'button');
  closeBtn.setAttribute('aria-label', 'Close video');
  closeBtn.innerHTML = '<svg viewBox="0 0 24 24" width="28" height="28"><path d="M18 6L6 18M6 6l12 12" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>';
  closeBtn.addEventListener('click', closeModal);

  const iframeWrap = document.createElement('div');
  iframeWrap.classList.add('video-modal-iframe-wrap');

  const iframe = document.createElement('iframe');
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'autoplay; encrypted-media');
  iframe.setAttribute('frameborder', '0');

  iframeWrap.append(iframe);
  dialog.append(closeBtn, iframeWrap);
  overlay.append(dialog);
  document.body.append(overlay);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  return overlay;
}

export default function openVideoModal(url) {
  const modal = ensureOverlay();
  const iframe = modal.querySelector('iframe');
  iframe.src = getEmbedUrl(url);
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}
