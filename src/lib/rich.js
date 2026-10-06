import { url } from './url.js';

/** @param {string} text @param {string} [tag] */
export function rich(text, tag = 'mark') {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => `<a href="${url(href)}">${label}</a>`)
		.replace(/\*([^*]+)\*/g, `<${tag}>$1</${tag}>`);
}
