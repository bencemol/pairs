import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Card } from 'src/app/models/card.model';
import { initDeck, selectDeck, State } from 'src/app/store';

@Component({
  selector: 'card-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  deck$: Observable<Card[]>;
  numberOfTries$: Observable<number>;

  constructor(private store: Store<State>) {
    this.deck$ = this.store.select(selectDeck);
  }

  ngOnInit() {
    this.store.dispatch(initDeck());
  }

  restart() {
    this.store.dispatch(initDeck());
  }

  trackById(index: number, card: Card) {
    return card ? card.uuid : null;
  }

}
