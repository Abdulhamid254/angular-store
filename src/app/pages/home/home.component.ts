import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: `./home.component.html`,
 
})
export class HomeComponent implements OnInit {
  cols = 3;

  //we are able to use the colsNum here because we used the output event emmitter to share data from the products-header to the this home component

  constructor() { }

  ngOnInit(): void {
  }

  onColumnsCountChange(colsNum: number){
    this.cols = colsNum;
  }

}
