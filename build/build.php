<?php
/* Builds the shared header and footer into every page.
   Edit build/header.html or build/footer.html, then run:  php build/build.php
   (XAMPP: C:\xampp\php\php.exe build\build.php)
   Each page keeps the result between its <!-- header:start/end --> and <!-- footer:start/end --> markers. */

$root = dirname(__DIR__);
$pages = [
	'index.html' => 'Home',
	'about_us.html' => 'About us',
	'process.html' => 'Process',
	'quality.html' => 'Quality',
	'product.html' => 'Products',
	'machinery.html' => 'Machinery',
	'clients.html' => 'Clients',
	'contact.html' => 'Contact us',
];

function links($pages, $current, $desktop) {
	$out = '';
	foreach ($pages as $file => $label) {
		$attrs = '';
		if ($file === $current) {
			$attrs = $desktop ? ' class="active" aria-current="page"' : ' class="active"';
		}
		$out .= "\t\t<li><a href=\"$file\"$attrs>$label</a></li>\n";
	}
	return $out;
}

function put($html, $name, $block, $oldScript) {
	$wrapped = "<!-- $name:start -->\n" . rtrim($block) . "\n<!-- $name:end -->";
	$marked = '~<!-- ' . $name . ':start -->.*?<!-- ' . $name . ':end -->~s';
	if (preg_match($marked, $html)) {
		return preg_replace_callback($marked, function () use ($wrapped) { return $wrapped; }, $html, 1);
	}
	return str_replace($oldScript, $wrapped, $html);
}

$headerTpl = file_get_contents(__DIR__ . '/header.html');
$footerTpl = file_get_contents(__DIR__ . '/footer.html');

$targets = array_merge(array_keys($pages), ['404.html']);  // 404 page has the header and footer but no menu entry
foreach ($targets as $file) {
	$path = "$root/$file";
	$html = file_get_contents($path);
	$header = strtr($headerTpl, [
		'{{mobile_links}}' => links($pages, $file, false),
		'{{desktop_links}}' => links($pages, $file, true),
	]);
	$footer = strtr($footerTpl, ['{{year}}' => date('Y')]);
	$html = put($html, 'header', $header, '<script src="js/header.js"></script>');
	$html = put($html, 'footer', $footer, '<script src="js/footer.js"></script>');
	file_put_contents($path, $html);
	echo "$file built\n";
}
