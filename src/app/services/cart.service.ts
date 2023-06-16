import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  // behavioursubject which allows components to subscribe and receive updates whenever the cart's value changes
  cart = new BehaviorSubject<Cart>({items: []})

  constructor( private _snackBar: MatSnackBar) { }


  addToCart(item: CartItem): void {
    // accessing the beahvioursubject with the value
    // new array items created by spreading current items in cart
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.id === item.id);

    if (itemInCart) {
      itemInCart.quantity +=1;
    }else {
      items.push(item);
    }
    // emmiting this value so that any of the component that is subscribed to the cart can catch the value
    this.cart.next({items});
    this._snackBar.open('1 item added to cart.','Ok', {duration:3000});
    console.log(this.cart.value);
    
  }
}
