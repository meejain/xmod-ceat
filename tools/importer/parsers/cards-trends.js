/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-trends block
 * Source: https://www.ceat.com/
 * Base Block: cards
 *
 * Extracts trend/video/blog cards.
 */
export default function parse(element, { document }) {
  const videoCards = element.querySelectorAll('.video-card-container .video-card');
  const blogCards = element.querySelectorAll('.blogs-card-container .blog-card');
  const cells = [];

  const processCards = (cards) => {
    cards.forEach((card) => {
      const img = card.querySelector('.cmp-image img') || card.querySelector('img');
      const title = card.querySelector('.cmp-teaser__title, h2.cmp-teaser__title, h3.cmp-teaser__title');
      const videoLink = card.querySelector('a.video-thumb');

      if (!img && !title) return;

      // Left cell: image
      const imgCell = [];
      if (img) imgCell.push(img);

      // Right cell: title + link
      const contentCell = document.createElement('div');
      if (title) {
        const strong = document.createElement('strong');
        strong.textContent = title.textContent.trim();
        contentCell.appendChild(strong);
      }
      if (videoLink && videoLink.href) {
        const p = document.createElement('p');
        const a = document.createElement('a');
        a.href = videoLink.href;
        a.textContent = 'Watch Video';
        p.appendChild(a);
        contentCell.appendChild(p);
      }

      cells.push([imgCell, contentCell]);
    });
  };

  processCards(videoCards);
  processCards(blogCards);

  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards-Trends', cells });
  element.replaceWith(block);
}
