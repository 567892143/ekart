import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  cart: { product: any, quantity: number }[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.fetchProducts();
    this.loadCartFromStorage(); 
  }

  fetchProducts() {
    fetch('assets/products.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        this.products = data;
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  addToCart(product: any) {

    const index = this.cart.findIndex(item => item.product.name === product.name);
     if (index !== -1) {
     
      this.cart[index].quantity++;
    } else {
      
      this.cart.push({ product: product, quantity: 1 });
    }
    this.saveCart();
  }
  
  increaseQuantity(product: any) {
    const index = this.cart.findIndex(item => item.product.name === product.name);
    if (index !== -1) {
      this.cart[index].quantity++;
      this.saveCart();
    }
  }
  
  decreaseQuantity(product: any) {
    const index = this.cart.findIndex(item => item.product.name === product.name);
    if (index !== -1) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--;
        this.saveCart();
      } else {
       
        this.cart.splice(index, 1);
        this.saveCart();
      }
    }
  }
  

  goToCart() {
    console.log("Navigating to cart...");
    this.router.navigate(['/cart']);
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  loadCartFromStorage() {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this.cart = JSON.parse(cartData);
    }
  }

  isProductInCart(product: any): boolean {
    return this.cart.some(item => item.product.name === product.name);
  }

  getProductQuantity(product: any): number {
    const cartItem = this.cart.find(item => item.product.name === product.name);
    return cartItem ? cartItem.quantity : 0;
  }
}
