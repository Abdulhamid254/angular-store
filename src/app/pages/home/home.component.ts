import { Component, OnInit } from '@angular/core';


const ROWS_HEIGHT:{[id:number]:number} ={ 1: 400, 3: 335, 4: 350} //created a variable to dynamically change height of rows based on items selected

@Component({
  selector: 'app-home',
  templateUrl: `./home.component.html`,
 
})
export class HomeComponent implements OnInit {
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;

  //we are able to use the colsNum here because we used the output event emmitter to share data from the products-header to the this home component

  constructor() { }

  ngOnInit(): void {
  }

  onColumnsCountChange(colsNum: number){
    this.cols = colsNum;
    this.rowHeight =ROWS_HEIGHT[this.cols];

  }

  onShowCategory(newCategory: string):void{
      this.category = newCategory;
  }

}
