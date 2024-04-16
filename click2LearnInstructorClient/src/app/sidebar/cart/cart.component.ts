import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

declare var paypal: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  amount: number = 10; // The amount to be paid
  paypalRendered: boolean = false;
  paypalButtonContainer: any;
  paymentSuccess: boolean = false;

  @ViewChild('paypalPopup') paypalPopup!: ElementRef;

  isGreyTheme = true;

  cartItems: any[] = [];

  constructor(
    private cartService: CartService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });
  }

  removeFromCart(item: any): void {
    this.cartService.removeFromCart(item);
  }

  openPaypalPopup() {
    // Open the PayPal popup
    this.paypalPopup.nativeElement.style.display = 'block';

    // Render the PayPal button if not already rendered
    if (!this.paypalRendered) {
      this.renderCreditCardPayment();
      this.paypalRendered = true;
    }
  }

  closePaypalPopup() {
    // Close the PayPal popup
    this.paypalPopup.nativeElement.style.display = 'none';
  }

  renderCreditCardPayment(): void {
    this.paypalButtonContainer = document.getElementById(
      'paypal-button-container'
    );
    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.amount.toFixed(2),
                  currency_code: 'USD',
                },
              },
            ],
          });
        },
        onApprove: async (data: any, actions: any) => {
          const order = await actions.order.capture();
          console.log('Payment successful:', order);
          this.toastr.success('Payment successful');
          this.toastr.success('Courses Purchased Successfully');
          this.purchaseItems();
          this.closePaypalPopup();
        },
        onError: (err: any) => {
          //console.error('An error occurred during payment:', err);
          this.toastr.error('An error occurred during payment:', err.JSON.stringify());
        },
      })
      .render(this.paypalButtonContainer);
  }

  buyNow(): void {
    this.renderCreditCardPayment();
  }

  purchaseItems() {
    debugger
    const existingCoursesStr = localStorage.getItem('courses');
    let existingCourses: any[] = [];
    if (existingCoursesStr) {
      existingCourses = JSON.parse(existingCoursesStr);
    }

    existingCourses.push(...this.cartItems);
    localStorage.setItem('courses', JSON.stringify(existingCourses));

    this.cartService.clearCart();

    this.cartItems = [];

    this.router.navigate(['/course']);
  }
}
