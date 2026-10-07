<script>
	// The events section: upcoming events from events.json, soonest first.
	// Past events hide themselves, so you never need to delete old ones from the file.
	import SectionHead from '../SectionHead.svelte';
	import EventCard from '../EventCard.svelte';
	import events from '#lib/content/events.json';
	import { events as text } from '#lib/content/site.js';
	import { rich } from '#lib/rich.js';

	// "today" is the build date when the page is built, then the visitor's real date once it loads,
	// so events that finished since the last deploy still disappear.
	let today = $state(new Date().toISOString().slice(0, 10));
	$effect(() => {
		today = new Date().toISOString().slice(0, 10);
	});

	const upcoming = $derived(
		events.filter((e) => (e.endDate ?? e.date) >= today).sort((a, b) => a.date.localeCompare(b.date))
	);
</script>

<section id="events">
	<SectionHead title={text.title} subtitle={text.subtitle} />

	{#if upcoming.length}
		<div class="list">
			{#each upcoming as event (event.date + event.title)}
				<EventCard {event} />
			{/each}
		</div>
	{:else}
		<p class="empty">{@html rich(text.empty)}</p>
	{/if}
</section>

<style>
	.list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
		gap: 20px;
	}
	.empty {
		margin: 0;
		padding: 20px;
		border: 2px dashed var(--muted);
		border-radius: 12px;
		max-width: 60ch;
	}
</style>
