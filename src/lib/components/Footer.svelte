<script>
	// Columns come from `footer` in content/site.js.
	import { footer } from '#lib/content/site.js';
	import { rich } from '#lib/rich.js';
</script>

<footer style:--columns={footer.length}>
	{#each footer as column (column.title)}
		<section>
			<h2>{column.title}</h2>
			{#each column.lines as line (line)}
				<p>{@html rich(line)}</p>
			{/each}
		</section>
	{/each}
</footer>

<style>
	/* Equal columns, all left-aligned and lined up along the top. Stacks into one column on phones. */
	footer {
		display: grid;
		grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
		gap: 24px 40px;
		padding-block: 26px 40px;
		border-top: 2px solid var(--ink);
		font: 0.85rem / 1.5 var(--f-mono);
		color: var(--muted);
	}
	section {
		display: grid;
		align-content: start;
		gap: 6px;
		padding: 0;
	}
	h2 {
		margin: 0 0 4px;
		font: 2rem / 1 var(--f-hand);
		color: var(--biro);
	}
	p {
		margin: 0;
	}
	/* :global because the links come from {@html}. */
	p :global(a) {
		text-underline-offset: 3px;
	}

	@media (max-width: 760px) {
		footer {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
