// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: { product: any, quantity: number }[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
   
    const cartData = localStorage.getItem('cart');

    if (cartData) {
      this.cart = JSON.parse(cartData);
    }
  }

  increaseQuantity(item: { product: any, quantity: number }) {
    item.quantity++;
    this.saveCart();
  }

  decreaseQuantity(item: { product: any, quantity: number }) {
    if (item.quantity > 1) {
      item.quantity--;
      this.saveCart();
    }
    if(item.quantity === 1){
      this.removeFromCart(item);
    }
  }

  removeFromCart(item: { product: any, quantity: number }) {
    const index = this.cart.indexOf(item);
    if (index !== -1) {
      this.cart.splice(index, 1);
      this.saveCart();
    }
  }
  total(): number {
    let totalPrice = 0;
    for (const item of this.cart) {
      totalPrice += item.product.price * item.quantity;
    }
    return totalPrice;
  }
  estimatedDeliveryDate(): Date {
    const today = new Date();
    return new Date(today.setDate(today.getDate() + 7));
  }
  saveCart() {
  
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
  nav(){
    this.router.navigate(['/products']);
  }
}
