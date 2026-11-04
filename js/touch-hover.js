/* Touch screens: a tap shows the same effect as hovering for a moment.
   The styles treat the ".tap" class like ":hover". */
(function () {
	var tapped = [];
	var timer = null;

	function clearTaps() {
		for (var i = 0; i < tapped.length; i++) { tapped[i].classList.remove('tap'); }
		tapped = [];
	}

	document.addEventListener('touchstart', function (e) {
		clearTaps();
		clearTimeout(timer);
		var el = e.target.nodeType === 1 ? e.target : e.target.parentElement;
		while (el && el !== document.documentElement) {
			el.classList.add('tap');
			tapped.push(el);
			el = el.parentElement;
		}
		timer = setTimeout(clearTaps, 700);
	}, { passive: true });

	document.addEventListener('touchcancel', clearTaps, { passive: true });
}());
