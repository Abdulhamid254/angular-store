import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: `filters.component.html`,
  
})
export class FiltersComponent implements OnInit {
    // output is an event emmiter that helps us send data out of our components to the parent component

  @Output() showCategory = new EventEmitter<string>();


  categories = ['shoes','clarks','brocks']
  constructor() { }

  ngOnInit(): void {
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }

}
