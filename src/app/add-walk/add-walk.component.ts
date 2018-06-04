import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { Dog } from '../dog';
import Walk from '../walk';

@Component({
  selector: 'app-add-walk',
  templateUrl: './add-walk.component.html',
  styleUrls: ['./add-walk.component.scss']
})
export class AddWalkComponent implements OnInit, OnChanges {

  @Input() dog : Dog = new Dog();
  @Output() walkAdded : EventEmitter<Walk> = new EventEmitter();
  description: string;

  constructor() { }

  ngOnChanges(changes) {
    console.log('changed! ' + JSON.stringify(changes));
  }

  ngOnInit() {
  }

  submit() {
    let newWalk = new Walk(new Date(), this.description);
    this.walkAdded.emit(newWalk);
  }

}
