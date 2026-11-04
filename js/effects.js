/* Scroll-reveal: cards and boxes fade up as they come into view.
   Nothing is hidden unless this script runs, and it does nothing if the visitor prefers reduced motion. */
(function () {
	if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { return; }
	if (!('IntersectionObserver' in window)) { return; }

	var selector = '.page-title, .process-hero, .products-intro, .stat-card, .category-card, .spec-card, ' +
		'.contact-card, .contact-map, .recognition-title, .recognition-card, .client-card, .footer-col';
	var items = document.querySelectorAll(selector);
	if (!items.length) { return; }

	var observer = new IntersectionObserver(function (entries) {
		entries.forEach(function (entry) {
			if (entry.isIntersecting) {
				entry.target.classList.add('revealed');
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.05, rootMargin: '0px 0px -10px 0px' });

	Array.prototype.forEach.call(items, function (el) {
		el.classList.add('reveal');
		observer.observe(el);
	});
}());
