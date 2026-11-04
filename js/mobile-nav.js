(function () {
	var body = document.body;
	var toggle = document.getElementById('menuToggle');
	var close = document.getElementById('menuClose');
	var overlay = document.getElementById('mobileNavOverlay');
	var nav = document.getElementById('mobileNav');
	if (!toggle || !nav) { return; }

	function setOpen(open) {
		body.classList.toggle('nav-open', open);
		toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
	}

	toggle.addEventListener('click', function () { setOpen(true); });
	close.addEventListener('click', function () { setOpen(false); });
	overlay.addEventListener('click', function () { setOpen(false); });
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape') { setOpen(false); }
	});
	window.addEventListener('resize', function () {
		if (window.innerWidth > 900) { setOpen(false); }
	});
}());
