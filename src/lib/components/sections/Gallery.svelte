<script>
	// Photos from past events, newest first, from content/gallery.json.
	// Shows 4 at a time (2 on tablets, 1 on phones). The arrows slide a whole page; swiping works too.
	import SectionHead from '../SectionHead.svelte';
	import Polaroid from '../Polaroid.svelte';
	import photos from '#lib/content/gallery.json';
	import { gallery } from '#lib/content/site.js';

	const newestFirst = [...photos].sort((a, b) => b.date.localeCompare(a.date));

	/** @type {HTMLElement | undefined} */
	let track = $state();
	let atStart = $state(true);
	let atEnd = $state(false);

	// Called on scroll and on resize, so the arrows grey out at either end.
	function update() {
		if (!track) return;
		atStart = track.scrollLeft <= 1;
		atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
	}

	/** @param {1 | -1} direction */
	function slide(direction) {
		const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
		track?.scrollBy({ left: direction * track.clientWidth, behavior: reduced ? 'auto' : 'smooth' });
	}

	$effect(() => {
		update();
	});
</script>

<svelte:window onresize={update} />

<section id="gallery">
	<SectionHead title={gallery.title} subtitle={gallery.subtitle} />

	<div class="slider">
		<div class="track" bind:this={track} onscroll={update}>
			{#each newestFirst as photo, index (photo.photo)}
				<div class="slide">
					<Polaroid {photo} {index} />
				</div>
			{/each}
		</div>

		{#if !(atStart && atEnd)}
			<div class="arrows">
				<button onclick={() => slide(-1)} disabled={atStart} aria-label="Previous photos">←</button>
				<button onclick={() => slide(1)} disabled={atEnd} aria-label="More photos">→</button>
			</div>
		{/if}
	</div>
</section>

<style>
	.slider {
		--per: 4;
		--gap: 32px;
	}
	@media (max-width: 960px) {
		.slider {
			--per: 2;
		}
	}
	@media (max-width: 480px) {
		.slider {
			--per: 1;
		}
	}

	/* Padding gives the tape and tilt room, since a scrolling box clips anything outside it. */
	.track {
		display: flex;
		gap: var(--gap);
		padding: 24px 12px 28px;
		margin: 0 -12px;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scroll-padding-inline: 12px;
		scrollbar-width: none;
	}
	.track::-webkit-scrollbar {
		display: none;
	}

	.slide {
		flex: 0 0 calc((100% - (var(--per) - 1) * var(--gap)) / var(--per));
		scroll-snap-align: start;
	}

	.arrows {
		display: flex;
		justify-content: flex-end;
		gap: 12px;
	}
	button {
		display: grid;
		place-items: center;
		width: 48px;
		height: 48px;
		border: 2px solid var(--ink);
		border-radius: 50%;
		background: var(--card);
		color: var(--ink);
		font-size: 1.4rem;
		cursor: pointer;
		transition:
			background 0.15s ease,
			transform 0.15s ease;
	}
	button:hover:not(:disabled) {
		background: var(--postit);
		transform: translateY(-2px);
	}
	button:disabled {
		opacity: 0.3;
		cursor: default;
	}
	button:focus-visible {
		outline: 3px solid var(--magenta);
		outline-offset: 3px;
	}
</style>
