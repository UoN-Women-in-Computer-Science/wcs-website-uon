<script>
	// The WCS chip, redrawn as SVG from the society logo so it stays sharp at any size.
	// Pins are described once for the top edge, then the same group is rotated onto the other three sides.
	let { size = 48, label = 'WCS logo' } = $props();

	// Each pin: where it leaves the chip (x), how far it reaches (end) and an optional sideways bend.
	const pins = [
		{ x: 38, end: 6, bend: -8 },
		{ x: 49, end: 6, bend: 0 },
		{ x: 60, end: 16, bend: 0 },
		{ x: 71, end: 6, bend: 0 },
		{ x: 82, end: 6, bend: 8 }
	];

	/** @param {{ x: number, end: number, bend: number }} pin */
	const trace = ({ x, end, bend }) =>
		bend ? `M${x} 30 V24 L${x + bend} 16 V${end}` : `M${x} 30 V${end}`;
</script>

<svg width={size} height={size} viewBox="-4 -4 128 128" role="img" aria-label={label}>
	{#each [0, 90, 180, 270] as angle (angle)}
		<g transform="rotate({angle} 60 60)">
			{#each pins as pin (pin.x)}
				<path class="trace" d={trace(pin)} />
				<circle class="pad" cx={pin.x + pin.bend} cy={pin.end} r="3.6" />
			{/each}
		</g>
	{/each}
	<rect class="trace" x="30" y="30" width="60" height="60" rx="7" />
	<rect class="core" x="42" y="42" width="36" height="36" rx="3" />
	<text x="60" y="65.5">WCS</text>
</svg>

<style>
	svg {
		display: block;
		color: var(--magenta);
	}
	.trace {
		fill: none;
		stroke: currentColor;
		stroke-width: 3;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	.pad {
		fill: var(--logo-bg, var(--paper));
		stroke: currentColor;
		stroke-width: 2.6;
	}
	.core {
		fill: currentColor;
	}
	text {
		fill: var(--logo-bg, var(--paper));
		font: 17px var(--f-pixel);
		letter-spacing: 1px;
		text-anchor: middle;
	}
</style>
