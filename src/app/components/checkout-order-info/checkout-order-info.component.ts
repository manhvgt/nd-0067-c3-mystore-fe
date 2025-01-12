import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartItem, CartSummary } from '../../models/cart.model';

@Component({
  selector: 'app-checkout-order-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout-order-info.component.html',
  styleUrls: ['./checkout-order-info.component.css']
})
export class CheckoutOrderInfoComponent {
  @Input() cartItems: CartItem[] = [];
  @Input() cartSummary = {
    totalAmount: 0,
    discountAmount: 0,
    payableAmount: 0
  } as CartSummary;
  @Input() showEditButton: boolean = true;

  constructor(private router: Router) {}

  getAmount(item: CartItem): number {
    return item.product.price * item.quantity;
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }
}
