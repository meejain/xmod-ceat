/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-product block
 * Source: https://www.ceat.com/
 * Base Block: cards
 *
 * Extracts product category cards with images and links.
 */
export default function parse(element, { document }) {
  const cards = element.querySelectorAll('.card-teaser.ceat-card-campaign');
  const cells = [];

  cards.forEach((card) => {
    const teaser = card.querySelector('.cmp-teaser');
    if (!teaser) return;

    const link = teaser.querySelector('a.cmp-teaser__link');
    const img = teaser.querySelector('picture img') || teaser.querySelector('img');

    // Left cell: image
    const imgCell = [];
    if (img) imgCell.push(img);

    // Right cell: title and link
    const contentCell = document.createElement('div');
    if (img && img.alt) {
      const title = document.createElement('strong');
      title.textContent = img.alt.replace(/^CEAT\s*/i, '').replace(/\s*tyres$/i, '').trim();
      contentCell.appendChild(title);
    }
    if (link) {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = 'View Product';
      p.appendChild(a);
      contentCell.appendChild(p);
    }

    cells.push([imgCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards-Product', cells });
  element.replaceWith(block);
}
