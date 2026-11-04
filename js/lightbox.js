/* Picture popup for the Products page: plain JavaScript and the built-in <dialog> element.
   Click a picture to open it large; use the buttons, the arrow keys, Esc or a click outside.
   Without <dialog> support (very old browsers) the links just open the picture normally. */
(function () {
	if (typeof HTMLDialogElement !== 'function') { return; }

	var GALLERIES = '#gallery, #gallery1, #gallery2';
	var dialog, image, caption, counter, prevBtn, nextBtn;
	var group = [];
	var index = 0;

	function build() {
		dialog = document.createElement('dialog');
		dialog.className = 'lightbox';
		dialog.setAttribute('aria-label', 'Product picture');
		dialog.innerHTML =
			'<button type="button" class="lightbox-close" aria-label="Close">&times;</button>' +
			'<button type="button" class="lightbox-prev" aria-label="Previous picture">&#8249;</button>' +
			'<figure class="lightbox-figure">' +
				'<img class="lightbox-image" alt="" />' +
				'<figcaption class="lightbox-caption"><span class="lightbox-title"></span> <span class="lightbox-count"></span></figcaption>' +
			'</figure>' +
			'<button type="button" class="lightbox-next" aria-label="Next picture">&#8250;</button>';
		document.body.appendChild(dialog);

		image = dialog.querySelector('.lightbox-image');
		caption = dialog.querySelector('.lightbox-title');
		counter = dialog.querySelector('.lightbox-count');
		prevBtn = dialog.querySelector('.lightbox-prev');
		nextBtn = dialog.querySelector('.lightbox-next');

		dialog.querySelector('.lightbox-close').addEventListener('click', function () { dialog.close(); });
		prevBtn.addEventListener('click', function () { show(index - 1); });
		nextBtn.addEventListener('click', function () { show(index + 1); });
		dialog.addEventListener('click', function (e) { if (e.target === dialog) { dialog.close(); } });
		dialog.addEventListener('keydown', function (e) {
			if (e.key === 'ArrowLeft') { show(index - 1); }
			else if (e.key === 'ArrowRight') { show(index + 1); }
		});
	}

	function preload(i) {
		if (group[i]) { new Image().src = group[i].href; }
	}

	function show(i) {
		if (i < 0 || i >= group.length) { return; }
		index = i;
		var link = group[i];
		image.src = link.href;
		image.alt = link.getAttribute('title') || '';
		caption.textContent = link.getAttribute('title') || '';
		counter.textContent = group.length > 1 ? '(' + (i + 1) + ' / ' + group.length + ')' : '';
		prevBtn.hidden = (i === 0);
		nextBtn.hidden = (i === group.length - 1);
		preload(i - 1);
		preload(i + 1);
	}

	document.addEventListener('click', function (e) {
		var link = e.target.closest ? e.target.closest(GALLERIES.replace(/, /g, ' a, ') + ' a') : null;
		if (!link || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) { return; }
		var container = link.closest(GALLERIES);
		if (!container) { return; }
		e.preventDefault();
		if (!dialog) { build(); }
		group = Array.prototype.slice.call(container.querySelectorAll('a[href]'));
		show(group.indexOf(link));
		dialog.showModal();
	});
}());
