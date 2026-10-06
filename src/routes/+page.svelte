<script>
	import Hero from '#lib/components/sections/Hero.svelte';
	import Events from '#lib/components/sections/Events.svelte';
	import Gallery from '#lib/components/sections/Gallery.svelte';
	import WhyWeExist from '#lib/components/sections/WhyWeExist.svelte';
	import Committee from '#lib/components/sections/Committee.svelte';
	import { site } from '#lib/content/site.js';
</script>

<svelte:head>
	<title>{site.name}</title>
</svelte:head>

<Hero />
<Events />
<Gallery />
<WhyWeExist />
<Committee />

<!--
<style>
	/* Placeholder box. Delete this and the section above once resources is built. */
	.todo {
		display: grid;
		place-items: center;
		min-height: 160px;
		border: 2px dashed var(--muted);
		border-radius: 12px;
		font: 1.6rem / 1 var(--f-hand);
		color: var(--muted);
	}
</style>
-->
