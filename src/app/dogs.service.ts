import { Injectable } from '@angular/core';
import { Dog } from './dog';
import Walk from './walk';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

const DOGS = [
  { id: 0, name: 'Rex', weight: 20, birthDate: new Date(2006, 2, 21), owner: 'Jack Daniels', walks: [] },
  { id: 1, name: 'Woof', weight: 8, birthDate: new Date(2011, 8, 12), owner: 'Mike Perry', walks: [] },
  { id: 2, name: 'Chuck', weight: 28, birthDate: new Date(2015, 5, 6), owner: 'Sarah Abrahamson', walks: [] },
  { id: 3, name: 'Barkley', weight: 4, birthDate: new Date(2012, 3, 15), owner: 'Lara Croft', walks: [] },
  { id: 4, name: 'Prince', weight: 65, birthDate: new Date(2017, 5, 4), owner: 'Jerry Seinfeld', walks: [] }
];

@Injectable()
export class DogsService {

  currentScore = 0;
  public scoreUpdated: Observable<number>;
  private scoreSubject: Subject<number>;
  currentAmountOfListedDogs: number = DOGS.length;
  public amountOfListedDogsUpdated: Observable<number>;
  public amountOfListedDogsSubject: Subject<number>;


  constructor() {
    this.scoreSubject = new Subject<number>();
    this.scoreUpdated = this.scoreSubject.asObservable();
    this.amountOfListedDogsSubject = new Subject<number>();
    this.amountOfListedDogsUpdated = this.amountOfListedDogsSubject.asObservable();
  }

  getDogs(): Dog[] {
    return DOGS;
  }

  getDog(id: number) {
    return this.getDogs().find((dog) => dog.id === id);
  }

  addDog(dog: Dog) {
    dog.id = this.getDogs().length + 1;
    DOGS.push(dog);
    this.amountOfListedDogsSubject.next(this.currentAmountOfListedDogs);
  }

  updateDog(id: number, dog: Dog) {
    const existingDogIndex = this.getDogs().findIndex((dog) => dog.id === id);
    DOGS[existingDogIndex] = dog;
  }

  addWalk(dog: Dog, walk: Walk) {
    dog.walks.push(walk);
  }

  getScore() {
    return this.currentScore;
  }

  addScore(newScore: number) {
    this.currentScore += newScore;
    this.scoreSubject.next(this.currentScore);
  }

  removeDog(id) {
    const existingDogIndex = this.getDogs().findIndex((dog) => dog.id === id);
    DOGS.splice(existingDogIndex, 1);
    this.amountOfListedDogsSubject.next(DOGS.length);
  }

}
