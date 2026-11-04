/* Shared site header: logo, desktop menu, phone header and phone menu card.
   Edit it here and it changes on every page. The current page is marked automatically. */
(function () {
	var pages = [
		['index.html', 'Home'],
		['about_us.html', 'About us'],
		['process.html', 'Process'],
		['quality.html', 'Quality'],
		['product.html', 'Products'],
		['machinery.html', 'Machinery'],
		['clients.html', 'Clients'],
		['contact.html', 'Contact us']
	];
	var current = window.location.pathname.split('/').pop() || 'index.html';

	function links(desktop) {
		var out = '';
		for (var i = 0; i < pages.length; i++) {
			var here = pages[i][0] === current;
			var attrs = here ? (desktop ? ' class="active" aria-current="page"' : ' class="active"') : '';
			out += '\t\t\t<li><a href="' + pages[i][0] + '"' + attrs + '>' + pages[i][1] + '</a></li>\n';
		}
		return out;
	}

	var logo = '<img src="images/logo-transparent.png" width="376" height="88" alt="Metform Engineers" />';

	document.write(
		'<div class="mobile-header">\n' +
		'\t<a class="mobile-logo" href="index.html">' + logo + '</a>\n' +
		'\t<button type="button" class="menu-toggle" id="menuToggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobileNav"><span></span><span></span><span></span></button>\n' +
		'</div>\n' +
		'<div class="mobile-nav-overlay" id="mobileNavOverlay"></div>\n' +
		'<nav class="mobile-nav" id="mobileNav" aria-label="Main menu">\n' +
		'\t<div class="mobile-nav-top">\n' +
		'\t\t<a class="mobile-logo" href="index.html">' + logo + '</a>\n' +
		'\t\t<button type="button" class="menu-close" id="menuClose" aria-label="Close menu">&times;</button>\n' +
		'\t</div>\n' +
		'\t<ul>\n' + links(false) + '\t</ul>\n' +
		'</nav>\n' +
		'<div class="header"></div>\n' +
		'<div class="menu">\n' +
		'\t<ul class="main-nav">\n' + links(true) + '\t</ul>\n' +
		'</div>\n'
	);
}());
