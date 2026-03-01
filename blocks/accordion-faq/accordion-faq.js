export default function decorate(block) {
  /* Wrap the first word of the section heading with an orange underline */
  const container = block.closest('.accordion-faq-container');
  if (container) {
    const h2 = container.querySelector('h2');
    if (h2 && h2.childNodes.length) {
      const text = h2.textContent;
      const spaceIdx = text.indexOf(' ');
      if (spaceIdx > 0) {
        const first = text.substring(0, spaceIdx);
        const rest = text.substring(spaceIdx);
        h2.innerHTML = `<span class="accordion-faq-highlight">${first}</span>${rest}`;
      }
    }
  }

  [...block.children].forEach((row) => {
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'accordion-faq-item-label';
    summary.append(...label.childNodes);
    const body = row.children[1];
    body.className = 'accordion-faq-item-body';
    const details = document.createElement('details');
    details.className = 'accordion-faq-item';
    details.append(summary, body);
    row.replaceWith(details);
  });
}
