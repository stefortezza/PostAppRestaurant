import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

declare var Stripe: any; // Dichiarazione per TypeScript

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, AfterViewInit {
  stripe: any;
  handler: any = null;
  $membership: Observable<any> | undefined;
  order: any = {
    items: [],
    totalPrice: 0,
    note: '',
  };

  deliveryMethod: string;
  selectedPaymentMethod!: string;
  deliveryAddress: any = {
    address: '',
    streetNumber: '',
    city: '',
  };

  apiUrl = 'assets/db.json';
  tableDetails: any;

  @ViewChild('checkoutButton') checkoutButton!: ElementRef;

  constructor(private http: HttpClient, private router: Router, private elementRef: ElementRef) {
    this.deliveryMethod =
      this.router.getCurrentNavigation()?.extras.state?.['deliveryMethod'] ||
      'N/A';
  }

  ngOnInit(): void {
    this.getOrder().subscribe((data) => {
      this.order.items = data.items;
      this.order.totalPrice = data.totalPrice;
      this.loadStripe();
    });
  }

  ngAfterViewInit(): void {
    if (this.checkoutButton && this.checkoutButton.nativeElement) {
      this.checkoutButton.nativeElement.addEventListener('click', this.pay.bind(this));
    } else {
      console.error('Element with ID "checkout-button" not found or undefined.');
    }
  }

  getOrder() {
    return this.http.get<any>(`${this.apiUrl}/order`);
  }

  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod = method;
    console.log('Metodo di pagamento selezionato:', method);
  }

  updateDeliveryAddress() {
    this.deliveryMethod = `Consegna a domicilio - ${this.deliveryAddress.address}, ${this.deliveryAddress.streetNumber}, ${this.deliveryAddress.city}`;
  }

  pay(paymentForm: NgForm) {
    const { amount, description } = paymentForm.value;

    var stripe = Stripe('pk_live_51PQVYYRtQw0gA7BPOekeg9hUCr6yfHtiq4ZNta4wlDZegKHDV7aRhUjcS7j9RoxsBpDQsVy7QgCgWSRrnKDnUkys00WnNSG5bY', {
      betas: ['checkout_beta_4']
    });

    stripe.redirectToCheckout({
      items: [{ sku: 'sku_EouPQJ6eEYCU1q', quantity: 1 }],
      successUrl: 'https://formhero.com/',
      cancelUrl: 'https://formhero.com/',
    })
    .then(function (result: any) {
      if (result.error) {
        var displayError = document.getElementById('error-message');
        if (displayError) {
          displayError.textContent = result.error.message;
        }
      }
    });
  }

  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_live_51PQVYYRtQw0gA7BPOekeg9hUCr6yfHtiq4ZNta4wlDZegKHDV7aRhUjcS7j9RoxsBpDQsVy7QgCgWSRrnKDnUkys00WnNSG5bY',
          locale: 'auto',
          token: function (token: any) {
            console.log(token);
            alert('Payment Success!!');
          }
        });
      };

      window.document.body.appendChild(s);
    }
  }
}
