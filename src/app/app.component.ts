import { Component,OnInit } from '@angular/core';
import { Cart } from './models/cart.model';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  template: `<app-header [cart]="cart"></app-header>
  <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent  implements OnInit{
  cart: Cart = { items: []};


  // above in the template html we are passing the cart to header component
  constructor(private cartService: CartService) {}
// here behaviour subject coming to play taking info from our header component to dispalaye them here by subscribing to our observable & receiving the _cart from headercomponent
  ngOnInit() {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    })
  }
}
