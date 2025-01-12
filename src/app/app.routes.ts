import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order-confirmation', component: OrderConfirmationComponent },
];
