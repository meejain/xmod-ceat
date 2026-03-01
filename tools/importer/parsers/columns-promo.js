/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-promo block
 * Source: https://www.ceat.com/
 * Base Block: columns
 *
 * Converts promotional banner into two-column layout with text/CTAs and image.
 */
export default function parse(element, { document }) {
  const teaser = element.querySelector('.cmp-teaser');
  if (!teaser) {
    const block = WebImporter.Blocks.createBlock(document, { name: 'Columns-Promo', cells: [] });
    element.replaceWith(block);
    return;
  }

  const title = teaser.querySelector('.cmp-teaser__title, h2.cmp-teaser__title');
  const description = teaser.querySelector('.cmp-teaser__description p');
  const ctas = Array.from(teaser.querySelectorAll('.cmp-teaser__action-container a.cmp-teaser__action-link'));
  const img = teaser.querySelector('picture img') || teaser.querySelector('picture');

  // Left column: heading, description, CTAs
  const leftCol = document.createElement('div');
  if (title) {
    const h2 = document.createElement('h2');
    h2.textContent = title.textContent.trim();
    leftCol.appendChild(h2);
  }
  if (description) {
    const p = document.createElement('p');
    p.textContent = description.textContent.trim();
    leftCol.appendChild(p);
  }
  ctas.forEach((cta) => {
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.href = cta.href;
    a.textContent = cta.textContent.trim();
    const strong = document.createElement('strong');
    strong.appendChild(a);
    p.appendChild(strong);
    leftCol.appendChild(p);
  });

  // Right column: image
  const rightCol = document.createElement('div');
  if (img) rightCol.appendChild(img);

  const cells = [
    [leftCol, rightCol],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'Columns-Promo', cells });
  element.replaceWith(block);
}
