/* Scroll-reveal: opt-in via html[data-js]; watches for [data-reveal] added while streaming. */
(function () {
  if (window.__revealInit) return;
  window.__revealInit = true;
  var root = document.documentElement;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  root.setAttribute('data-js', '');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.setAttribute('data-in', ''); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.04 });
  var seen = new WeakSet();
  function scan() {
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      if (seen.has(el)) return;
      seen.add(el);
      io.observe(el);
    });
  }
  scan();
  new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('load', scan);
})();
