import { Injectable } from '@angular/core';
import { Dog } from './dog';
import Walk from './walk';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Subscriber } from 'rxjs/Subscriber';


const DOGS = [
  { id: 0, name: 'Rex', weight: 20, birthDate: new Date(2006, 2, 21), owner: 'Jack Daniels', walks: [] },
  { id: 1, name: 'Woof', weight: 8, birthDate: new Date(2011, 8, 12), owner: 'Mike Perry', walks: [] },
  { id: 2, name: 'Chuck', weight: 28, birthDate: new Date(2015, 5, 6), owner: 'Sarah Abrahamson', walks: [] },
  { id: 3, name: 'Barkley', weight: 4, birthDate: new Date(2012, 3, 15), owner: 'Lara Croft', walks: [] },
  { id: 4, name: 'Prince', weight: 65, birthDate: new Date(2017, 5, 4), owner: 'Jerry Seinfeld', walks: [] }
];


@Injectable()
export class DogsService {

  dogs: Array<Dog>;
  dogsSubject: Subject<Dog[]> = new Subject<Dog[]>();
  dogsObservable: Observable<Dog[]>;

  score = 0;
  public scoreUpdated: Observable<number>;
  private scoreSubject: Subject<number>;
  public dogCountUpdated: Observable<number>;
  public dogCountSubject: Subject<number>;


  constructor(private http: HttpClient) {
    this.scoreSubject = new Subject<number>();
    this.dogCountSubject = new Subject<number>();
    this.scoreUpdated = this.scoreSubject.asObservable();
    this.dogCountUpdated = this.dogCountSubject.asObservable();
    this.dogsObservable = this.dogsSubject.asObservable();
  }

  getDogs(): void {
    const observable = this.http.get<Dog[]>('/api/dogs');
    observable.subscribe((data) => {
      this.dogs = data;
      this.dogsSubject.next(data);
    });
  }

  getDog(id: number) {
    return this.http.get<any>(`/api/dogs/${id}`);
  }

  addDog(newDog: Dog): void {
    this.http.post<Dog>('/api/dogs', { dog: newDog }).subscribe(() => {
      this.getDogs();
    });
  }

  updateDog(id: number, dog: Dog): void {
    this.http.put<Dog>(`/api/dogs/${id}`, { dog: dog }).subscribe(() => {
    this.getDogs();
  });
  }

  removeDog(id: number): void {
     this.http.delete<Dog>(`/api/dogs/${id}`).subscribe(() => {
      this.getDogs();
    });
  }

  addWalk(id: number, walks: Walk[], dog: Dog): void {
   this.http.put<Dog>(`/api/dogs/${id}/walks`, { walks: walks, dog: dog }).subscribe(() => {
    this.getDogs();
    this.addScore(1);
  });
  }

  addScore(increment) {
    this.score += increment;
    this.scoreSubject.next(this.score);
  }

  getScore() {
    return this.score;
  }

  filterDogs(filterString) {
    this.http.get<Dog[]>('/api/dogs?name=' + filterString).subscribe((data) => {
      this.dogs = data;
      this.dogsSubject.next(data);
   });
  }

}
