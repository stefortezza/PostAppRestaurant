import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  getNote(): string {
    throw new Error('Method not implemented.');
  }
  getDeliveryMethod(): string {
    throw new Error('Method not implemented.');
  }
  getDeliveryDetails(): string {
    throw new Error('Method not implemented.');
  }
  private items: any[] = [];
  setItems: any;

  addItem(item: any) {
    this.items.push(item);
  }

  getItems() {
    return this.items;
  }

  clearItems() {
    this.items = [];
  }
}