import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: `./products-header.component.html`,
  
})
export class ProductsHeaderComponent implements OnInit {
  // output is an event emmiter that helps us send data out of our components to the parent component
  @Output() columnsCountChange = new EventEmitter<number>();
   @Output() itemsCountChange = new EventEmitter<number>();
    @Output() sortChange = new EventEmitter<string>();

   sort = 'desc';
   itemsShowCount = 12;
   // sort variable by default having the property desending as the default
  constructor() { }

  ngOnInit(): void {
  }

  // method for updating the sort
  onSortUpdated(newSort: string):void {
       this.sort = newSort;
       this.sortChange.emit(newSort);
  }

  onItemsUpdated(count: number): void {
    this.itemsShowCount = count;
    this.itemsCountChange.emit(count);
  }
  //mehod for updating our layout
  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }

}
