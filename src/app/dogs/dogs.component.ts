import { Component, OnInit } from '@angular/core';

import { DogsService } from '../dogs.service';
import { Dog } from '../dog';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.scss']
})
export class DogsComponent implements OnInit {

  dogs = new Array<Dog>();
  filterTerm : string;
  dateFormat = 'fullDate';
  selectedDog: Dog;

  constructor(private dogsService : DogsService, private route : ActivatedRoute, private router : Router) {
    this.dogs = dogsService.getDogs();
   }

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      this.filterTerm = queryParams.name;
    });
  }

  onFilterChanged() {
    this.router.navigate(['.'], { queryParams: { name: this.filterTerm }});
  }

  removeDog(index) {
    this.dogs.splice(index, 1);
  }

  toggleDate() {
    this.dateFormat == 'fullDate' ? this.dateFormat = 'shortDate' : this.dateFormat = 'fullDate';
  }

  selectDog(dog: Dog){
    this.selectedDog = dog;
    console.log(this.selectedDog);
  }

  handleAddWalk(walk) {
    this.dogsService.addWalk(this.selectedDog, walk);
  }

}
