<script>
	// One card per person in content/committee.json, in the same order as the file.
	import SectionHead from '../SectionHead.svelte';
	import CommitteeCard from '../CommitteeCard.svelte';
	import people from '#lib/content/committee.json';
	import { committee } from '#lib/content/site.js';
</script>

<section id="committee">
	<SectionHead title={committee.title} subtitle={committee.subtitle} />
	<div class="cards">
		{#each people as member (member.role)}
			<CommitteeCard {member} />
		{/each}
	</div>
</section>

<style>
	/* 4 per row on wide screens, 2 on tablets, 1 on phones, so 8 cards always fill their rows. */
	.cards {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 28px;
	}
	@media (max-width: 960px) {
		.cards {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media (max-width: 480px) {
		.cards {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
