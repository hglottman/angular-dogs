import { Injectable } from '@angular/core';
import { Dog } from './dog';


const DOGS =  [
  {name: 'Rex', weight: 20, birthDate: new Date(2006, 2, 21), owner: 'Jack Daniels'},
  {name: 'Woof', weight: 8, birthDate: new Date(2011, 8, 12), owner: 'Mike Perry'},
  {name: 'Chuck', weight: 28, birthDate: new Date(2015, 5, 6), owner: 'Sarah Abrahamson'},
  {name: 'Barkley', weight: 4, birthDate: new Date(2012, 3, 15), owner: 'Lara Croft'},
  {name: 'Prince', weight: 65, birthDate: new Date(2017, 5, 4), owner: 'Jerry Seinfeld'}
];


@Injectable()
export class DogsService {

  constructor() { }

  getDogs(): Dog[] {
    return DOGS;
  }

  addDog(dog: Dog) {
    DOGS.push(dog);
  }

}
