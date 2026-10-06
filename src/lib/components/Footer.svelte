<script>
	import { footer } from '#lib/content/site.js';
	import { rich } from '#lib/rich.js';
</script>

<footer>
	{#each ['left', 'centre', 'right'] as column (column)}
		<div class={column}>
			{#each footer[column] as line (line)}
				<span>{@html rich(line)}</span>
			{/each}
		</div>
	{/each}
</footer>

<style>
	footer {
		display: grid;
		grid-template-columns: 1fr auto 1fr; /* equal outer columns keep the middle one truly centred */
		align-items: start;
		gap: 8px 24px;
		padding-block: 22px 40px;
		border-top: 2px solid var(--ink);
		font: 0.85rem / 1.5 var(--f-mono);
		color: var(--muted);
	}
	footer div {
		display: grid;
	}
	.centre {
		text-align: center;
	}
	.right {
		text-align: right;
	}

	/* Phones: stack the three columns */
	@media (max-width: 760px) {
		footer {
			grid-template-columns: 1fr;
		}
		.centre,
		.right {
			text-align: left;
		}
	}
</style>
