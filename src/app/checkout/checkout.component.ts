import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ICreateOrderRequest, IPayPalConfig, ITransactionItem, NgxPayPalModule } from 'ngx-paypal';
import { OrderService } from '../service/order.service';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-checkout',
  standalone: true,  
  imports: [CommonModule, FormsModule, NgxPayPalModule], 
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
[x: string]: any;
  checkoutForm: FormGroup | undefined;
  public payPalConfig?: IPayPalConfig;
  showSuccess: boolean = false;
  items: any[] = [];
  total: number = 0;

  constructor(private formBuilder: FormBuilder, private orderService: OrderService) {}

  ngOnInit(): void {
    this.items = this.orderService.getItems() || [];
    console.log(this.items);
    this.initConfig();
    this.calculateTotal();
  }

  private calculateTotal(): void {
    this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'ATF1Y-FYqsWus4uXeOJQPl_wti-VJ35EBGYc9QvhktPoRmY4f_W94xkbUesPm0bzcvjjCDVa4-vJbLCw',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: this.total.toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: this.total.toFixed(2)
                }
              }
            },
            items: this.items.map(x => <ITransactionItem><unknown>{
              name: x.title, 
              quantity: x.quantity.toString(),
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: (x.price * x.quantity).toFixed(2)
              },
            })
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}
