/* eslint-disable */
/* global WebImporter */

/**
 * Parser for accordion-seo block
 * Source: https://www.ceat.com/
 * Base Block: accordion
 *
 * Extracts SEO accordion with nested sub-topics, flattened to single level.
 */
export default function parse(element, { document }) {
  const cells = [];

  // Top-level heading and intro
  const topHeader = element.querySelector('.seo-accordion-header.seo-header h3');
  const topIntro = element.querySelector('p.seo-accordion-content-sub');

  if (topHeader) {
    const questionDiv = document.createElement('div');
    const h3 = document.createElement('h3');
    h3.textContent = topHeader.textContent.trim();
    questionDiv.appendChild(h3);

    const answerDiv = document.createElement('div');
    if (topIntro) {
      const p = document.createElement('p');
      p.textContent = topIntro.textContent.trim();
      answerDiv.appendChild(p);
    }

    cells.push([questionDiv, answerDiv]);
  }

  // Nested accordion items
  const nestedItems = element.querySelectorAll('.seo-nested-accordion .seo-accordion-item');
  nestedItems.forEach((item) => {
    const header = item.querySelector('.seo-accordion-header-sub h3, .seo-accordion-header h3');
    const content = item.querySelector('.seo-accordion-content-inner p, .seo-accordion-content p');

    if (!header) return;

    const questionDiv = document.createElement('div');
    const h3 = document.createElement('h3');
    h3.textContent = header.textContent.trim();
    questionDiv.appendChild(h3);

    const answerDiv = document.createElement('div');
    if (content) {
      const p = document.createElement('p');
      p.innerHTML = content.innerHTML;
      answerDiv.appendChild(p);
    }

    cells.push([questionDiv, answerDiv]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'Accordion-Seo', cells });
  element.replaceWith(block);
}
