/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-action block
 * Source: https://www.ceat.com/
 * Base Block: cards
 *
 * Extracts action link cards (no images variant).
 * Track Claims, Track Order, Become a Dealer.
 */
export default function parse(element, { document }) {
  const cards = element.querySelectorAll('.helpful-link-teaser.card');
  const cells = [];

  cards.forEach((card) => {
    const teaser = card.querySelector('.cmp-teaser');
    if (!teaser) return;

    const titleEl = teaser.querySelector('.cmp-teaser__title');
    const titleLink = teaser.querySelector('a.cmp-teaser__title-link');
    const descEl = teaser.querySelector('.cmp-teaser__description p');
    const ctaLink = teaser.querySelector('.cmp-teaser__action-container a.cmp-teaser__action-link');

    const contentDiv = document.createElement('div');

    // Title
    if (titleEl) {
      const strong = document.createElement('strong');
      strong.textContent = titleEl.textContent.trim();
      contentDiv.appendChild(strong);
    }

    // Description
    if (descEl) {
      const p = document.createElement('p');
      p.textContent = descEl.textContent.trim();
      contentDiv.appendChild(p);
    }

    // CTA
    if (ctaLink) {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = ctaLink.href || (titleLink ? titleLink.href : '#');
      a.textContent = ctaLink.textContent.trim();
      const strong = document.createElement('strong');
      strong.appendChild(a);
      p.appendChild(strong);
      contentDiv.appendChild(p);
    }

    cells.push([contentDiv]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards-Action', cells });
  element.replaceWith(block);
}
