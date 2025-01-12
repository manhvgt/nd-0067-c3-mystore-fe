import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutOrderInfoComponent } from './checkout-order-info.component';

describe('CheckoutOrderInfoComponent', () => {
  let component: CheckoutOrderInfoComponent;
  let fixture: ComponentFixture<CheckoutOrderInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutOrderInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutOrderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
