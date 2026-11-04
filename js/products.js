(function () {
	var cards = document.querySelectorAll('.category-card');
	var sections = document.querySelectorAll('.product-section');
	if (!cards.length || !sections.length) { return; }

	function show(id) {
		var i;
		for (i = 0; i < cards.length; i++) {
			var on = cards[i].getAttribute('data-target') === id;
			cards[i].classList.toggle('active', on);
			cards[i].setAttribute('aria-expanded', on ? 'true' : 'false');
			cards[i].querySelector('.category-link').innerHTML = on ? 'Hide products &uarr;' : 'View products &rarr;';
		}
		for (i = 0; i < sections.length; i++) {
			sections[i].hidden = sections[i].id !== id;
		}
	}

	for (var i = 0; i < cards.length; i++) {
		cards[i].addEventListener('click', function (e) {
			e.preventDefault();
			var id = this.getAttribute('data-target');
			show(this.classList.contains('active') ? null : id);
		});
	}

	var start = window.location.hash.replace('#', '');
	show(document.getElementById(start) ? start : 'automotive');
}());
