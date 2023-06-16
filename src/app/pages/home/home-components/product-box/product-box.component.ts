import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-box',
  templateUrl: `./product-box.component.html`,
  styles: [
  ]
})
export class ProductBoxComponent implements OnInit {
 // full widthmode here is we want when we show only one item per row that it should take the maximum available space
  @Input() fullWidthMode = false;

  constructor() { }

  ngOnInit(): void {
  }

}
