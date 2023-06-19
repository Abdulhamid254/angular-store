import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';


const ROWS_HEIGHT:{[id:number]:number} ={ 1: 400, 3: 335, 4: 350} //created a variable to dynamically change height of rows based on items selected

@Component({
  selector: 'app-home',
  templateUrl: `./home.component.html`,
 
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '12';
  productsSubscription: Subscription | undefined;


  // productsSubscription prevents memory leaks unsubscribes from our observable

  //we are able to use the colsNum here because we used the output event emmitter to share data from the products-header to the this home component
   images = [
    {
      url:'https://links.papareact.com/gi1',
      title: 'pic1',
    },
    {
      url:'https://links.papareact.com/6ff',
      title: 'pic2',
    },
    {
      url:'https://links.papareact.com/7ma',
      title: 'pic3',
    }
   ]
  constructor(private cartService: CartService, private storeService: StoreService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productsSubscription = this.storeService.getAllProducts(this.count, this.sort,this.category)
    .subscribe((_products) =>{
      this.products = _products;
      // the _ infront of product is for making it private;
    });
  }

  onColumnsCountChange(colsNum: number){
    this.cols = colsNum;
    this.rowHeight =ROWS_HEIGHT[this.cols];

  }

  onShowCategory(newCategory: string):void{
      this.category = newCategory;
      this.getProducts();
  }

  onAddToCart(product: Product):void{
     this.cartService.addToCart({
      product: product.image,
      name:product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
     })
  }
  onItemsCountChange(newCount:number): void {
    this.count = newCount.toString();
    this.getProducts();
  }
  onSortChange(newSort:string): void{
    this.sort = newSort;
    this.getProducts();
  }
 
  //function for unsubscribing from observables to prevent memory leaks
  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

}
