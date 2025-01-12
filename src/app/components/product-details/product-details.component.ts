import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, AddToCartComponent],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = Number(params.get('id'));
      this.productService.getProducts().subscribe((products: Product[]) => {
        this.product = products.find(p => p.id === productId);
        console.log('Fetched product:', this.product);  // Log to verify
      });
    });
  }

  addToCart(): void {
    console.log('Product added to cart:', this.product);
  }
}
