/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-locator block
 * Source: https://www.ceat.com/
 * Base Block: columns
 *
 * Converts dealer locator section into two-column layout.
 * Left: search description + city links. Right: stats + image.
 */
export default function parse(element, { document }) {
  // Left column: search description + city links
  const leftCol = document.createElement('div');

  const enterText = element.querySelector('.enter-near-shop-title, p.enter-near-shop-title');
  const pDesc = document.createElement('p');
  pDesc.textContent = enterText ? enterText.textContent.trim() : 'Enter your pincode to find a tyre shop near you';
  leftCol.appendChild(pDesc);

  const cityLinks = Array.from(element.querySelectorAll('.cmp-tabs__tablist .cmp-tabs__tab a.state-link'));
  if (cityLinks.length > 0) {
    const cityP = document.createElement('p');
    cityLinks.forEach((cityLink, i) => {
      if (i > 0) cityP.appendChild(document.createTextNode(' | '));
      const a = document.createElement('a');
      a.href = cityLink.href;
      a.textContent = cityLink.textContent.trim();
      cityP.appendChild(a);
    });
    leftCol.appendChild(cityP);
  }

  // Right column: stats + image
  const rightCol = document.createElement('div');

  const statContents = element.querySelectorAll('.shop-teaser .cmp-teaser__content');
  statContents.forEach((statBlock) => {
    const statNum = statBlock.querySelector('h2, .cmp-teaser__title');
    const statLabel = statBlock.querySelector('p, .cmp-teaser__description p');
    if (statNum) {
      const h3 = document.createElement('h3');
      h3.textContent = statNum.textContent.trim();
      rightCol.appendChild(h3);
    }
    if (statLabel) {
      const p = document.createElement('p');
      p.textContent = statLabel.textContent.trim();
      rightCol.appendChild(p);
    }
  });

  const shopImg = element.querySelector('.shop-teaser picture img') || element.querySelector('.shop-teaser img');
  if (shopImg) rightCol.appendChild(shopImg);

  const cells = [
    [leftCol, rightCol],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'Columns-Locator', cells });
  element.replaceWith(block);
}
