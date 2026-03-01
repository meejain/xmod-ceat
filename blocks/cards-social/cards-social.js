import { createOptimizedPicture } from '../../scripts/aem.js';

const SHARE_ICON = '<svg viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>';
const FB_ICON = '<svg viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3H13v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>';
const X_ICON = '<svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>';
const LI_ICON = '<svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>';
const VIDEO_ICON = '<svg viewBox="0 0 24 16" fill="white"><path d="M22 0H2C.9 0 0 .9 0 2v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zM10 12V4l6 4-6 4z"/></svg>';
const CLOSE_ICON = '<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" stroke="white" stroke-width="2"/><line x1="6" y1="6" x2="18" y2="18" stroke="white" stroke-width="2"/></svg>';
const ARROW_LEFT = '<svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>';
const ARROW_RIGHT = '<svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>';
const INSTAGRAM_ICON = '<svg viewBox="0 0 24 24"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z" fill="url(#ig)"/><defs><linearGradient id="ig" x1="2" y1="22" x2="22" y2="2"><stop stop-color="#F58529"/><stop offset=".5" stop-color="#DD2A7B"/><stop offset="1" stop-color="#8134AF"/></linearGradient></defs></svg>';

/**
 * Update arrow disabled state based on scroll position.
 */
function updateArrows(block) {
  const track = block.querySelector('.cards-social-track');
  const prev = block.querySelector('.cards-social-arrow-prev');
  const next = block.querySelector('.cards-social-arrow-next');
  if (!track || !prev || !next) return;

  const atStart = track.scrollLeft <= 5;
  const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;
  prev.disabled = atStart;
  next.disabled = atEnd;
}

/**
 * Scroll the card track by one full page of visible cards.
 */
function scrollTrack(block, direction) {
  const track = block.querySelector('.cards-social-track');
  if (!track) return;
  track.scrollBy({ left: direction * track.clientWidth, behavior: 'smooth' });
}

function closeModal(overlay) {
  overlay.classList.remove('active');
  const body = overlay.querySelector('.cards-social-modal-body');
  setTimeout(() => { body.innerHTML = ''; }, 300);
}

/**
 * Open the video/image modal.
 */
function openModal(block, videoUrl, imageUrl) {
  let overlay = block.querySelector('.cards-social-modal-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.classList.add('cards-social-modal-overlay');
    overlay.innerHTML = `
      <div class="cards-social-modal">
        <button class="cards-social-modal-close" type="button" aria-label="Close">${CLOSE_ICON}</button>
        <div class="cards-social-modal-body"></div>
      </div>`;
    document.body.append(overlay);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.closest('.cards-social-modal-close')) {
        closeModal(overlay);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closeModal(overlay);
      }
    });
  }

  const body = overlay.querySelector('.cards-social-modal-body');
  body.innerHTML = '';

  if (videoUrl) {
    if (videoUrl.includes('youtube') || videoUrl.includes('youtu.be')) {
      // Extract video ID and use nocookie domain to avoid error 153
      let videoId = '';
      const watchMatch = videoUrl.match(/[?&]v=([^&]+)/);
      const shortMatch = videoUrl.match(/youtu\.be\/([^?&]+)/);
      const embedMatch = videoUrl.match(/embed\/([^?&]+)/);
      if (watchMatch) [, videoId] = watchMatch;
      else if (shortMatch) [, videoId] = shortMatch;
      else if (embedMatch) [, videoId] = embedMatch;

      if (videoId) {
        const embedSrc = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
        body.innerHTML = `<iframe src="${embedSrc}" allow="autoplay; encrypted-media; fullscreen" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe>`;
      }
    } else {
      body.innerHTML = `<video src="${videoUrl}" controls autoplay></video>`;
    }
  } else if (imageUrl) {
    body.innerHTML = `<img src="${imageUrl}" alt="">`;
  }

  requestAnimationFrame(() => overlay.classList.add('active'));
}

/**
 * Build share button with expandable social icons.
 */
function buildShareButton(title, url) {
  const share = document.createElement('div');
  share.classList.add('cards-social-share');

  const btn = document.createElement('button');
  btn.classList.add('cards-social-share-btn');
  btn.setAttribute('type', 'button');
  btn.setAttribute('aria-label', 'Share');
  btn.innerHTML = SHARE_ICON;

  const icons = document.createElement('div');
  icons.classList.add('cards-social-share-icons');

  const encodedUrl = encodeURIComponent(url || window.location.href);
  const encodedTitle = encodeURIComponent(title || '');

  const fbLink = document.createElement('a');
  fbLink.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  fbLink.target = '_blank';
  fbLink.rel = 'noopener noreferrer';
  fbLink.setAttribute('aria-label', 'Share on Facebook');
  fbLink.innerHTML = FB_ICON;

  const xLink = document.createElement('a');
  xLink.href = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  xLink.target = '_blank';
  xLink.rel = 'noopener noreferrer';
  xLink.setAttribute('aria-label', 'Share on X');
  xLink.innerHTML = X_ICON;

  const liLink = document.createElement('a');
  liLink.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  liLink.target = '_blank';
  liLink.rel = 'noopener noreferrer';
  liLink.setAttribute('aria-label', 'Share on LinkedIn');
  liLink.innerHTML = LI_ICON;

  icons.append(fbLink, xLink, liLink);
  share.append(btn, icons);

  // Prevent card click when interacting with share
  share.addEventListener('click', (e) => e.stopPropagation());

  return share;
}

export default function decorate(block) {
  const rows = [...block.children];
  const cards = [];

  rows.forEach((row) => {
    const cols = [...row.children];
    if (cols.length < 2) return;

    const imageDiv = cols[0];
    const bodyDiv = cols[1];

    const card = document.createElement('div');
    card.classList.add('cards-social-card');

    // Extract metadata from body paragraphs
    const paragraphs = [...bodyDiv.querySelectorAll('p')];
    let username = '';
    let handle = '';
    let videoUrl = '';
    let postUrl = '';

    paragraphs.forEach((p) => {
      const text = p.textContent.trim();
      const link = p.querySelector('a');
      if (link) {
        const href = link.href || '';
        if (href.includes('youtube') || href.includes('youtu.be') || href.includes('video')) {
          videoUrl = href;
        } else {
          postUrl = href;
        }
      }
      if (text.startsWith('@')) {
        handle = text;
      } else if (!link && text && !username) {
        username = text;
      }
    });

    // Image container
    const cardImage = document.createElement('div');
    cardImage.classList.add('cards-social-card-image');

    const pic = imageDiv.querySelector('picture');
    if (pic) {
      const img = pic.querySelector('img');
      if (img) {
        const optimized = createOptimizedPicture(img.src, img.alt || username, false, [{ width: '750' }]);
        cardImage.append(optimized);
      }
    }

    // Video icon overlay (if video URL present)
    if (videoUrl) {
      const videoIcon = document.createElement('span');
      videoIcon.classList.add('cards-social-video-icon');
      videoIcon.innerHTML = VIDEO_ICON;
      cardImage.append(videoIcon);
    }

    // Share button
    const shareBtn = buildShareButton(username, postUrl || window.location.href);
    cardImage.append(shareBtn);

    card.append(cardImage);

    // Info section
    const info = document.createElement('div');
    info.classList.add('cards-social-card-info');

    // Avatar - use the first image from body if it exists, else use main image
    const avatarDiv = document.createElement('div');
    avatarDiv.classList.add('cards-social-avatar');
    const avatarImg = bodyDiv.querySelector('img');
    if (avatarImg) {
      const av = document.createElement('img');
      av.src = avatarImg.src;
      av.alt = username;
      av.loading = 'lazy';
      avatarDiv.append(av);
    }
    info.append(avatarDiv);

    if (username) {
      const authorEl = document.createElement('div');
      authorEl.classList.add('cards-social-author');
      authorEl.textContent = username;
      info.append(authorEl);
    }

    if (handle) {
      const handleEl = document.createElement('div');
      handleEl.classList.add('cards-social-handle');
      handleEl.textContent = handle;
      info.append(handleEl);
    }

    // Platform icon (Instagram)
    const platformIcon = document.createElement('div');
    platformIcon.classList.add('cards-social-platform-icon');
    platformIcon.innerHTML = INSTAGRAM_ICON;
    info.append(platformIcon);

    card.append(info);

    // Click handler — open modal
    const imgSrc = pic?.querySelector('img')?.src || '';
    card.addEventListener('click', () => {
      if (videoUrl) {
        openModal(block, videoUrl, null);
      } else if (imgSrc) {
        openModal(block, null, imgSrc);
      }
    });

    cards.push(card);
  });

  // Clear block
  block.textContent = '';

  // Card track
  const track = document.createElement('div');
  track.classList.add('cards-social-track');
  cards.forEach((card) => track.append(card));
  block.append(track);

  // Navigation arrows
  const arrowContainer = document.createElement('div');
  arrowContainer.classList.add('cards-social-arrows');

  const prevBtn = document.createElement('button');
  prevBtn.classList.add('cards-social-arrow-prev');
  prevBtn.setAttribute('type', 'button');
  prevBtn.setAttribute('aria-label', 'Previous');
  prevBtn.innerHTML = ARROW_LEFT;

  const nextBtn = document.createElement('button');
  nextBtn.classList.add('cards-social-arrow-next');
  nextBtn.setAttribute('type', 'button');
  nextBtn.setAttribute('aria-label', 'Next');
  nextBtn.innerHTML = ARROW_RIGHT;

  prevBtn.addEventListener('click', () => scrollTrack(block, -1));
  nextBtn.addEventListener('click', () => scrollTrack(block, 1));

  arrowContainer.append(prevBtn, nextBtn);
  block.append(arrowContainer);

  // Track scroll for arrow state
  track.addEventListener('scroll', () => updateArrows(block));

  // Initial arrow state — delay to ensure layout is settled
  requestAnimationFrame(() => updateArrows(block));
  setTimeout(() => updateArrows(block), 200);

  // Also update once images finish loading
  track.querySelectorAll('img').forEach((img) => {
    if (!img.complete) {
      img.addEventListener('load', () => updateArrows(block), { once: true });
    }
  });
}
