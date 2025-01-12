import { Product } from './product.model';

export interface CartItem {
    product: Product;
    quantity: number;
  }
  
export interface CartSummary {
  totalAmount: number;
  discountPercentage: number;
  discountAmount: number;
  payableAmount: number;
  voucherApplied: boolean;
  voucher: string;
  voucherMessage: string;
  cartLength: number;
}
  