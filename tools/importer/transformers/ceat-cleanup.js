/* eslint-disable */
/* global WebImporter */

/**
 * Transformer for CEAT website cleanup
 * Purpose: Remove non-content elements and site-wide widgets
 * Applies to: www.ceat.com (all templates)
 * Tested: / (homepage)
 * Generated: 2026-03-01
 *
 * SELECTORS EXTRACTED FROM:
 * - Captured DOM during migration workflow (cleaned.html)
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform',
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove overlay and loader elements
    // EXTRACTED: Found <div class="overlay" id="overlay"> in captured DOM (line 77)
    // EXTRACTED: Found <div class="loader loaderv1 hide"> and <div class="loader loaderv2 hide"> (lines 81, 85)
    WebImporter.DOMUtils.remove(element, [
      '#overlay',
      '.loader.loaderv1',
      '.loader.loaderv2',
    ]);

    // Remove chatbot popup and AI assistant elements
    // EXTRACTED: Found <div class="chatbot-popup" id="chatbot-popup"> (line 3033)
    // EXTRACTED: Found <div id="modalBackdropAi" class="ceat-app-container"> (line 3045)
    // EXTRACTED: Found <div id="modalBackdrop"> (line 3044)
    WebImporter.DOMUtils.remove(element, [
      '#chatbot-popup',
      '#chatbot-popup-mobile',
      '#modalBackdrop',
      '#modalBackdropAi',
    ]);

    // Remove header and navigation (handled by dedicated EDS header)
    // EXTRACTED: Found <div class="header aem-GridColumn"> containing <header> (line 98)
    // EXTRACTED: Found <div class="cp-header" id="cp-header"> (line 100)
    // EXTRACTED: Found <div class="menu-overlay"> (line 937)
    WebImporter.DOMUtils.remove(element, [
      'header',
      '.menu-overlay',
    ]);

    // Remove footer (handled by dedicated EDS footer)
    // EXTRACTED: Found <div class="footer aem-GridColumn"> containing <footer> (line 5094)
    WebImporter.DOMUtils.remove(element, [
      'footer',
    ]);

    // Remove CEAT event tracking container
    // EXTRACTED: Found <div id="CEAT_EVENT"> (line 79)
    WebImporter.DOMUtils.remove(element, [
      '#CEAT_EVENT',
    ]);

    // Remove video popup modals (content is in carousel slides)
    // EXTRACTED: Found <div class="video-popup"> with modal structure (lines 3130, 3251)
    // EXTRACTED: Found <div class="bs-modal modal new-popup fade" id="video09"> (line 3252)
    WebImporter.DOMUtils.remove(element, [
      '.video-popup',
      '.bs-modal.modal',
    ]);

    // Re-enable scrolling if blocked by modals
    if (element.style && element.style.overflow === 'hidden') {
      element.setAttribute('style', 'overflow: scroll;');
    }
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove remaining non-content elements
    // Standard HTML elements safe to remove after parsing
    WebImporter.DOMUtils.remove(element, [
      'iframe',
      'link',
      'noscript',
      'source',
    ]);

    // Clean up tracking and event attributes
    // EXTRACTED: DOM contains onclick, data-track, data-analytics attributes on many elements
    const allElements = element.querySelectorAll('*');
    allElements.forEach((el) => {
      el.removeAttribute('onclick');
      el.removeAttribute('data-track');
      el.removeAttribute('data-analytics');
      el.removeAttribute('data-sly-test');
      el.removeAttribute('data-sly-use');
    });
  }
}
