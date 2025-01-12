import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, CartSummary } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(
    this.getCartItemsFromLocalStorage()
  );
  cartItems$ = this.cartItemsSubject.asObservable();

  private cartSummarySubject = new BehaviorSubject<CartSummary>(
    this.getCartSummaryFromLocalStorage()
  );
  cartSummary$ = this.cartSummarySubject.asObservable();

  get cartItems(): CartItem[] {
    return this.cartItemsSubject.getValue();
  }

  set cartItems(items: CartItem[]) {
    this.cartItemsSubject.next(items);
    this.updateCartSummary();
    this.saveCartItemsToLocalStorage(items);
  }

  get cartSummary(): CartSummary {
    return this.cartSummarySubject.getValue();
  }

  set cartSummary(summary: CartSummary) {
    this.cartSummarySubject.next(summary);
    this.saveCartSummaryToLocalStorage(summary);
  }

  addToCart(product: Product, quantity: number): void {
    const existingItem = this.cartItems.find(
      (cartItem) => cartItem.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newItem: CartItem = { product, quantity };
      this.cartItems = [...this.cartItems, newItem];
    }
    this.updateCartSummary();
  }

  removeFromCart(productId: number): void {
    const updatedItems = this.cartItems.filter(
      (item) => item.product.id !== productId
    );
    this.cartItems = updatedItems;
  }

  updateCartItem(productId: number, quantity: number): void {
    const updatedItems = this.cartItems.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    this.cartItems = updatedItems;
  }

  public updateCartSummary(): void {
    const cartItems = this.cartItems;
    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    const discountAmount =
      (totalAmount * this.cartSummary.discountPercentage) / 100;
    const payableAmount = totalAmount - discountAmount;

    this.cartSummary = {
      ...this.cartSummary,
      totalAmount,
      discountAmount,
      payableAmount,
      cartLength: cartItems.length,
    };
    this.saveCartSummaryToLocalStorage(this.cartSummary);
  }

  clearCart(): void {
    this.cartItems.forEach((item) => {
      this.removeFromCart(item.product.id);
    });
    this.updateCartSummary();
    this.cartSummary.voucherApplied = false;
    this.cartSummary.voucherMessage = '';
    this.cartSummary.voucher = '';
    this.cartSummary.discountPercentage = 0;
  }

  private saveCartItemsToLocalStorage(items: CartItem[]): void {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }

  private getCartItemsFromLocalStorage(): CartItem[] {
    const items = localStorage.getItem('cartItems');
    return items ? JSON.parse(items) : [];
  }

  private saveCartSummaryToLocalStorage(summary: CartSummary): void {
    localStorage.setItem('cartSummary', JSON.stringify(summary));
  }

  private getCartSummaryFromLocalStorage(): CartSummary {
    const summary = localStorage.getItem('cartSummary');
    return summary
      ? JSON.parse(summary)
      : {
          totalAmount: 0,
          discountPercentage: 0,
          discountAmount: 0,
          payableAmount: 0,
          voucherApplied: false,
          voucher: '',
          voucherMessage: '',
          cartLength: 0,
        };
  }
}
