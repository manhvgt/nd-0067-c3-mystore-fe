import { UserInformation } from './user.model';
import { CartItem, CartSummary } from './cart.model';

export interface OrderInformation {
  userInfo: UserInformation;
  cartItems: CartItem[];
  cartSummary: CartSummary;
  orderDate: string;
}
