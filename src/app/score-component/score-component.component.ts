import { Component, OnInit, OnDestroy } from '@angular/core';
import { DogsService } from '../dogs.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-score-component',
  templateUrl: './score-component.component.html',
  styleUrls: ['./score-component.component.scss']
})
export class ScoreComponentComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  subscription2: Subscription;
  score: number;
  amountOfListedDogs: number;
  // dogsCount: number;

  constructor(private dogsService: DogsService) { }

  ngOnInit() {
    this.score = this.dogsService.getScore();
    this.subscription = this.dogsService.scoreUpdated.subscribe((currentScore) => {
      this.score = currentScore;
    });
    const temp = this.dogsService.getDogs().length;
    this.amountOfListedDogs = temp;
    this.subscription2 = this.dogsService.amountOfListedDogsUpdated.subscribe(() => {
      this.amountOfListedDogs = this.dogsService.getDogs().length;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
