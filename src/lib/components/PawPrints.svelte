<script>
	// Clicking on the page (not on a link or button) leaves a magenta paw print that fades away.
	import { gsap } from 'gsap';

	$effect(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		/** @param {PointerEvent} e */
		function stamp(e) {
			if (!(e.target instanceof Element) || e.target.closest('a, button, input, textarea, .sticker')) return;

			const print = document.createElement('span');
			print.className = 'paw-print';
			print.style.left = `${e.pageX - 11}px`;
			print.style.top = `${e.pageY - 11}px`;
			document.body.append(print);

			gsap.fromTo(
				print,
				{ scale: 1.6, rotate: gsap.utils.random(-30, 30), autoAlpha: 0 },
				{ scale: 1, autoAlpha: 0.55, duration: 0.2, ease: 'back.out(2)' }
			);
			gsap.to(print, { autoAlpha: 0, duration: 0.8, delay: 1.2, onComplete: () => print.remove() });
		}

		document.addEventListener('pointerdown', stamp);
		return () => document.removeEventListener('pointerdown', stamp);
	});
</script>

<style>
	:global(.paw-print) {
		position: absolute;
		z-index: 40;
		width: 22px;
		height: 22px;
		pointer-events: none;
		background: url('/cursors/paw-pink.svg') center / contain no-repeat;
	}
</style>
