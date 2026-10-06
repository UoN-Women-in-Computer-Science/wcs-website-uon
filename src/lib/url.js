import { resolve } from '$app/paths';

// Paths in src/lib/content/ are written from the site root ("/gallery/pizza.jpg", "/#events").
// On GitHub Pages the site lives in a subfolder (/wcs-website-uon/), so add that in front.
// Full links (https://, mailto:) are left alone.
/** @param {string} path */
export function url(path) {
	if (path.startsWith('/') && !path.startsWith('//')) {
		return resolve(/** @type {any} */ (path.slice(1)));
	}
	return path;
}
