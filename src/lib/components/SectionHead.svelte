<script>
	import { rich } from '#lib/rich.js';

	/** @type {{ title: string, subtitle?: string }} */
	let { title, subtitle = '' } = $props();
</script>

<div class="sec-head">
	<h2>{@html rich(title)}</h2>
	{#if subtitle}
		<span class="hand">{subtitle}</span>
	{/if}
</div>
