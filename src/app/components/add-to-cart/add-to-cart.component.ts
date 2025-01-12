import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css'],
})
export class AddToCartComponent {
  @Input() product!: Product;
  quantity: number = 1;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  increment(): void {
    this.quantity++;
  }

  decrement(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    this.cartService.addToCart(this.product, this.quantity);
    this.router.navigate(['/cart']);
  }
}
