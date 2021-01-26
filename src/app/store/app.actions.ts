import { createAction, props } from "@ngrx/store";

export const initDeck = createAction("[Table] Initialize Deck");

export const revealCard = createAction(
  "[Card] Reaveal Card",
  props<{ uuid: string }>()
);

export const hideCards = createAction("[RevealCardEffect] Hide Cards");

export const pairFound = createAction("[RevealCardEffect] Pair Found");
