export const links = {
	su: 'https://su.nottingham.ac.uk/activities/view/women-in-comp-sci',
	discord: 'https://discord.com/invite/QvUxauXKhR',
	instagram: 'https://www.instagram.com/uonwcs/',
	instagramHandle: '@uonwcs',
	linktree: 'https://linktr.ee/nottinghamwcs',
	email: 'women-in-comp@uonsu.com',
	github: 'https://github.com/golden-fox07'
};

export const site = {
	name: 'WCS Nottingham',
	description:
		'Women in Computer Science at the University of Nottingham. Talks, workshops, hack nights and pizza.'
};

export const nav = {
	title: 'Women in Computer Science UoN',
	items: [
		{ label: 'Events', href: '/#events' },
		{ label: 'Gallery', href: '/#gallery' },
		{ label: 'Join', href: links.su },
		{ label: 'Committee', href: '/#committee' }
		// { label: 'Resources', href: '/#resources' } // hidden until the resources section is added
	]
};

export const hero = {
	title: "hi, we're WCS :)",
	text: "We're a society for women and non-binary students in computing at Nottingham. We run workshops, talks and a lot of pizza nights. You don't need to know how to code to join.",
	button: { label: 'Join WCS', href: links.su },
	secondLink: /** @type {{ label: string, href: string } | null} */ (null) // e.g. { label: "what's on this month", href: '#events' }
};

export const stickers = {
	discord: { small: 'come say hi on', big: 'Discord' },
	instagram: { small: 'follow us', big: links.instagramHandle },
	linktree: { small: 'all our links', big: 'Linktree' },
	email: { small: 'drop us an', big: 'Email' },
	pronouns: ['she/her', 'they/them', 'she/they'],
	joke: '',
	hint: 'drag us around ↗'
};

export const events = {
	title: "What's *on*",
	subtitle: 'Everyone is welcome :)',
	empty: `Nothing planned right now. The next thing always gets announced on our [Discord](${links.discord}) first.`
};

export const gallery = {
	title: '*Gallery*',
	subtitle: 'photos from past events'
};

export const why = {
	title: 'Why we *exist*',
	subtitle: 'Find your people',
	lectureLabel: 'average CS lecture',
	wcsLabel: 'WCS pizza night',
	text: "CS can feel lonely when you're one of the few girls in the room. Only about 1 in 5 CS students in the UK are women. We're the other ones. Come say hi.",
};

export const committee = {
	title: 'Meet the *committee*',
	subtitle: ''
};

// Three columns: left, centre, right. Each is a list of lines.
export const footer = {
	left: ['Women in Computer Science UoN', `[${links.email}](mailto:${links.email})`],
	centre: [`made by [Aakriti](${links.github}) at midnight. please don't inspect element:(`],
	right: ["cat's sprite by [Elthen](https://elthen.itch.io/2d-pixel-art-cat-sprites)"]
};


export const cat = {
	lines: [
		'sudo pet me',
		'404: treats not found',
		'meow.exe has stopped',
		'git push --force-feed',
		"I sat on your keyboard. you're welcome:)",
		'ada lovelace named me. probably'
	],
	cleaning: 'brb, debugging my fur',
	sleeping: 'zzz... compiling...',
	tooManyPets: 'too many pets!!'
};
