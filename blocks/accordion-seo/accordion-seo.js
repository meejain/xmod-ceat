export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;

  // First row is the outer wrapper (title + intro text)
  const outerRow = rows[0];
  const outerLabel = outerRow.children[0];
  const outerBody = outerRow.children[1];

  // Build outer header
  const outerSummary = document.createElement('summary');
  outerSummary.className = 'accordion-seo-header';
  outerSummary.append(...outerLabel.childNodes);

  // Build intro content
  const introContent = document.createElement('div');
  introContent.className = 'accordion-seo-intro';
  introContent.append(...outerBody.childNodes);

  // Build nested sub-accordions from remaining rows
  const nestedContainer = document.createElement('div');
  nestedContainer.className = 'accordion-seo-nested';

  rows.slice(1).forEach((row) => {
    const label = row.children[0];
    const body = row.children[1];

    const summary = document.createElement('summary');
    summary.className = 'accordion-seo-sub-label';
    summary.append(...label.childNodes);

    const subBody = document.createElement('div');
    subBody.className = 'accordion-seo-sub-body';
    subBody.append(...body.childNodes);

    const details = document.createElement('details');
    details.className = 'accordion-seo-sub-item';
    details.append(summary, subBody);
    nestedContainer.append(details);
  });

  // Build outer details
  const outerDetails = document.createElement('details');
  outerDetails.className = 'accordion-seo-outer';
  outerDetails.append(outerSummary, introContent, nestedContainer);

  // Clear block and append
  block.textContent = '';
  block.append(outerDetails);
}
