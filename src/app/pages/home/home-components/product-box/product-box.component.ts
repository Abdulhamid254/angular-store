import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: `./product-box.component.html`,
  styles: [
  ]
})
export class ProductBoxComponent implements OnInit {
 // full widthmode here is we want when we show only one item per row that it should take the maximum available space
  @Input() fullWidthMode = false;
  product: Product | undefined = {
      id: 1,
    title: 'snickers',
    price: 150,
    category: 'Shoes',
    description: 'Description',
    image: 'https://via.placeholder.com/150',
  }

  //oUTput helps us add event emitter for communication purposes between the child & parent component...like for us to be able to use this addtocart method in the home component
  @Output() addToCart = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }


  // the on addtocart method is going to emit the product we get from the @input

  onAddToCart(): void {
     this.addToCart.emit(this.product);
  }
}
