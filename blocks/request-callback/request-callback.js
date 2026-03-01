/**
 * Request a Callback - sticky side tab with slide-in form panel.
 * Loaded globally via delayed.js (not a content block).
 */

function createPhoneIcon() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', '16');
  svg.setAttribute('height', '16');
  svg.innerHTML = '<path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z" fill="white"/>';
  return svg;
}

function buildForm() {
  const panel = document.createElement('div');
  panel.className = 'request-callback-panel';

  panel.innerHTML = `
    <div class="request-callback-panel-content">
      <h2>Request a Callback</h2>
      <button class="request-callback-close" aria-label="Close">&times;</button>
      <form class="request-callback-form">
        <div class="request-callback-field">
          <label>Name *</label>
          <input type="text" placeholder="Enter your name" required maxlength="50">
        </div>
        <div class="request-callback-field">
          <label>Mobile *</label>
          <input type="tel" placeholder="Enter your mobile no" required maxlength="10">
        </div>
        <div class="request-callback-field">
          <label>Email *</label>
          <input type="email" placeholder="Enter your email" required>
        </div>
        <div class="request-callback-checkbox">
          <input type="checkbox" id="rc-whatsapp" checked>
          <p>Get updates on Call, SMS and WhatsApp</p>
        </div>
        <div class="request-callback-vehicle-type">
          <label>Vehicle Type</label>
          <div class="request-callback-vehicle-tabs">
            <div class="request-callback-vehicle-tab active" data-type="Car">
              <svg class="rc-icon rc-icon-normal" viewBox="0 0 51 22" width="51" height="22"><path d="M44.5 8.5h-4l-5-6h-18l-5 6h-6a4 4 0 0 0-4 4v4h2a4 4 0 0 0 8 0h18a4 4 0 0 0 8 0h2v-4a4 4 0 0 0-4-4zM8.5 18.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm30 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
              <svg class="rc-icon rc-icon-active" viewBox="0 0 51 22" width="51" height="22"><path d="M44.5 8.5h-4l-5-6h-18l-5 6h-6a4 4 0 0 0-4 4v4h2a4 4 0 0 0 8 0h18a4 4 0 0 0 8 0h2v-4a4 4 0 0 0-4-4zM8.5 18.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm30 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="none" stroke="#f5822d" stroke-width="1.5"/></svg>
              <span>Car/SUV</span>
            </div>
            <div class="request-callback-vehicle-tab" data-type="Bike">
              <svg class="rc-icon rc-icon-normal" viewBox="0 0 51 22" width="51" height="22"><circle cx="10" cy="16" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="40" cy="16" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 16l8-10h8l4 6h10M22 6l4 10" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
              <svg class="rc-icon rc-icon-active" viewBox="0 0 51 22" width="51" height="22"><circle cx="10" cy="16" r="5" fill="none" stroke="#f5822d" stroke-width="1.5"/><circle cx="40" cy="16" r="5" fill="none" stroke="#f5822d" stroke-width="1.5"/><path d="M10 16l8-10h8l4 6h10M22 6l4 10" fill="none" stroke="#f5822d" stroke-width="1.5"/></svg>
              <span>Bike</span>
            </div>
            <div class="request-callback-vehicle-tab" data-type="Scooter">
              <svg class="rc-icon rc-icon-normal" viewBox="0 0 51 22" width="51" height="22"><circle cx="10" cy="16" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="40" cy="16" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 16h-2l4-12h10v4h12l6 8" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
              <svg class="rc-icon rc-icon-active" viewBox="0 0 51 22" width="51" height="22"><circle cx="10" cy="16" r="5" fill="none" stroke="#f5822d" stroke-width="1.5"/><circle cx="40" cy="16" r="5" fill="none" stroke="#f5822d" stroke-width="1.5"/><path d="M10 16h-2l4-12h10v4h12l6 8" fill="none" stroke="#f5822d" stroke-width="1.5"/></svg>
              <span>Scooter</span>
            </div>
          </div>
        </div>
        <div class="request-callback-field">
          <label>Vehicle Make &amp; Model</label>
          <input type="text" placeholder="Search">
        </div>
        <div class="request-callback-field">
          <label>PIN Code</label>
          <input type="text" placeholder="Enter PIN Code" maxlength="6">
        </div>
        <button type="submit" class="request-callback-submit">Submit</button>
        <p class="request-callback-terms">By clicking on Submit, you agree to our <a href="/terms-condition.html">Terms &amp; Conditions</a> and <a href="/privacy-policy.html">Privacy Policy</a></p>
      </form>
    </div>
  `;

  return panel;
}

export default function initRequestCallback() {
  // Build sticky tab
  const tab = document.createElement('div');
  tab.className = 'request-callback-tab';
  const tabInner = document.createElement('div');
  tabInner.className = 'request-callback-tab-inner';
  tabInner.append(createPhoneIcon());
  const tabText = document.createElement('span');
  tabText.textContent = 'Request a callback';
  tabInner.append(tabText);
  tab.append(tabInner);

  // Build overlay
  const overlay = document.createElement('div');
  overlay.className = 'request-callback-overlay';

  // Build form panel
  const panel = buildForm();

  // Append to body
  document.body.append(tab, overlay, panel);

  // Open panel
  function openPanel() {
    panel.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Close panel
  function closePanel() {
    panel.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Event listeners
  tab.addEventListener('click', openPanel);
  overlay.addEventListener('click', closePanel);
  panel.querySelector('.request-callback-close').addEventListener('click', closePanel);

  // Vehicle type tabs
  panel.querySelectorAll('.request-callback-vehicle-tab').forEach((vTab) => {
    vTab.addEventListener('click', () => {
      panel.querySelectorAll('.request-callback-vehicle-tab').forEach((t) => t.classList.remove('active'));
      vTab.classList.add('active');
    });
  });

  // Form submit
  panel.querySelector('.request-callback-form').addEventListener('submit', (e) => {
    e.preventDefault();
    closePanel();
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePanel();
  });

  // Auto-open panel on page load
  openPanel();
}
