<script>
	import { url } from '#lib/url.js';

	/** @type {{ member: { role: string, name: string | null, pronouns?: string | null, photo: string | null, linkedin?: string | null, funFact: string } }} */
	let { member } = $props();
</script>

<article class="card">
	{#if member.photo}
		<img src={url(member.photo)} alt={member.name ?? member.role} loading="lazy" />
	{:else}
		<div class="photo hand" aria-hidden="true">photo:)</div>
	{/if}

	<div class="title">
		<h3>{member.role}</h3>
		<div class="name">
			<span class="who">
				<span class="hand">{member.name ?? 'name?? '}</span>
				{#if member.pronouns}
					<span class="pronouns">{member.pronouns}</span>
				{/if}
			</span>
			{#if member.linkedin}
				<a
					class="linkedin"
					href={member.linkedin}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="{member.name ?? member.role} on LinkedIn">in</a
				>
			{/if}
		</div>
	</div>

	<p class="fact"><b>Fun fact:</b> {member.funFact}</p>
</article>

<style>
	.card {
		display: grid;
		gap: 10px;
		align-content: start;
		padding: 10px;
		border: 2px solid var(--ink);
		border-radius: 14px;
		background: var(--card);
	}

	img,
	.photo {
		width: 100%;
		aspect-ratio: 4 / 3;
		border-radius: 8px;
	}
	img {
		object-fit: cover;
	}
	.photo {
		display: grid;
		place-items: center;
		border: 2px dashed var(--muted);
		background: var(--paper);
		color: var(--muted);
	}

	.title {
		display: grid;
		gap: 2px;
	}
	h3 {
		margin: 0;
		font-size: 1.25rem;
		font-weight: 800;
		line-height: 1.1;
	}
	.name {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
	}
	.who {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 4px 8px;
		min-width: 0;
	}
	.title .hand {
		font-size: 1.4rem;
		color: var(--magenta);
	}

	/* a tiny version of the pronoun pins on the sticker board */
	.pronouns {
		padding: 2px 8px;
		border: 1.5px solid var(--ink);
		border-radius: 999px;
		background: var(--postit);
		font: 700 0.7rem / 1.3 var(--f-display);
		white-space: nowrap;
	}

	.linkedin {
		display: grid;
		place-items: center;
		flex: none;
		width: 34px;
		height: 34px;
		border: 2px solid var(--ink);
		border-radius: 9px;
		background: var(--card);
		color: var(--ink);
		font: 800 1.05rem / 1 var(--f-display);
		text-decoration: none;
		transition:
			background 0.15s,
			transform 0.15s;
	}
	.linkedin:hover,
	.linkedin:focus-visible {
		background: var(--magenta-soft);
		transform: rotate(-6deg);
	}
	.linkedin:focus-visible {
		outline: 3px solid var(--biro);
		outline-offset: 2px;
	}
	@media (prefers-reduced-motion: reduce) {
		.linkedin {
			transition: none;
		}
	}

	.fact {
		margin: 0;
		padding-top: 8px;
		border-top: 2px dotted var(--ink);
		font-size: 0.85rem;
	}
	.fact b {
		font-family: var(--f-display);
	}
</style>
