/* eslint-disable no-unused-vars */

function updateActiveSlide(slide) {
  const block = slide.closest('.carousel-banner');
  const slideIndex = parseInt(slide.dataset.slideIndex, 10);
  block.dataset.activeSlide = slideIndex;

  const slides = block.querySelectorAll('.carousel-banner-slide');

  slides.forEach((aSlide, idx) => {
    aSlide.setAttribute('aria-hidden', idx !== slideIndex);
    aSlide.querySelectorAll('a').forEach((link) => {
      if (idx !== slideIndex) {
        link.setAttribute('tabindex', '-1');
      } else {
        link.removeAttribute('tabindex');
      }
    });
  });

  const indicators = block.querySelectorAll('.carousel-banner-slide-indicator');
  indicators.forEach((indicator, idx) => {
    if (idx !== slideIndex) {
      indicator.querySelector('button').removeAttribute('disabled');
    } else {
      indicator.querySelector('button').setAttribute('disabled', 'true');
    }
  });
}

export function showSlide(block, slideIndex = 0) {
  const slides = block.querySelectorAll('.carousel-banner-slide');
  let realSlideIndex = slideIndex < 0 ? slides.length - 1 : slideIndex;
  if (slideIndex >= slides.length) realSlideIndex = 0;
  const activeSlide = slides[realSlideIndex];

  activeSlide.querySelectorAll('a').forEach((link) => link.removeAttribute('tabindex'));
  block.querySelector('.carousel-banner-slides').scrollTo({
    top: 0,
    left: activeSlide.offsetLeft,
    behavior: 'smooth',
  });
}

function startAutoPlay(block, interval = 3000) {
  let timer = setInterval(() => {
    const current = parseInt(block.dataset.activeSlide, 10) || 0;
    showSlide(block, current + 1);
  }, interval);

  const resetTimer = () => {
    clearInterval(timer);
    timer = setInterval(() => {
      const current = parseInt(block.dataset.activeSlide, 10) || 0;
      showSlide(block, current + 1);
    }, interval);
  };

  /* Pause on hover, resume on leave */
  block.addEventListener('mouseenter', () => clearInterval(timer));
  block.addEventListener('mouseleave', resetTimer);

  /* Reset timer on any manual navigation */
  block.addEventListener('click', (e) => {
    if (e.target.closest('.slide-prev, .slide-next, .carousel-banner-slide-indicator')) {
      resetTimer();
    }
  });

  return timer;
}

function bindEvents(block) {
  const slideIndicators = block.querySelector('.carousel-banner-slide-indicators');
  if (!slideIndicators) return;

  slideIndicators.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (e) => {
      const slideIndicator = e.currentTarget.parentElement;
      showSlide(block, parseInt(slideIndicator.dataset.targetSlide, 10));
    });
  });

  block.querySelector('.slide-prev').addEventListener('click', () => {
    showSlide(block, parseInt(block.dataset.activeSlide, 10) - 1);
  });
  block.querySelector('.slide-next').addEventListener('click', () => {
    showSlide(block, parseInt(block.dataset.activeSlide, 10) + 1);
  });

  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) updateActiveSlide(entry.target);
    });
  }, { threshold: 0.5 });
  block.querySelectorAll('.carousel-banner-slide').forEach((slide) => {
    slideObserver.observe(slide);
  });
}

function createSlide(row, slideIndex, carouselId) {
  const slide = document.createElement('li');
  slide.dataset.slideIndex = slideIndex;
  slide.setAttribute('id', `carousel-banner-${carouselId}-slide-${slideIndex}`);
  slide.classList.add('carousel-banner-slide');

  row.querySelectorAll(':scope > div').forEach((column, colIdx) => {
    column.classList.add(`carousel-banner-slide-${colIdx === 0 ? 'image' : 'content'}`);
    slide.append(column);
  });

  /* Hide empty content overlay (banner images contain baked-in text) */
  const content = slide.querySelector('.carousel-banner-slide-content');
  if (content) {
    const hasLink = content.querySelector('a');
    if (!hasLink && content.textContent.trim() === '') {
      content.classList.add('carousel-banner-slide-content-empty');
    }
  }

  const labeledBy = slide.querySelector('h1, h2, h3, h4, h5, h6');
  if (labeledBy) {
    slide.setAttribute('aria-labelledby', labeledBy.getAttribute('id'));
  }

  return slide;
}

let carouselId = 0;
export default async function decorate(block) {
  carouselId += 1;
  block.setAttribute('id', `carousel-banner-${carouselId}`);
  const rows = block.querySelectorAll(':scope > div');
  const isSingleSlide = rows.length < 2;

  const placeholders = {};

  block.setAttribute('role', 'region');
  block.setAttribute('aria-roledescription', placeholders.carousel || 'Carousel');

  const container = document.createElement('div');
  container.classList.add('carousel-banner-slides-container');

  const slidesWrapper = document.createElement('ul');
  slidesWrapper.classList.add('carousel-banner-slides');
  block.prepend(slidesWrapper);

  let slideIndicators;
  if (!isSingleSlide) {
    /* Previous arrow — left edge, vertically centered */
    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.classList.add('slide-prev');
    prevBtn.setAttribute('aria-label', placeholders.previousSlide || 'Previous Slide');
    prevBtn.innerHTML = '<svg viewBox="0 0 33 33" width="33" height="33" fill="none">'
      + '<circle cx="16.5" cy="16.5" r="16" fill="#F5822D"/>'
      + '<path d="M19 10.5L13 16.5L19 22.5" stroke="white" stroke-width="1.5"/>'
      + '</svg>';
    container.append(prevBtn);

    /* Next arrow — right edge, vertically centered */
    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.classList.add('slide-next');
    nextBtn.setAttribute('aria-label', placeholders.nextSlide || 'Next Slide');
    nextBtn.innerHTML = '<svg viewBox="0 0 33 33" width="33" height="33" fill="none">'
      + '<circle cx="16.5" cy="16.5" r="16" fill="#F5822D"/>'
      + '<path d="M14 10.5L20 16.5L14 22.5" stroke="white" stroke-width="1.5"/>'
      + '</svg>';
    container.append(nextBtn);

    /* Bottom-left controls bar: play + indicators */
    const controlsBar = document.createElement('div');
    controlsBar.classList.add('carousel-banner-controls');

    /* Play button – opens video modal */
    const playBtn = document.createElement('button');
    playBtn.type = 'button';
    playBtn.classList.add('carousel-banner-play');
    playBtn.setAttribute('aria-label', 'Play Video');
    playBtn.innerHTML = '<svg viewBox="0 0 55 55" width="55" height="55" fill="none">'
      + '<circle cx="27.5" cy="27.5" r="27" fill="#F5822D"/>'
      + '<polygon points="23,16 23,39 40,27.5" fill="#fff"/>'
      + '</svg>';
    controlsBar.append(playBtn);

    /* Slide indicators */
    const slideIndicatorsNav = document.createElement('nav');
    slideIndicatorsNav.setAttribute(
      'aria-label',
      placeholders.carouselSlideControls || 'Carousel Slide Controls',
    );
    slideIndicators = document.createElement('ol');
    slideIndicators.classList.add('carousel-banner-slide-indicators');
    slideIndicatorsNav.append(slideIndicators);
    controlsBar.append(slideIndicatorsNav);

    container.append(controlsBar);

    /* Video modal overlay */
    const videoModal = document.createElement('div');
    videoModal.classList.add('carousel-banner-video-modal');
    videoModal.innerHTML = '<div class="carousel-banner-video-modal-content">'
      + '<button type="button" class="carousel-banner-video-close" aria-label="Close Video">'
      + '<svg viewBox="0 0 24 24" width="28" height="28">'
      + '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="#fff"/>'
      + '</svg></button>'
      + '<div class="carousel-banner-video-wrapper">'
      + '<iframe src="" allowfullscreen allow="autoplay; encrypted-media"></iframe>'
      + '</div></div>';
    block.append(videoModal);

    /* Play opens modal */
    playBtn.addEventListener('click', () => {
      const iframe = videoModal.querySelector('iframe');
      iframe.src = 'https://www.youtube.com/embed/RXWyJyUD1QM?autoplay=1';
      videoModal.classList.add('active');
    });

    /* Close modal */
    const closeModal = () => {
      videoModal.classList.remove('active');
      videoModal.querySelector('iframe').src = '';
    };
    videoModal.querySelector('.carousel-banner-video-close').addEventListener('click', closeModal);
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && videoModal.classList.contains('active')) closeModal();
    });
  }

  rows.forEach((row, idx) => {
    const slide = createSlide(row, idx, carouselId);
    slidesWrapper.append(slide);

    if (slideIndicators) {
      const indicator = document.createElement('li');
      indicator.classList.add('carousel-banner-slide-indicator');
      indicator.dataset.targetSlide = idx;
      indicator.innerHTML = `<button type="button" aria-label="${placeholders.showSlide || 'Show Slide'} ${idx + 1} ${placeholders.of || 'of'} ${rows.length}"></button>`;
      slideIndicators.append(indicator);
    }
    row.remove();
  });

  container.append(slidesWrapper);
  block.prepend(container);

  if (!isSingleSlide) {
    bindEvents(block);
    startAutoPlay(block, 3000);
  }
}
