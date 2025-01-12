import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, RouterModule, AddToCartComponent],
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product!: Product;

  addToCart(): void {
    console.log('Product added to cart:', this.product);
  }
}
