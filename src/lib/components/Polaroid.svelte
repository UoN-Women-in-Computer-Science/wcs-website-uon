<script>
	/** @type {{ photo: { photo: string, alt: string, caption: string, date: string }, index?: number }} */
	import { url } from '#lib/url.js';

	let { photo, index = 0 } = $props();

	// The tilt comes from the photo's position, not Math.random(), so the server and the browser agree on it.
	const tilts = [-3, 2, -1.5, 3.5, -2.5, 1];
	const tilt = $derived(tilts[index % tilts.length]);

	// "2026-10-01" -> "1 oct 2026"
	const when = $derived(
		new Date(photo.date + 'T00:00:00')
			.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
			.toLowerCase()
	);
</script>

<figure class="polaroid" style:--tilt="{tilt}deg">
	<span class="tape" aria-hidden="true"></span>
	<img src={url(photo.photo)} alt={photo.alt} loading="lazy" />
	<figcaption>
		<span class="caption">{photo.caption}</span>
		<time datetime={photo.date}>{when}</time>
	</figcaption>
</figure>

<style>
	.polaroid {
		position: relative;
		margin: 0;
		padding: 12px 12px 0;
		background: #fff;
		box-shadow:
			0 1px 2px rgb(31 33 64 / 0.15),
			0 8px 20px rgb(31 33 64 / 0.12);
		transform: rotate(var(--tilt));
	}

	/* A strip of masking tape holding it to the page. */
	.tape {
		position: absolute;
		top: -12px;
		left: 50%;
		width: 90px;
		height: 26px;
		background: rgb(255 232 106 / 0.75);
		transform: translateX(-50%) rotate(calc(var(--tilt) * -1.5));
		box-shadow: 0 1px 2px rgb(31 33 64 / 0.1);
	}

	img {
		display: block;
		width: 100%;
		aspect-ratio: 1;
		object-fit: cover;
		background: var(--paper);
	}

	/* The thick bottom edge is what makes it read as a polaroid. */
	figcaption {
		display: grid;
		justify-items: center;
		gap: 2px;
		padding: 12px 4px 18px;
		font-family: var(--f-hand);
		color: var(--ink);
		text-align: center;
	}
	.caption {
		font-size: 1.7rem;
		line-height: 1;
	}
	time {
		font-size: 1.2rem;
		color: var(--muted);
	}
</style>
