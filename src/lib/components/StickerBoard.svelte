<script>
	// A board of stickers you can drag around, like a laptop lid.
	// They slap down one by one when the page loads. Dragging uses GSAP's Draggable plugin.
	// The Discord, Instagram, Linktree and email stickers are real links: a click opens them, a drag just moves them.
	import { gsap } from 'gsap';
	import Logo from './Logo.svelte';
	import { links, stickers } from '#lib/content/site.js';

	/** @type {HTMLDivElement} */
	let board;

	// Set while a sticker is being dragged, so letting go of a link sticker doesn't also open the link.
	let justDragged = false;

	/** @param {MouseEvent} e */
	function blockClickAfterDrag(e) {
		if (justDragged) e.preventDefault();
	}

	$effect(() => {
		let draggables = /** @type {any[]} */ ([]);
		const stickers = board.querySelectorAll('.sticker');

		// Draggable touches window, so it's loaded here (browser only), not at the top of the file.
		import('gsap/Draggable').then(({ Draggable }) => {
			gsap.registerPlugin(Draggable);
			draggables = Draggable.create(stickers, {
				bounds: board,
				dragClickables: true, // let the link stickers be dragged too
				onPress() {
					gsap.to(this.target, { scale: 1.08, duration: 0.15 });
					// Whatever you grab comes to the front.
					this.target.style.zIndex = String(Date.now() % 100000);
				},
				onDrag() {
					justDragged = true;
				},
				onRelease() {
					gsap.to(this.target, { scale: 1, duration: 0.45, ease: 'elastic.out(1, 0.5)' });
					// The click event fires right after release, so clear the flag just after it.
					setTimeout(() => (justDragged = false), 0);
				}
			});
		});

		const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
		const intro = reduce
			? null
			: gsap.from(stickers, { scale: 1.5, autoAlpha: 0, duration: 0.4, stagger: 0.1, ease: 'back.out(2.2)', delay: 0.3 });

		return () => {
			intro?.revert();
			draggables.forEach((d) => d.kill());
		};
	});
</script>

<div class="board" bind:this={board} aria-label="Sticker board. Drag the stickers around.">
	<a class="sticker discord" href={links.discord} onclick={blockClickAfterDrag}>
		<small>{stickers.discord.small}</small>{stickers.discord.big}
	</a>

	<a class="sticker insta" href={links.instagram} onclick={blockClickAfterDrag}>
		<small>{stickers.instagram.small}</small>{stickers.instagram.big}
	</a>

	<a class="sticker linktree" href={links.linktree} onclick={blockClickAfterDrag}>
		<small>{stickers.linktree.small}</small>{stickers.linktree.big}
	</a>

	<a class="sticker email" href="mailto:{links.email}" onclick={blockClickAfterDrag}>
		<small>{stickers.email.small}</small>{stickers.email.big}
	</a>

	<div class="sticker logo"><Logo size={104} label="WCS logo sticker" /></div>

	{#each stickers.pronouns.slice(0, 3) as pronoun, i (pronoun)}
		<div class="sticker pin pin-{i + 1}">{pronoun}</div>
	{/each}

	{#if stickers.joke}
		<div class="sticker joke">{stickers.joke}</div>
	{/if}

	<span class="hint hand" aria-hidden="true">{stickers.hint}</span>
</div>

<style>
	.board {
		position: relative;
		min-height: 440px;
	}

	.sticker {
		position: absolute;
		user-select: none;
		touch-action: none;
		filter: drop-shadow(1px 3px 0 rgb(31 33 64 / 0.22));
	}

	/* Discord, Instagram, Linktree and email: chunky link stickers */
	.discord,
	.insta,
	.linktree,
	.email {
		display: grid;
		padding: 12px 18px 14px;
		border: 4px solid var(--card);
		border-radius: 18px;
		min-width: 140px;
		color: var(--card);
		font: 800 1.45rem / 1 var(--f-display);
		text-decoration: none;
	}
	.discord small,
	.insta small,
	.linktree small,
	.email small {
		font: 600 0.72rem / 1.4 var(--f-mono);
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}
	/* Layout: a link sticker in each corner, the logo in the middle with a pin either side,
	   and the third pin centred along the bottom. Small, alternating tilts keep it hand-placed. */
	.discord {
		top: 30px;
		left: 12%;
		background: #5865f2; /* Discord's own blurple, so people recognise it */
		transform: rotate(-8deg);
	}
	.insta {
		top: 40px;
		right: 5%;
		background: var(--magenta);
		transform: rotate(7deg);
	}
	.linktree {
		bottom: 46px;
		left: 2%;
		background: #c6efa6; /* a pastel take on Linktree's green */
		color: var(--ink);
		transform: rotate(6deg);
	}
	.email {
		bottom: 42px;
		right: 1%;
		background: #d6dcff; /* pastel periwinkle */
		color: var(--ink);
		transform: rotate(-7deg);
	}

	.logo {
		top: 50%;
		left: 50%;
		margin: -64px 0 0 -64px; /* half its size, so it sits dead centre */
		padding: 8px;
		border: 3px solid var(--magenta);
		border-radius: 50%;
		background: var(--card);
		--logo-bg: var(--card);
		transform: rotate(-9deg);
	}

	/* Pronoun pins, like the badges people wear at events */
	.pin {
		display: grid;
		place-items: center;
		width: 108px;
		height: 108px;
		border: 4px solid var(--card);
		border-radius: 50%;
		font: 800 1rem / 1 var(--f-display);
		color: var(--ink);
		text-align: center;
		white-space: nowrap; /* keeps "they/them" on one line so it stays centred */
	}
	.pin-1 {
		top: 50%;
		left: 4%;
		margin-top: -76px; /* sits a little high */
		background: var(--postit);
		transform: rotate(-12deg);
	}
	.pin-2 {
		top: 50%;
		right: 4%;
		margin-top: -52px; /* and this one a little low */
		background: var(--mint);
		transform: rotate(11deg);
	}
	.pin-3 {
		bottom: 2%;
		left: 50%;
		margin-left: -58px;
		background: var(--magenta-soft);
		transform: rotate(-8deg);
	}

	.joke {
		bottom: 4%;
		left: 2%;
		padding: 12px 16px;
		border: 4px solid var(--card);
		border-radius: 6px;
		background: var(--ink);
		color: #d7f7e3;
		font: 600 1.05rem / 1.4 var(--f-mono);
		transform: rotate(3deg);
	}

	.hint {
		position: absolute;
		right: 6px;
		top: -16px;
		color: var(--muted);
	}

	/* Phones: the board is too narrow for logo and two pins in one row, so it stacks:
	   links on top, logo, pins either side below it, then she/they and the bottom links. */
	@media (max-width: 760px) {
		.board {
			min-height: 560px;
		}
		/* Corner stickers go right to the edges, there's no room to pull them in */
		.discord {
			top: 0;
			left: 0;
		}
		.insta {
			top: 28px;
			right: 0;
		}
		.linktree {
			bottom: 28px;
			left: 0;
		}
		.email {
			bottom: 0;
			right: 0;
		}
		.logo {
			top: 20%;
			margin-top: 0;
		}
		.pin-1,
		.pin-2 {
			margin-top: 0;
		}
		.pin-1 {
			top: 41%;
			left: 2%;
		}
		.pin-2 {
			top: 45%;
			right: 2%;
		}
		.pin-3 {
			bottom: auto;
			top: 60%;
		}
	}
</style>
