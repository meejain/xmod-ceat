/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-stories block
 * Source: https://www.ceat.com/
 * Base Block: cards
 *
 * Extracts travel destination story cards with images.
 */
export default function parse(element, { document }) {
  const slides = element.querySelectorAll('.crosstrail-stories-ctn .swiper-slide');
  const cells = [];

  slides.forEach((slide) => {
    const storyLink = slide.querySelector('a.crosstrail-each-storie, a.story-div');
    const img = slide.querySelector('img.crosstrail-each-storie-img') || slide.querySelector('img:first-of-type');

    if (!img && !storyLink) return;

    // Left cell: image
    const imgCell = [];
    if (img) imgCell.push(img);

    // Right cell: title/link
    const contentCell = document.createElement('div');
    if (storyLink) {
      const a = document.createElement('a');
      a.href = storyLink.href;
      a.textContent = img && img.alt ? img.alt : 'View Story';
      const strong = document.createElement('strong');
      strong.appendChild(a);
      contentCell.appendChild(strong);
    }

    cells.push([imgCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards-Stories', cells });
  element.replaceWith(block);
}
