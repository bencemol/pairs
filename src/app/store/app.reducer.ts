import { Action, ActionReducerMap, createReducer, on } from "@ngrx/store";
import { Card } from "../models/card.model";
import { hideCards, initDeck, pairFound, revealCard } from "./app.actions";
import { generateDeck } from "./util";

export const deckFeatureStateKey = "deck";

export interface State {
  deck: DeckState;
}

export interface DeckState {
  deck: Card[];
  revealedCardCount: number;
}

const initialState: DeckState = {
  deck: [],
  revealedCardCount: 0,
};

const gameReducer = createReducer(
  initialState,
  on(initDeck, () => ({ ...initialState, deck: generateDeck(20) })),
  on(revealCard, reveal),
  on(hideCards, hide),
  on(pairFound, pair)
);

function reveal(state: DeckState, props: { uuid: string }): DeckState {
  if (state.revealedCardCount > 1) {
    return state;
  }
  return {
    ...state,
    revealedCardCount: state.revealedCardCount + 1,
    deck: state.deck.map((card) =>
      card.uuid === props.uuid ? { ...card, revealed: true } : card
    ),
  };
}

function hide(state: DeckState): DeckState {
  return {
    ...state,
    revealedCardCount: 0,
    deck: state.deck.map((card) =>
      !card.found && card.revealed ? { ...card, revealed: false } : card
    ),
  };
}

function pair(state: DeckState): DeckState {
  return {
    ...state,
    revealedCardCount: 0,
    deck: state.deck.map((card) =>
      !card.found && card.revealed ? { ...card, found: true } : card
    ),
  };
}

export function reducer(state: DeckState | undefined, action: Action) {
  return gameReducer(state, action);
}

export const reducers: ActionReducerMap<State> = {
  deck: reducer,
};
