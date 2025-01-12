import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';
import { OrderService } from '../../services/order.service';
import { UserInformation } from '../../models/user.model';
import { CartItem, CartSummary } from '../../models/cart.model';
import { CheckoutFormComponent } from '../checkout-form/checkout-form.component';
import { CheckoutOrderInfoComponent } from '../checkout-order-info/checkout-order-info.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, CheckoutFormComponent, CheckoutOrderInfoComponent],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  userInformation: UserInformation;
  cartItems: CartItem[] = [];
  cartSummary: CartSummary = {} as CartSummary;

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {
    this.userInformation = this.userService.userInfo;
  }

  ngOnInit(): void {
    this.userService.userInfo$.subscribe(info => {
      this.userInformation = info;
    });

    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });

    this.cartService.cartSummary$.subscribe(summary => {
      this.cartSummary = summary;
    });
  }

  submitOrder(): void {
    console.log('Submit order event received');
    
    if(this.cartItems.length === 0) {
      console.log('Empty cart. Not able to submit.', this.userInformation);
      alert('Cart is empty! No Order has not been submitted yet!');
      this.router.navigate(['/cart']);
    } else {

      this.userService.saveUserInfo(this.userInformation);
      this.orderService.saveOrder(this.userInformation, this.cartItems, this.cartSummary);

      // Handle order submission logic
      console.log('Order submitted', this.userInformation);
      alert('Order successfully submitted!');
      
      // Clear the cart after showing the success message
      this.cartService.clearCart();
      console.log('Cart cleared');

      this.router.navigate(['/order-confirmation']);
    }
  }
}
