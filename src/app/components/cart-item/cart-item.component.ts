import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent {
  @Input() cartItem!: CartItem;
  @Output() remove = new EventEmitter<void>();
  @Output() updateQuantity = new EventEmitter<number>();

  constructor(private cartService: CartService) {}

  get amount(): number {
    return this.cartItem.product.price * this.cartItem.quantity;
  }

  increment(): void {
    this.cartItem.quantity++;
    this.updateQuantity.emit(this.cartItem.quantity);
    this.updateAmount();
  }

  decrement(): void {
    if (this.cartItem.quantity > 1) {
      this.cartItem.quantity--;
      this.updateQuantity.emit(this.cartItem.quantity);
      this.updateAmount();
    }
  }

  quantityChanged(): void {
    this.updateQuantity.emit(this.cartItem.quantity);
    this.updateAmount();
  }

  updateAmount(): void {
    this.cartService.updateCartItem(
      this.cartItem.product.id,
      this.cartItem.quantity
    );
  }

  removeItem(): void {
    this.remove.emit();
  }
}
