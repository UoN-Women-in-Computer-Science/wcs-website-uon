<script>
	import Logo from './Logo.svelte';
	import { nav } from '#lib/content/site.js';
	import { url } from '#lib/url.js';
</script>

<nav aria-label="Main">
	<a class="home" href={url('/')}>
		<Logo size={68} />
		<span>{nav.title}</span>
	</a>
	<ul>
		{#each nav.items as link (link.label)}
			<li><a href={url(link.href)}>{link.label}</a></li>
		{/each}
	</ul>
</nav>

<style>
	nav {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 10px 24px;
		padding-block: 18px;
	}
	.home {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		text-decoration: none;
		font: 800 1.75rem / 1 var(--f-display);
	}
	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 4px 22px;
		margin: 0;
		padding: 0;
		list-style: none;
		font: 600 var(--s0) / 1.4 var(--f-display);
	}
	ul a {
		text-decoration: none;
	}
	ul a:hover {
		text-decoration: underline wavy var(--magenta);
		text-underline-offset: 5px;
	}
</style>
