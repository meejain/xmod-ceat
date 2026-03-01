/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-finder block
 * Source: https://www.ceat.com/
 * Base Block: columns
 *
 * Converts tyre finder widget into a two-column layout.
 * Left: Vehicle details approach, Right: Tyre size approach.
 */
export default function parse(element, { document }) {
  // Extract vehicle tab content
  const vehicleHeading = element.querySelector('.model-sec-heading')
    || element.querySelector('p.model-sec-heading');
  const vehicleTypes = Array.from(element.querySelectorAll('.vehicle-detail.ct-mm-search-tab'));

  // Build left column content
  const leftCol = document.createElement('div');
  const h3Left = document.createElement('h3');
  h3Left.textContent = vehicleHeading ? vehicleHeading.textContent.trim() : 'Tell us your vehicle details';
  leftCol.appendChild(h3Left);

  const pLeft = document.createElement('p');
  pLeft.textContent = 'Select your vehicle type, enter Make & Model, choose Variant and Manufacturing Year to find the right tyre.';
  leftCol.appendChild(pLeft);

  if (vehicleTypes.length > 0) {
    const typesList = document.createElement('p');
    const typeNames = vehicleTypes.map((vt) => {
      const text = vt.querySelector('.vehicle-detail-text');
      return text ? text.textContent.trim() : '';
    }).filter(Boolean);
    typesList.textContent = typeNames.join(' | ');
    leftCol.appendChild(typesList);
  }

  const linkLeft = document.createElement('a');
  linkLeft.href = '/car-tyres.html';
  linkLeft.textContent = 'View Tyres';
  const strongLeft = document.createElement('strong');
  strongLeft.appendChild(linkLeft);
  leftCol.appendChild(strongLeft);

  // Build right column content
  const rightCol = document.createElement('div');
  const h3Right = document.createElement('h3');
  h3Right.textContent = 'Tell us your tyre size';
  rightCol.appendChild(h3Right);

  const pRight = document.createElement('p');
  pRight.textContent = 'Enter your tyre size to find compatible options for your vehicle.';
  rightCol.appendChild(pRight);

  const linkRight = document.createElement('a');
  linkRight.href = '/car-tyres.html';
  linkRight.textContent = 'View Tyres';
  const strongRight = document.createElement('strong');
  strongRight.appendChild(linkRight);
  rightCol.appendChild(strongRight);

  const cells = [
    [leftCol, rightCol],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'Columns-Finder', cells });
  element.replaceWith(block);
}
