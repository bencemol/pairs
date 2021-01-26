import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { delay, filter, map } from "rxjs/operators";
import { Card } from "src/app/models/card.model";
import { flipTime, revealCard, selectCard, State } from "src/app/store";

const flip = trigger("flip", [
  state("false", style({ transform: "rotateY(0)" })),
  state("true", style({ transform: "rotateY(180deg)" })),
  transition("* => false", [
    style({ transform: "rotateY(-180deg)" }),
    animate(flipTime + "s"),
  ]),
  transition("false <=> true", [animate(flipTime + "s")]),
]);

@Component({
  selector: "card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
  animations: [flip],
})
export class CardComponent implements OnInit {
  @Input()
  uuid: string;
  card$: Observable<Card>;
  revealedChange$: Observable<boolean>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.card$ = this.store.select(selectCard, { uuid: this.uuid });
    this.revealedChange$ = this.card$.pipe(
      filter((card) => !!card),
      map((card) => card.revealed),
      delay((flipTime * 1000) / 2)
    );
  }

  reveal(card: Card) {
    if (!card.revealed) {
      this.store.dispatch(revealCard({ uuid: this.uuid }));
    }
  }
}
