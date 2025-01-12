import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, CartItemComponent, FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  cartItems$;
  cartSummary$;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {
    this.cartItems$ = this.cartService.cartItems$;
    this.cartSummary$ = this.cartService.cartSummary$;
  }

  ngOnInit(): void {
    this.cartItems$.subscribe((cartItems) => {
      this.cartService.updateCartSummary();
    });
  }

  handleVoucherInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const cartSummary = this.cartService.cartSummary;

    if (input.value.length > 15) {
      cartSummary.voucher = input.value.substring(0, 15);
    } else {
      cartSummary.voucher = input.value;
    }

    this.cartService.cartSummary = cartSummary;
  }

  applyVoucher(): void {
    const cartSummary = this.cartService.cartSummary;

    if (cartSummary.voucher) {
      cartSummary.discountPercentage = (cartSummary.voucher.length % 5) + 1;
      cartSummary.voucherMessage = `Voucher '${cartSummary.voucher}' applied.`;
      cartSummary.voucherApplied = true;
      this.cartService.cartSummary = cartSummary;
      this.cartService.updateCartSummary();
    }
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.resetVoucher();
  }

  resetVoucher(): void {
    const cartSummary = this.cartService.cartSummary;
    cartSummary.voucher = '';
    cartSummary.discountPercentage = 0;
    cartSummary.voucherApplied = false;
    this.cartService.cartSummary = cartSummary;
    this.cartService.updateCartSummary();
  }

  updateCartItem(productId: number, quantity: number): void {
    this.cartService.updateCartItem(productId, quantity);
    this.resetVoucher();
  }
}
