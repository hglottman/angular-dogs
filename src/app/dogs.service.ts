import { Injectable } from '@angular/core';
import { Dog } from './dog';
import Walk from './walk';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


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

    score = 0;
  public scoreUpdated: Observable<number>;
  public dogCountUpdated: Observable<number>;
  public dogCountSubject: Subject<number>;
  private scoreSubject: Subject<number>;


  constructor(private http: HttpClient) {
    this.scoreSubject = new Subject<number>();
    this.dogCountSubject = new Subject<number>();
    this.scoreUpdated = this.scoreSubject.asObservable();
    this.dogCountUpdated = this.dogCountSubject.asObservable();
  }

  getDogs(): Observable <Dog[]> {
    const observable = this.http.get<Dog[]>('/api/dogs');
    return observable ;
  }

  getDog(id: number) {
        return this.http.get<any>(`/api/dogs/${id}`);
      }

  addDog(newDog: Dog): Observable < Dog > {
        return this.http.post<Dog>('/api/dogs', { dog: newDog });
      }

  updateDog(id: number, dog: Dog): Observable < Dog > {
        return this.http.put<Dog>(`/api/dogs/${id}`, { dog: dog });
      }

  removeDog(id: number): Observable < Dog > {
        return this.http.delete<Dog>(`/api/dogs/${id}`);
      }

  addWalk(id: number, walks: Walk[], dog: Dog): Observable < Dog > {
    console.log('this is the ' + id);
    return this.http.put<Dog>(`/api/dogs/${id}`, { walks: walks , dog: dog });
      }

  addScore(increment) {
        this.score += increment;
        this.scoreSubject.next(this.score);
      }

  getScore() {
        return this.score;
      }

}
