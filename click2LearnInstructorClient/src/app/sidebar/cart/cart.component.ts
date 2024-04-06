import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

declare var paypal: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnDestroy {

  amount: number = 104; // The amount to be paid
  paypalRendered: boolean = false;
  paypalButtonContainer: any;

  @ViewChild('paypalPopup') paypalPopup!: ElementRef;

  constructor() {}

  items = [
    { name: 'Course 1: Angular', quantity: 0, image: 'assets/book1.jpg' },
    { name: 'Course 2: React', quantity: 0, image: 'assets/book2.jpg' }
  ];
  isGreyTheme = true;

  ngOnDestroy() {
    // Clean up the rendered PayPal button if the component is destroyed
    if (this.paypalRendered) {
      this.paypalButtonContainer.innerHTML = '';
      this.paypalRendered = false;
    }
  }

  incrementItem(item: any) {
    item.quantity++;
  }

  decrementItem(item: any) {
    if (item.quantity > 0) {
      item.quantity--;
    }
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
    this.paypalButtonContainer = document.getElementById('paypal-button-container');
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.amount.toFixed(2),
              currency_code: 'USD'
            }
          }]
        });
      },
      onApprove: async (data: any, actions: any) => {
        const order = await actions.order.capture();
        console.log('Payment successful:', order);
        // You can perform additional actions here, e.g., show a success message
        this.closePaypalPopup(); // Close the popup after successful payment
      },
      onError: (err: any) => {
        console.error('An error occurred during payment:', err);
        // Handle errors, e.g., display an error message to the user
      }
    }).render(this.paypalButtonContainer);
  }
}
