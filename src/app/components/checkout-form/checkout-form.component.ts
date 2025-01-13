import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserInformation } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css'],
})
export class CheckoutFormComponent {
  userInformation: UserInformation;
  @Output() submitOrder = new EventEmitter<void>();

  nameInvalid = false;
  emailInvalid = false;
  phoneNumberInvalid = false;
  cardNumberInvalid = false;
  cardNameInvalid = false;
  validationDateInvalid = false;
  securityCodeInvalid = false;
  addressInvalid = false;

  constructor(private userService: UserService) {
    this.userInformation = this.userService.userInfo;
  }

  validatePhoneNumber(value: string): void {
    this.userInformation.phoneNumber = value.replace(/[^\d\+]/g, '').substring(0, 12);
    this.phoneNumberInvalid = !(this.userInformation.phoneNumber.length >= 8 && this.userInformation.phoneNumber.length <= 12 && /^\+?[0-9]{8,12}$/.test(this.userInformation.phoneNumber));
  }

  validateCardNumber(value: string): void {
    this.userInformation.cardNumber = value.replace(/\D/g, '').substring(0, 16);
    this.cardNumberInvalid = !(this.userInformation.cardNumber.length === 16 && /^[0-9]{16}$/.test(this.userInformation.cardNumber));
  }

  validateSecurityCode(value: string): void {
    this.userInformation.securityCode = value.replace(/\D/g, '').substring(0, 4);
    this.securityCodeInvalid = !(this.userInformation.securityCode.length >= 3 && this.userInformation.securityCode.length <= 4 && /^[0-9]{3,4}$/.test(this.userInformation.securityCode));
  }

  validateForm(): boolean {
    this.nameInvalid = !/^[a-zA-Z\s]+$/.test(this.userInformation.name);
    this.emailInvalid = !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(this.userInformation.email);
    this.phoneNumberInvalid = !(this.userInformation.phoneNumber.length >= 8 && this.userInformation.phoneNumber.length <= 12 && /^\+?[0-9]{8,12}$/.test(this.userInformation.phoneNumber));
    this.cardNumberInvalid = !(this.userInformation.cardNumber.length === 16 && /^[0-9]{16}$/.test(this.userInformation.cardNumber));
    this.cardNameInvalid = !/^[a-zA-Z\s]+$/.test(this.userInformation.cardName);
    const currentDate = new Date();
    const [year, month] = this.userInformation.validationDate
      .split('-')
      .map(Number);
    const validationDate = new Date(year, month - 1);
    this.validationDateInvalid = !this.userInformation.validationDate || validationDate < currentDate || (validationDate.getMonth() !== currentDate.getMonth() && validationDate < currentDate);
    this.securityCodeInvalid = !(this.userInformation.securityCode.length >= 3 && this.userInformation.securityCode.length <= 4 && /^[0-9]{3,4}$/.test(this.userInformation.securityCode));
    this.addressInvalid = this.userInformation.address.trim() === '';

    return (
      !this.nameInvalid &&
      !this.emailInvalid &&
      !this.phoneNumberInvalid &&
      !this.cardNumberInvalid &&
      !this.cardNameInvalid &&
      !this.validationDateInvalid &&
      !this.securityCodeInvalid &&
      !this.addressInvalid
    );
  }

  submitForm(form: NgForm): void {
    console.log('Form submit event triggered');
    if (this.validateForm()) {
      console.log('Form is valid. Trigger to service.');
      this.submitOrder.emit();
    } else {
      console.log('Form is invalid');
      alert('Please correct the form errors before submitting.');
    }
  }
}
