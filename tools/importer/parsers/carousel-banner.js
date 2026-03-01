/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-banner block
 * Source: https://www.ceat.com/
 * Base Block: carousel
 *
 * Extracts promotional banner slides from hero carousel.
 * Each slide becomes a row with its image.
 */
export default function parse(element, { document }) {
  const slides = element.querySelectorAll('.banner-carousel-teaser');
  const cells = [];

  slides.forEach((slide) => {
    const teaser = slide.querySelector('.cmp-teaser');
    if (!teaser) return;

    const img = teaser.querySelector('picture img') || teaser.querySelector('img');
    const link = teaser.querySelector('a.cmp-teaser__link');

    const cellContent = [];
    if (img) {
      if (link) {
        const a = document.createElement('a');
        a.href = link.href;
        a.appendChild(img.cloneNode(true));
        cellContent.push(a);
      } else {
        cellContent.push(img);
      }
    }

    if (cellContent.length > 0) {
      cells.push(cellContent);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'Carousel-Banner', cells });
  element.replaceWith(block);
}
