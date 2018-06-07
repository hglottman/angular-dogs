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
  }

  setDogs() {
    this.dogsService.getDogs().subscribe((dogs) => {
      this.dogs = dogs;
    });
  }
  ngOnInit() {
    this.dogsService.getDogs().subscribe((data) => {
       this.dogs = data; });
    // this.setDogs();
    this.route.queryParams.subscribe(queryParams => {
      this.filterTerm = queryParams.name;
    });
    }


  onFilterChanged(filterString) {
    this.router.navigate(['.'], { queryParams: { name: filterString } });
  }

  removeDog(id) {
    this.dogsService.removeDog(id).subscribe(() => {
    });
    this.setDogs();
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
    this.dogsService.addWalk(id, walks, dog).subscribe(data => {
      console.log(data);
    });
    this.setDogs();
    this.dogsService.addScore(10);
  }


}
