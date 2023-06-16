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
    // console.log(this.cart.value);
    
  }

  
  getTotal(items: Array<CartItem>):number { 
    return items.
    map((item) => item.price * item.quantity)
    .reduce((prev, current) => prev + current, 0);

  }
  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open('Cart is cleared.', 'Ok', {
      duration:3000
    })
  }
  removeFromCart(item: CartItem): void{
     const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
     );
     this.cart.next({ items: filteredItems});
     this._snackBar.open('1 Item removed from cart.', 'Ok', {
      duration:3000
    })
   }
}
