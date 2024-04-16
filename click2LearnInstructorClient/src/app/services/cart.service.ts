import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: any[] = [];
  private cartItemsSubject = new BehaviorSubject<any[]>([]);

  constructor( private toastr: ToastrService) {}

  addToCart(item: any): void {
    const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      // Show toaster message here
      console.log('Item already added to cart');
      this.toastr.success('Item already added to cart');
      return;
    }
    this.cartItems.push(item);
    this.cartItemsSubject.next([...this.cartItems]);
  }

  removeFromCart(item: any): void {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
    this.cartItemsSubject.next([...this.cartItems]);
  }

  getCartItems(): BehaviorSubject<any[]> {
    return this.cartItemsSubject;
  }

  // Method to check if a course is already in the cart
  isCourseInCart(course: any): boolean {
    return this.cartItems.some(item => item.id === course.id);
  }

  // Method to clear all items from the cart
  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next([...this.cartItems]);
  }

}
