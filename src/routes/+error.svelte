<script>
	import { page } from '$app/state';
	import { notFound, site } from '#lib/content/site.js';
	import { url } from '#lib/url.js';

	let missing = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{missing ? 'Page not found' : 'Error'} · {site.name}</title>
</svelte:head>

<section class="error">
	<div class="postit">
		<span class="tape" aria-hidden="true"></span>
		<p class="code">{page.status}</p>
		<h1 class="hand">{missing ? notFound.title : notFound.otherError}</h1>
		{#if missing && notFound.text}
			<p class="text">{notFound.text}</p>
		{/if}
	</div>
	<a class="button" href={url(notFound.button.href)}>{notFound.button.label}</a>
</section>

<style>
	.error {
		display: grid;
		justify-items: center;
		gap: 28px;
		padding-block: 64px 80px;
		text-align: center;
	}
	.postit {
		position: relative;
		display: grid;
		gap: 12px;
		width: 100%;
		max-width: 30rem;
		padding: 30px 30px 32px;
		background: var(--postit);
		transform: rotate(-1.5deg);
		box-shadow:
			0 1px 2px rgb(31 33 64 / 0.15),
			0 8px 18px rgb(31 33 64 / 0.12);
	}
	.tape {
		position: absolute;
		top: -12px;
		left: 50%;
		width: 96px;
		height: 24px;
		background: rgb(244 198 233 / 0.8);
		transform: translateX(-50%) rotate(-3deg);
		box-shadow: 0 1px 2px rgb(31 33 64 / 0.1);
	}
	.code {
		margin: 0;
		font: 4.5rem / 1 var(--f-pixel);
		color: var(--ink);
	}
	h1 {
		margin: 0;
		font-size: clamp(2.2rem, 5vw, 2.8rem);
		font-weight: 400;
		color: var(--magenta);
	}
	.text {
		margin: 0;
		font-size: 1.15rem;
		line-height: 1.5;
		color: var(--ink);
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
</style>
