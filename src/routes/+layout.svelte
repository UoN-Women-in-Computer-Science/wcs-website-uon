<script>
	import '#lib/styles/global.css';
	import favicon from '#lib/assets/favicon.svg';
	import Nav from '#lib/components/Nav.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import Cat from '#lib/components/Cat.svelte';
	import PawPrints from '#lib/components/PawPrints.svelte';
	import { site } from '#lib/content/site.js';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="description" content={site.description} />
</svelte:head>

<div class="wrap">
	<Nav />
	<main>
		{@render children()}
	</main>
	<Footer />
</div>

<Cat />
<PawPrints />
