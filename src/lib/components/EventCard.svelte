<script>
	// One event: a date block on the left, details on the right.
	// All the data comes from src/lib/content/events.json.

	/** @type {{ event: { title: string, date: string, endDate?: string, time: string, location: string, description: string, link?: string } }} */
	let { event } = $props();

	// "2026-10-15" -> { day: "15", month: "OCT", weekday: "THU" }
	// With an endDate, each part becomes a range: "5–7", "DEC", "SAT–MON".
	function parts(date) {
		const d = new Date(`${date}T12:00`);
		return {
			day: d.toLocaleDateString('en-GB', { day: 'numeric' }),
			month: d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase(),
			weekday: d.toLocaleDateString('en-GB', { weekday: 'short' }).toUpperCase()
		};
	}
	const range = (a, b) => (a === b ? a : `${a}–${b}`);
	const when = $derived.by(() => {
		const start = parts(event.date);
		if (!event.endDate) return start;
		const end = parts(event.endDate);
		return {
			day: range(start.day, end.day),
			month: range(start.month, end.month),
			weekday: range(start.weekday, end.weekday)
		};
	});
</script>

<article class="event">
	<time class="date" datetime={event.time ? `${event.date}T${event.time.slice(0, 5)}` : event.date}>
		<span class="weekday">{when.weekday}</span>
		<span class="day">{when.day}</span>
		<span class="month">{when.month}</span>
	</time>

	<div class="details">
		<h3>{event.title}</h3>
		{#if event.time || event.location}
			<p class="meta">{[event.time, event.location].filter(Boolean).join(' · ')}</p>
		{/if}
		<p>{event.description}</p>
		{#if event.link}
			<a href={event.link}>Sign up →</a>
		{/if}
	</div>
</article>

<style>
	.event {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		gap: 16px;
		padding: 16px;
		border: 2px solid var(--ink);
		border-radius: 12px;
		background: var(--card);
	}

	.date {
		display: grid;
		align-content: start;
		justify-items: center;
		min-width: 64px;
		padding: 8px 6px;
		border-radius: 8px;
		background: var(--magenta);
		color: var(--card);
		font-family: var(--f-mono);
		font-variant-numeric: tabular-nums;
	}
	.weekday,
	.month {
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.08em;
	}
	.day {
		font: 800 2rem / 1.05 var(--f-display);
	}

	.details {
		display: grid;
		gap: 6px;
		align-content: start;
	}
	h3 {
		margin: 0;
		font-size: 1.25rem;
		font-weight: 800;
		line-height: 1.15;
	}
	p {
		margin: 0;
	}
	.meta {
		font: 600 var(--s-1) / 1.35 var(--f-mono);
		color: var(--muted);
	}
	a {
		justify-self: start;
		font: 700 var(--s0) / 1 var(--f-display);
		color: var(--magenta);
		text-underline-offset: 4px;
	}
</style>
