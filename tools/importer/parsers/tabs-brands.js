/* eslint-disable */
/* global WebImporter */

/**
 * Parser for tabs-brands block
 * Source: https://www.ceat.com/
 * Base Block: tabs
 *
 * Extracts tabbed brand listings (Car/Bike/Scooter).
 */
export default function parse(element, { document }) {
  const tabItems = Array.from(element.querySelectorAll('.cmp-tabs__tablist .cmp-tabs__tab'));
  const tabPanels = Array.from(element.querySelectorAll('.cmp-tabs__tabpanel'));
  const cells = [];

  tabItems.forEach((tab, index) => {
    const label = tab.textContent.trim();
    if (!label) return;

    const panel = tabPanels[index];
    const contentDiv = document.createElement('div');

    // Add tab label as heading
    const h3 = document.createElement('h3');
    h3.textContent = label;
    contentDiv.appendChild(h3);

    if (panel) {
      // Extract brand links from panel
      const brandLinks = Array.from(panel.querySelectorAll('li a[title]'));
      if (brandLinks.length > 0) {
        const p = document.createElement('p');
        brandLinks.forEach((link, i) => {
          if (i > 0) p.appendChild(document.createTextNode(' | '));
          const a = document.createElement('a');
          a.href = link.href;
          a.textContent = link.title || link.textContent.trim();
          p.appendChild(a);
        });
        contentDiv.appendChild(p);
      }
    }

    cells.push([contentDiv]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'Tabs-Brands', cells });
  element.replaceWith(block);
}
