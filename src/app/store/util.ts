import { Card } from '../models/card.model';
import { v4 as uuid } from 'uuid';

// deck size is 19
const maxDeckSize = 19;

export const generateDeck = (deckSize: number): Card[] => {
	const start = Math.round(Math.random() * 19);
	let seed = Math.round(Math.random() * 3);
	const ids: number[] = new Array();
	const deck: Card[] = new Array();

	// randomize coprime integers
	switch (seed) {
		case 0: seed = 1; break;
		case 1: seed = 17; break;
		case 3: seed = 18; break;
		default: seed = 21;
	}
	for (let i = 0; i < deckSize / 2; i++) {
		ids.push((start + i * seed) % maxDeckSize);
	}
	for (let i = 0; i < ids.length; i++) {
		deck.push({ id: ids[i], uuid: uuid(), revealed: false, found: false });
		deck.push({ id: ids[i], uuid: uuid(), revealed: false, found: false });

	}
	return shuffle(deck);
}


// Fisher - Yates algorithm
function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}
