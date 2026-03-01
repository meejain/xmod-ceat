/* eslint-disable */
/* global WebImporter */

/**
 * Parser for accordion-faq block
 * Source: https://www.ceat.com/
 * Base Block: accordion
 *
 * Extracts FAQ accordion items.
 */
export default function parse(element, { document }) {
  const items = element.querySelectorAll('.cmp-accordion__item');
  const cells = [];

  items.forEach((item) => {
    const questionEl = item.querySelector('.cmp-accordion__title, span.cmp-accordion__title');
    const answerPanel = item.querySelector('.cmp-accordion__panel');

    if (!questionEl) return;

    const question = questionEl.textContent.trim();

    // Build answer content
    const answerDiv = document.createElement('div');
    if (answerPanel) {
      const paragraphs = answerPanel.querySelectorAll('.text.parbase p, p');
      paragraphs.forEach((p) => {
        const newP = document.createElement('p');
        newP.innerHTML = p.innerHTML;
        answerDiv.appendChild(newP);
      });
    }

    // Each row: question heading | answer content
    const questionDiv = document.createElement('div');
    const h3 = document.createElement('h3');
    h3.textContent = question;
    questionDiv.appendChild(h3);

    cells.push([questionDiv, answerDiv]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'Accordion-Faq', cells });
  element.replaceWith(block);
}
