/* eslint-disable no-unused-vars */

function updateActiveSlide(slide) {
  const block = slide.closest('.carousel-testimonial');
  const slideIndex = parseInt(slide.dataset.slideIndex, 10);
  block.dataset.activeSlide = slideIndex;

  const slides = block.querySelectorAll('.carousel-testimonial-slide');

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

  const indicators = block.querySelectorAll('.carousel-testimonial-slide-indicator');
  indicators.forEach((indicator, idx) => {
    if (idx !== slideIndex) {
      indicator.querySelector('button').removeAttribute('disabled');
    } else {
      indicator.querySelector('button').setAttribute('disabled', 'true');
    }
  });
}

export function showSlide(block, slideIndex = 0) {
  const slides = block.querySelectorAll('.carousel-testimonial-slide');
  let realSlideIndex = slideIndex < 0 ? slides.length - 1 : slideIndex;
  if (slideIndex >= slides.length) realSlideIndex = 0;
  const activeSlide = slides[realSlideIndex];

  activeSlide.querySelectorAll('a').forEach((link) => link.removeAttribute('tabindex'));
  block.querySelector('.carousel-testimonial-slides').scrollTo({
    top: 0,
    left: activeSlide.offsetLeft,
    behavior: 'smooth',
  });
}

function bindEvents(block) {
  const slideIndicators = block.querySelector('.carousel-testimonial-slide-indicators');
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
  block.querySelectorAll('.carousel-testimonial-slide').forEach((slide) => {
    slideObserver.observe(slide);
  });
}

function createSlide(row, slideIndex, carouselId) {
  const slide = document.createElement('li');
  slide.dataset.slideIndex = slideIndex;
  slide.setAttribute('id', `carousel-testimonial-${carouselId}-slide-${slideIndex}`);
  slide.classList.add('carousel-testimonial-slide');

  row.querySelectorAll(':scope > div').forEach((column, colIdx) => {
    column.classList.add(`carousel-testimonial-slide-${colIdx === 0 ? 'image' : 'content'}`);
    slide.append(column);
  });

  /* Build attribution row from the two paragraphs (reviewer + product) */
  const content = slide.querySelector('.carousel-testimonial-slide-content');
  if (content) {
    const paragraphs = [...content.querySelectorAll(':scope > p')];
    if (paragraphs.length >= 2) {
      const attribution = document.createElement('div');
      attribution.classList.add('carousel-testimonial-slide-attribution');

      const reviewer = document.createElement('span');
      reviewer.classList.add('ct-reviewer');
      reviewer.textContent = paragraphs[0].textContent.trim();

      const separator = document.createElement('span');
      separator.classList.add('ct-separator');

      const product = document.createElement('span');
      product.classList.add('ct-product');
      product.textContent = paragraphs[1].textContent.trim();

      attribution.append(reviewer, separator, product);
      content.append(attribution);
    }

    /* Add play button */
    const playBtn = document.createElement('button');
    playBtn.classList.add('carousel-testimonial-play-btn');
    playBtn.setAttribute('type', 'button');
    playBtn.setAttribute('aria-label', 'Play video');
    content.append(playBtn);
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
  block.setAttribute('id', `carousel-testimonial-${carouselId}`);
  const rows = block.querySelectorAll(':scope > div');
  const isSingleSlide = rows.length < 2;

  const placeholders = {};

  block.setAttribute('role', 'region');
  block.setAttribute('aria-roledescription', placeholders.carousel || 'Carousel');

  const container = document.createElement('div');
  container.classList.add('carousel-testimonial-slides-container');

  const slidesWrapper = document.createElement('ul');
  slidesWrapper.classList.add('carousel-testimonial-slides');
  block.prepend(slidesWrapper);

  let slideIndicators;
  if (!isSingleSlide) {
    const slideIndicatorsNav = document.createElement('nav');
    slideIndicatorsNav.setAttribute('aria-label', placeholders.carouselSlideControls || 'Carousel Slide Controls');
    slideIndicators = document.createElement('ol');
    slideIndicators.classList.add('carousel-testimonial-slide-indicators');
    slideIndicatorsNav.append(slideIndicators);
    block.append(slideIndicatorsNav);

    const slideNavButtons = document.createElement('div');
    slideNavButtons.classList.add('carousel-testimonial-navigation-buttons');
    slideNavButtons.innerHTML = `
      <button type="button" class="slide-prev" aria-label="${placeholders.previousSlide || 'Previous Slide'}"><svg viewBox="0 0 33 33" width="33" height="33" fill="none"><circle cx="16.5" cy="16.5" r="16" fill="#F5822D"/><path d="M19 10.5L13 16.5L19 22.5" stroke="white" stroke-width="1.5"/></svg></button>
      <button type="button" class="slide-next" aria-label="${placeholders.nextSlide || 'Next Slide'}"><svg viewBox="0 0 33 33" width="33" height="33" fill="none"><circle cx="16.5" cy="16.5" r="16" fill="#F5822D"/><path d="M14 10.5L20 16.5L14 22.5" stroke="white" stroke-width="1.5"/></svg></button>
    `;

    container.append(slideNavButtons);
  }

  rows.forEach((row, idx) => {
    const slide = createSlide(row, idx, carouselId);
    slidesWrapper.append(slide);

    if (slideIndicators) {
      const indicator = document.createElement('li');
      indicator.classList.add('carousel-testimonial-slide-indicator');
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
  }
}
