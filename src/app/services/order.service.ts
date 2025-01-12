import { Injectable } from '@angular/core';
import { OrderInformation } from '../models/order.model';
import { UserInformation } from '../models/user.model';
import { CartItem, CartSummary } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly orderFilePath = '/assets/output/order.json';

  saveOrder(userInfo: UserInformation, cartItems: CartItem[], cartSummary: CartSummary): void {
    const orderData: OrderInformation = {
      userInfo,
      cartItems,
      cartSummary,
      orderDate: new Date().toISOString()
    };

    // Load existing orders
    console.log('Loading existing orders');
    const existingOrders = this.loadOrders();
    console.log('Existing Orders:', existingOrders);

    existingOrders.push(orderData);

    // Save updated orders
    this.saveOrders(existingOrders);
    console.log('Order data saved:', orderData);
  }

  loadOrders(): OrderInformation[] {
    const orderData = localStorage.getItem('orderData');
    return orderData ? JSON.parse(orderData) : [];
  }

  saveOrders(orders: OrderInformation[]): void {
    localStorage.setItem('orderData', JSON.stringify(orders));
    console.log('Orders saved to localStorage:', orders);
  }
}
