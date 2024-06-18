import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  selectDeliveryMethod(arg0: string) {
    throw new Error('Method not implemented.');
  }
  updateTableDetails() {
    throw new Error('Method not implemented.');
  }
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
  handler:any = null;

  constructor(private http: HttpClient, private router: Router) {
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

 
  pay(amount: any) {    
 
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token)
        alert('Token Created!!');
      }
    });
 
    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: amount * 100
    });
 
  }
 
  loadStripe() {
     
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_live_51PQVYYRtQw0gA7BPOekeg9hUCr6yfHtiq4ZNta4wlDZegKHDV7aRhUjcS7j9RoxsBpDQsVy7QgCgWSRrnKDnUkys00WnNSG5bY',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }
       
      window.document.body.appendChild(s);
    }
  }
}
