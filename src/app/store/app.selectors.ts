import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Card } from "../models/card.model";
import { deckFeatureStateKey, DeckState, State } from "./app.reducer";

const selectDeckState = createFeatureSelector<State, DeckState>(
  deckFeatureStateKey
);

export const selectDeck = createSelector(
  selectDeckState,
  (state: DeckState) => state.deck
);

export const selectCard = createSelector(
  selectDeck,
  (deck: Card[], props: { uuid: string }) =>
    deck.find((card) => card.uuid === props.uuid)
);

export const selectRevealedCardCount = createSelector(
  selectDeckState,
  (state) => state.revealedCardCount
);

export const selectRevealedCardsWithoutPair = createSelector(selectDeckState, (state) =>
  state.deck.filter((card) => !card.found && card.revealed)
);
