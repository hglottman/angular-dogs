import { Injectable } from '@angular/core';
import { Dog } from './dog';

const DOGS =  [
  {id: 0, name: 'Rex', weight: 20, birthDate: new Date(2006, 2, 21), owner: 'Jack Daniels', walks: []},
  {id: 1, name: 'Woof', weight: 8, birthDate: new Date(2011, 8, 12), owner: 'Mike Perry', walks: []},
  {id: 2, name: 'Chuck', weight: 28, birthDate: new Date(2015, 5, 6), owner: 'Sarah Abrahamson', walks: []},
  {id: 3, name: 'Barkley', weight: 4, birthDate: new Date(2012, 3, 15), owner: 'Lara Croft', walks: []},
  {id: 4, name: 'Prince', weight: 65, birthDate: new Date(2017, 5, 4), owner: 'Jerry Seinfeld', walks: []}
];

@Injectable()
export class DogsService {

  constructor() { }

  getDogs() : Dog[] {
    return DOGS;
  }

  getDog(id : number) {
    return this.getDogs().find((dog) => dog.id == id);
  }

  addDog(dog : Dog) {
    dog.id = this.getDogs().length + 1;
    DOGS.push(dog);
  }

  updateDog(id: number, dog: Dog) {
    const existingDogIndex = this.getDogs().findIndex((dog) => dog.id == id);
    DOGS[existingDogIndex] = dog;
  }

  addWalk(dog, walk) {
    dog.walks.push(walk);
    console.log(DOGS)
  }

}
