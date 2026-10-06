<script>
	// A post-it with the intro and join button on the left, sticker board on the right.
	// Words come from `hero` in content/site.js.
	import StickerBoard from '../StickerBoard.svelte';
	import { hero } from '#lib/content/site.js';
	import { rich } from '#lib/rich.js';
	import { url } from '#lib/url.js';
</script>

<header class="hero" id="top">
	<div class="intro">
		<!-- the handwritten line at the top of the post-it is the page's main heading -->
		<div class="postit">
			<span class="tape" aria-hidden="true"></span>
			<h1 class="hand">{hero.title}</h1>
			<p class="text">{@html rich(hero.text)}</p>
		</div>
		<div class="ctas">
			<a class="button" href={url(hero.button.href)}>{hero.button.label}</a>
			{#if hero.secondLink}
				<a class="second" href={url(hero.secondLink.href)}>{hero.secondLink.label}</a>
			{/if}
		</div>
	</div>

	<StickerBoard />
</header>

<style>
	.hero {
		display: grid;
		grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
		gap: 32px;
		align-items: center;
		padding-block: 28px 40px;
	}
	.intro {
		display: grid;
		justify-items: start;
		gap: 28px;
	}
	.postit {
		position: relative;
		display: grid;
		gap: 12px;
		width: 100%;
		max-width: 32rem;
		padding: 30px 30px 32px;
		background: var(--blush);
		box-shadow:
			0 1px 2px rgb(31 33 64 / 0.15),
			0 8px 18px rgb(31 33 64 / 0.12);
	}
	/* a strip of tape holding it to the page */
	.tape {
		position: absolute;
		top: -12px;
		left: 50%;
		width: 96px;
		height: 24px;
		background: rgb(255 232 106 / 0.75);
		transform: translateX(-50%) rotate(3deg);
		box-shadow: 0 1px 2px rgb(31 33 64 / 0.1);
	}
	h1 {
		margin: 0;
		font-size: clamp(2.4rem, 5vw, 3rem);
		font-weight: 400;
		color: var(--magenta);
	}
	.text {
		margin: 0;
		font-size: 1.15rem;
		line-height: 1.5;
		color: var(--ink);
	}
	.ctas {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 18px 30px;
	}
	.button {
		padding: 12px 20px;
		border: 3px solid var(--magenta);
		border-radius: 999px;
		font: 800 1.3rem / 1 var(--f-display);
		text-decoration: none;
	}
	.button:hover {
		background: var(--magenta);
		color: var(--card);
	}
	.second {
		font: 600 var(--s1) / 1 var(--f-display);
		text-underline-offset: 5px;
	}

	@media (max-width: 760px) {
		.hero {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
