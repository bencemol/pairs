import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { EMPTY, of } from "rxjs";
import { delay, exhaustMap, withLatestFrom } from "rxjs/operators";
import { hideCards, pairFound, revealCard } from "./app.actions";
import { State } from "./app.reducer";
import { selectRevealedCardCount, selectRevealedCardsWithoutPair } from "./app.selectors";

export const flipTime = 0.2;

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private store: Store<State>) {}

  revealCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(revealCard),
      withLatestFrom(
        this.store.select(selectRevealedCardCount),
        this.store.select(selectRevealedCardsWithoutPair)
      ),
      exhaustMap(([_, revealCardCount, revealedCards]) => {
        if (revealCardCount > 1) {
          if (revealedCards[0].id === revealedCards[1].id) {
            return of(pairFound());
          }
          return of(hideCards()).pipe(delay(400));
        } else {
          return EMPTY;
        }
      })
    )
  );
}
