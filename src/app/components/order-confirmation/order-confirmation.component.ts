import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { OrderService } from '../../services/order.service';
import { UserInformation } from '../../models/user.model';
import { OrderInformation } from '../../models/order.model';
import { CheckoutOrderInfoComponent } from '../checkout-order-info/checkout-order-info.component';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, CheckoutOrderInfoComponent],
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  orderInformation: OrderInformation | null = null;

  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder(): void {
    const orders = this.orderService.loadOrders();
    if (orders.length > 0) {
      this.orderInformation = orders[orders.length - 1];
    }
  }

  backToHome(): void {
    this.router.navigate(['/']);
  }
}
