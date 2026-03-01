/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-testimonial block
 * Source: https://www.ceat.com/
 * Base Block: carousel
 *
 * Extracts expert testimonial carousel slides.
 */
export default function parse(element, { document }) {
  const slides = element.querySelectorAll('.video-testimonials-container .swiper-slide');
  const cells = [];

  slides.forEach((slide) => {
    const teaser = slide.querySelector('.cmp-teaser');
    if (!teaser) return;

    const pretitle = teaser.querySelector('.cmp-teaser__pretitle');
    const title = teaser.querySelector('.cmp-teaser__title, h2.cmp-teaser__title');
    const person = teaser.querySelector('p.testimonial-person');
    const product = teaser.querySelector('p.testimonial-product');
    const img = teaser.querySelector('.cmp-teaser__image picture img')
                || teaser.querySelector('.cmp-image picture img')
                || teaser.querySelector('.cmp-image img');

    const contentDiv = document.createElement('div');

    if (img) contentDiv.appendChild(img);

    if (pretitle) {
      const em = document.createElement('em');
      em.textContent = pretitle.textContent.trim();
      contentDiv.appendChild(em);
    }
    if (title) {
      const h2 = document.createElement('h2');
      h2.textContent = title.textContent.trim();
      contentDiv.appendChild(h2);
    }
    if (person) {
      const p1 = document.createElement('p');
      p1.textContent = person.textContent.trim().replace(/^\.\s*/, '');
      contentDiv.appendChild(p1);
    }
    if (product) {
      const p2 = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = product.textContent.trim();
      p2.appendChild(strong);
      contentDiv.appendChild(p2);
    }

    cells.push([contentDiv]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'Carousel-Testimonial', cells });
  element.replaceWith(block);
}
