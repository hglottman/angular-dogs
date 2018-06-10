import { Component, OnInit, OnDestroy } from '@angular/core';

import { DogsService } from '../dogs.service';
import { Dog } from '../dog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.scss']
})
export class DogsComponent implements OnInit {

  selectedDog: Dog;
  dogs = new Array<Dog>();
  filterTerm: string;
  dateFormat = 'fullDate';

  constructor(private dogsService: DogsService, private route: ActivatedRoute, private router: Router) {
    this.dogsService.dogsObservable.subscribe((dogs) => {
      this.dogs = dogs;
      console.log(this.dogs);
    });
  }

  ngOnInit() {
    this.dogsService.getDogs();
    this.route.queryParams.subscribe(queryParams => {
      this.filterTerm = queryParams.name;
    });
  }


  onFilterChanged(filterString) {
    this.router.navigate(['.'], { queryParams: { name: filterString } });
  }

  removeDog(id) {
    this.dogsService.removeDog(id);
  }


  toggleDate() {
    this.dateFormat === 'fullDate' ? this.dateFormat = 'shortDate' : this.dateFormat = 'fullDate';
  }

  selectDog(dog) {
    this.selectedDog = dog;
  }

  handleAddWalk(dog) {
    const id = dog.id;
    const walks = dog.walks;
    this.dogsService.addWalk(id, walks, dog);
    // this.dogsService.addScore(10);
  }


}
