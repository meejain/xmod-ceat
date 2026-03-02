import { createOptimizedPicture, loadCSS } from '../../scripts/aem.js';

/**
 * Update arrow disabled state based on scroll position.
 */
function updateArrows(block) {
  const track = block.querySelector('.cards-trends-track');
  const prev = block.querySelector('.cards-trends-arrow-prev');
  const next = block.querySelector('.cards-trends-arrow-next');
  if (!track || !prev || !next) return;

  const atStart = track.scrollLeft <= 5;
  const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;
  prev.disabled = atStart;
  next.disabled = atEnd;
}

/**
 * Show / hide cards based on type + category filter.
 */
function filterCards(block, type, category) {
  const allCards = block.querySelectorAll('.cards-trends-card');
  allCards.forEach((card) => {
    const show = card.dataset.type === type && card.dataset.category === category;
    card.style.display = show ? '' : 'none';
  });

  // Reset scroll
  const track = block.querySelector('.cards-trends-track');
  if (track) track.scrollLeft = 0;

  // Update arrow state
  updateArrows(block);
}

/**
 * Builds the filter bar with pill tabs and a dropdown.
 * Tabs and dropdown options come from data attributes on the cards.
 */
function buildFilterBar(block, cards) {
  const filterBar = document.createElement('div');
  filterBar.classList.add('cards-trends-filter-bar');

  // Collect categories per type from card data
  const typeMap = {};
  cards.forEach((card) => {
    const { type, category } = card.dataset;
    if (!type || !category) return;
    if (!typeMap[type]) typeMap[type] = new Set();
    typeMap[type].add(category);
  });

  const types = Object.keys(typeMap);
  if (types.length === 0) return null;

  // Dropdown (right side) — selects Videos / Blogs
  const dropdown = document.createElement('select');
  dropdown.classList.add('cards-trends-dropdown');
  types.forEach((type, idx) => {
    const opt = document.createElement('option');
    opt.value = type;
    opt.textContent = type;
    if (idx === 0) opt.selected = true;
    dropdown.append(opt);
  });

  // Pill tabs container (left side) — categories within selected type
  const pillTabs = document.createElement('div');
  pillTabs.classList.add('cards-trends-pills');
  pillTabs.setAttribute('role', 'tablist');

  function buildPills(activeType) {
    pillTabs.innerHTML = '';
    const categories = [...(typeMap[activeType] || [])];
    categories.forEach((cat, idx) => {
      const pill = document.createElement('button');
      pill.setAttribute('type', 'button');
      pill.setAttribute('role', 'tab');
      pill.textContent = cat;
      pill.dataset.category = cat;
      if (idx === 0) pill.classList.add('active');
      pill.addEventListener('click', () => {
        pillTabs.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
        pill.classList.add('active');
        filterCards(block, activeType, cat);
      });
      pillTabs.append(pill);
    });
  }

  buildPills(types[0]);

  dropdown.addEventListener('change', () => {
    buildPills(dropdown.value);
    const firstCat = [...(typeMap[dropdown.value] || [])][0];
    filterCards(block, dropdown.value, firstCat);
  });

  filterBar.append(pillTabs, dropdown);
  return filterBar;
}

/**
 * Scroll the card track left or right by one card width.
 */
function scrollTrack(block, direction) {
  const track = block.querySelector('.cards-trends-track');
  if (!track) return;
  const visibleCard = track.querySelector('.cards-trends-card:not([style*="display: none"])');
  const scrollAmount = visibleCard ? visibleCard.offsetWidth + 12 : 350;
  track.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
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
    card.classList.add('cards-trends-card');

    // Extract metadata from body paragraphs
    const paragraphs = [...bodyDiv.querySelectorAll('p')];
    const strong = bodyDiv.querySelector('p strong') || bodyDiv.querySelector('strong');
    const title = strong ? strong.textContent.trim() : '';

    // Extract video URL from link
    const videoLink = bodyDiv.querySelector('a[href*="youtube"], a[href*="youtu.be"]');
    const videoUrl = videoLink ? videoLink.href : '';

    // Expect: title (bold), category, type
    let category = '';
    let type = 'Videos';
    paragraphs.forEach((p) => {
      const text = p.textContent.trim();
      if (p.querySelector('strong')) return; // title
      if (p.querySelector('a[href*="youtube"], a[href*="youtu.be"]')) return; // video link
      if (['Videos', 'Blogs'].includes(text)) {
        type = text;
      } else if (text) {
        category = text;
      }
    });

    card.dataset.type = type;
    card.dataset.category = category;
    if (videoUrl) card.dataset.videoUrl = videoUrl;

    // Image with play button overlay
    const cardImage = document.createElement('div');
    cardImage.classList.add('cards-trends-card-image');

    const pic = imageDiv.querySelector('picture');
    if (pic) {
      const img = pic.querySelector('img');
      if (img) {
        const optimized = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        cardImage.append(optimized);
      }
    }

    // Add play button overlay for Videos
    if (type === 'Videos') {
      const playBtn = document.createElement('span');
      playBtn.classList.add('cards-trends-play-btn');
      playBtn.setAttribute('aria-hidden', 'true');
      cardImage.append(playBtn);
    }

    card.append(cardImage);

    // Title
    const cardTitle = document.createElement('h3');
    cardTitle.classList.add('cards-trends-card-title');
    cardTitle.textContent = title;
    card.append(cardTitle);

    cards.push(card);
  });

  // Clear block
  block.textContent = '';

  // Build filter bar
  const filterBar = buildFilterBar(block, cards);
  if (filterBar) block.append(filterBar);

  // Card track (horizontal scroll container)
  const track = document.createElement('div');
  track.classList.add('cards-trends-track');
  cards.forEach((card) => track.append(card));
  block.append(track);

  // Navigation arrows
  const arrowContainer = document.createElement('div');
  arrowContainer.classList.add('cards-trends-arrows');

  const prevBtn = document.createElement('button');
  prevBtn.classList.add('cards-trends-arrow-prev');
  prevBtn.setAttribute('type', 'button');
  prevBtn.setAttribute('aria-label', 'Previous');
  prevBtn.innerHTML = '<svg viewBox="0 0 30 31" width="30" height="30" fill="none"><circle cx="15" cy="15" r="15" transform="matrix(-1 0 0 1 30 0.5)" fill="#3F3F3F"/><path d="M11.3 15.5L17.3 21.54L18.7 20.13L14.1 15.5L18.7 10.87L17.3 9.47L11.3 15.5Z" fill="white"/></svg>';

  const nextBtn = document.createElement('button');
  nextBtn.classList.add('cards-trends-arrow-next');
  nextBtn.setAttribute('type', 'button');
  nextBtn.setAttribute('aria-label', 'Next');
  nextBtn.innerHTML = '<svg viewBox="0 0 30 31" width="30" height="30" fill="none"><circle cx="15" cy="15.5" r="15" fill="#3F3F3F"/><path d="M18.7 15.5L12.7 21.54L11.3 20.13L15.9 15.5L11.3 10.87L12.7 9.47L18.7 15.5Z" fill="white"/></svg>';

  prevBtn.addEventListener('click', () => scrollTrack(block, -1));
  nextBtn.addEventListener('click', () => scrollTrack(block, 1));

  arrowContainer.append(prevBtn, nextBtn);
  block.append(arrowContainer);

  // Track scroll event for arrow state
  track.addEventListener('scroll', () => updateArrows(block));

  // Initial filter — show first type + first category
  const firstType = cards[0]?.dataset.type || 'Videos';
  const firstCat = cards[0]?.dataset.category || '';
  filterCards(block, firstType, firstCat);

  // Deferred arrow update after layout settles
  requestAnimationFrame(() => updateArrows(block));

  // Wire video card clicks to video modal
  block.querySelectorAll('.cards-trends-card[data-video-url]').forEach((card) => {
    card.addEventListener('click', async () => {
      loadCSS(`${window.hlx.codeBasePath}/scripts/video-modal.css`);
      const { default: openVideoModal } = await import('../../scripts/video-modal.js');
      openVideoModal(card.dataset.videoUrl);
    });
  });
}
