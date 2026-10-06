<script>
	// Ada, the society cat. She runs along the bottom of the screen every so often, stops to sit,
	// wash or nap, then runs off. Click her to pet her; click too much and she gets scared.
	//
	// Sprite: "2D Pixel Art Cat Sprites" by Elthen. The sheet is a grid of 32px frames,
	// one animation per row, played left to right.
	import { gsap } from 'gsap';
	import { cat as text } from '#lib/content/site.js';

	// The sprite sheet lives in src/lib/assets/cat/. import.meta.glob returns nothing if the file
	// isn't there, so deleting it is safe: the site still builds and Ada just stays home.
	const found = import.meta.glob('../assets/cat/elthen-cat.png', {
		eager: true,
		query: '?url',
		import: 'default'
	});
	const sprite = /** @type {string | undefined} */ (Object.values(found)[0]);

	const FRAME = 32; // px in the sheet
	const SCALE = 4; // drawn 4x bigger, still crisp because of image-rendering: pixelated
	const COLS = 8;

	/** @type {Record<string, { row: number, frames: number, fps: number, once?: boolean }>} */
	const ANIMS = {
		idle: { row: 0, frames: 4, fps: 6 },
		clean: { row: 2, frames: 4, fps: 6 },
		run: { row: 4, frames: 8, fps: 14 },
		sleep: { row: 6, frames: 4, fps: 3 },
		paw: { row: 7, frames: 6, fps: 10, once: true },
		jump: { row: 8, frames: 7, fps: 12, once: true },
		scared: { row: 9, frames: 8, fps: 12, once: true }
	};

	const lines = text.lines;

	/** @type {HTMLButtonElement | undefined} */
	let cat = $state();
	/** @type {HTMLSpanElement | undefined} */
	let bubble = $state();

	let anim = $state('idle');
	let frame = $state(0);
	let facingLeft = $state(false);
	let bubbleMax = $state(220); // px, shrunk to fit the empty margin she's sitting in
	let rest = 'idle'; // what to go back to after a one-off animation like a jump
	let running = false;
	/** @type {number[]} */
	let recentPets = [];

	const current = $derived(ANIMS[anim]);
	const offset = FRAME * SCALE;

	// Frame clock: restarts whenever the animation changes.
	$effect(() => {
		if (!sprite) return;
		const a = ANIMS[anim];
		frame = 0;
		const id = setInterval(() => {
			if (frame + 1 < a.frames) frame++;
			else if (a.once) anim = rest;
			else frame = 0;
		}, 1000 / a.fps);
		return () => clearInterval(id);
	});

	/** @param {string} name */
	function loop(name) {
		rest = name;
		anim = name;
	}

	/** @param {string} [text] @param {number} [hold] */
	function say(text, hold = 2.2) {
		if (!bubble) return;
		bubble.textContent = text ?? lines[Math.floor(Math.random() * lines.length)];
		gsap.killTweensOf(bubble);
		gsap.fromTo(bubble, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.25, ease: 'back.out(2)' });
		gsap.to(bubble, { autoAlpha: 0, duration: 0.3, delay: hold });
	}

	function pet() {
		bubbleMax = 220;
		const now = Date.now();
		recentPets = [...recentPets.filter((t) => now - t < 1500), now];

		if (recentPets.length >= 4) {
			recentPets = [];
			say(text.tooManyPets);
			if (!running) anim = 'scared';
			return;
		}
		say();
		if (!running) anim = Math.random() > 0.5 ? 'paw' : 'jump';
	}

	// Wandering needs the real window size, so it starts in an effect (browser only).
	$effect(() => {
		const ada = cat;
		if (!sprite || !ada) return;

		// With reduced motion, Ada just sits in the corner. You can still pet her.
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			gsap.set(ada, { x: 12 });
			return;
		}

		const ctx = gsap.context(() => {
			const speed = 120; // px per second
			const wander = () => {
				const width = innerWidth;
				const ltr = Math.random() > 0.5;
				const from = ltr ? -140 : width + 20;
				const to = ltr ? width + 20 : -140;

				// She stops in the empty margin beside the content, so she and her bubble never cover text.
				// The button is 80px wide, so "- 40" puts her middle in the middle of the margin.
				// If the margins are too thin for her (phones, small laptops), she runs straight across.
				const content = document.querySelector('.wrap')?.getBoundingClientRect();
				const left = content ? content.left : 0;
				const right = content ? document.documentElement.clientWidth - content.right : 0;
				const margins = [
					{ space: left, middle: left / 2 },
					{ space: right, middle: width - right / 2 }
				].filter((m) => m.space >= 100);
				const spot = margins.length ? gsap.utils.random(margins) : null;
				const stop = spot ? spot.middle - 40 : null;

				// What she does when she stops: sit and chat, have a wash, or nap.
				const pause = gsap.utils.random([
					{ anim: 'idle', secs: 3, line: undefined },
					{ anim: 'clean', secs: 3.5, line: text.cleaning },
					{ anim: 'sleep', secs: 6, line: text.sleeping }
				]);

				const tl = gsap
					.timeline({ onComplete: () => gsap.delayedCall(gsap.utils.random(6, 12), wander) })
					.set(ada, { x: from })
					.call(() => {
						facingLeft = !ltr;
						running = true;
						loop('run');
					});

				if (spot && stop !== null) {
					tl.to(ada, { x: stop, duration: Math.abs(stop - from) / speed, ease: 'none' })
						.call(() => {
							running = false;
							bubbleMax = spot.space - 12;
							loop(pause.anim);
							say(pause.line, pause.secs - 0.8);
						})
						.to({}, { duration: pause.secs })
						.call(() => {
							running = true;
							loop('run');
						})
						.to(ada, { x: to, duration: Math.abs(to - stop) / (speed * 1.1), ease: 'power1.in' });
				} else {
					tl.to(ada, { x: to, duration: Math.abs(to - from) / speed, ease: 'none' });
				}

				tl.call(() => {
					running = false;
					loop('idle');
				});
			};
			gsap.delayedCall(2.5, wander);
		});

		return () => ctx.revert();
	});
</script>

{#if sprite}
<button
	bind:this={cat}
	class="cat"
	type="button"
	aria-label="Ada the society cat. Click to pet her."
	onclick={pet}
>
	<span bind:this={bubble} class="bubble" style:max-width="{bubbleMax}px"></span>
	<span
		class="sprite"
		class:flip={facingLeft}
		style:width="{offset}px"
		style:height="{offset}px"
		style:margin-left="{-offset / 2}px"
		style:background-size="{COLS * offset}px auto"
		style:background-image="url({sprite})"
		style:background-position="{-frame * offset}px {-current.row * offset}px"
		aria-hidden="true"
	></span>
</button>
{/if}

<style>
	/* The button is only as big as the cat's body, so clicking the empty air above her does nothing. */
	.cat {
		position: fixed;
		left: 0;
		bottom: calc(10px + env(safe-area-inset-bottom, 0px));
		z-index: 60;
		width: 80px;
		height: 52px;
		padding: 0;
		border: 0;
		background: none;
		transform: translateX(-140px);
	}

	.sprite {
		position: absolute;
		left: 50%;
		bottom: 0;
		background-repeat: no-repeat;
		image-rendering: pixelated;
		pointer-events: none;
	}
	.sprite.flip {
		transform: scaleX(-1);
	}

	.bubble {
		position: absolute;
		bottom: 60px;
		left: 50%;
		padding: 4px 10px;
		transform: translateX(-50%);
		border: 2px solid var(--ink);
		border-radius: 14px;
		background: var(--card);
		color: var(--ink);
		font: 1.35rem / 1 var(--f-hand);
		width: max-content;
		text-align: center;
		opacity: 0;
		pointer-events: none;
	}
</style>
