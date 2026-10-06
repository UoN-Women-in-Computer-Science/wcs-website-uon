<script>
	// Two seat maps side by side: a typical CS lecture (about 1 in 5 seats pink) and a WCS social (all pink).
	// Words come from `why` in content/site.js.
	import SectionHead from '../SectionHead.svelte';
	import { why } from '#lib/content/site.js';

	const SEATS = 50;
	// Which seats are taken by women in the lecture. Scattered by hand so it doesn't look like a pattern.
	const lecture = new Set([3, 8, 14, 21, 27, 30, 36, 41, 45, 49]);
</script>

<section id="why">
	<SectionHead title={why.title} subtitle={why.subtitle} />

	<div class="why">
		<figure class="hall">
			<figcaption>{why.lectureLabel}</figcaption>
			<div class="seats" role="img" aria-label="50 seats, 10 of them pink">
				{#each { length: SEATS }, i (i)}
					<span class="seat" class:w={lecture.has(i)}></span>
				{/each}
			</div>
		</figure>

		<figure class="hall">
			<figcaption>{why.wcsLabel}</figcaption>
			<div class="seats" role="img" aria-label="50 seats, all pink">
				{#each { length: SEATS }, i (i)}
					<span class="seat w"></span>
				{/each}
			</div>
		</figure>

		<div class="text">
			<p>{why.text}</p>
		</div>
	</div>
</section>

<style>
	.why {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 28px 48px;
		align-items: start;
	}
	.hall {
		display: grid;
		gap: 10px;
		margin: 0;
	}
	figcaption {
		font: 600 var(--s-1) / 1.3 var(--f-mono);
		color: var(--muted);
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}
	.seats {
		display: grid;
		grid-template-columns: repeat(10, minmax(0, 1fr));
		gap: 6px;
		max-width: 360px;
	}
	.seat {
		aspect-ratio: 1;
		border: 2px solid var(--ink);
		border-radius: 6px 6px 3px 3px;
		background: var(--card);
	}
	.seat.w {
		background: var(--magenta);
	}
	/* Centred against the seat maps, instead of hanging off the top next to the labels. */
	.text {
		display: grid;
		gap: 12px;
		align-self: center;
	}
	.text p {
		margin: 0;
		max-width: 44ch;
	}
</style>
