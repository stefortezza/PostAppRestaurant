import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddToOrderModalComponent } from '../add-to-order-modal/add-to-order-modal.component';
import { DataService } from 'src/app/service/data-service';
import { Antipasti, Ingredient, OptionalIngredient } from 'src/interfaces/antipasti'; // Assicurati che il percorso sia corretto per i tuoi file di interfaccia
import { ConcludiOrdineModalComponent } from '../concludi-ordine-modal/concludi-ordine-modal.component';

interface OrderItem {
  quantity: number;
  price: number;
  description: string;
  id: number;
  title: string;
  ingredienti: Ingredient[];
  opzionali: OptionalIngredient[];
  priceOpzionale: number;
  image: string;
  link: string;
  editMode?: boolean;
}

@Component({
  selector: 'app-antipasti',
  templateUrl: './antipasti.component.html',
  styleUrls: ['./antipasti.component.scss'],
})
export class AntipastiComponent implements OnInit {
  antipasti: Antipasti[] = [];
  order: OrderItem[] = [];
  optionalIngredients: OptionalIngredient[] = [];
  totalOrderPrice: number = 0;
  currentOrderItem: OrderItem | null = null;

  deliveryCharge = {
    title: 'Consegna a domicilio',
    price: 2.0,
    id: -1,
    quantity: 1,
    description: 'Consegna a domicilio',
    ingredienti: [],
    opzionali: [],
    priceOpzionale: 2.0,
    image: '',
    link: '',
  };
  categories: any;
  errorMessage: string | undefined;

  constructor(private dialog: MatDialog, private dataService: DataService) {}

  ngOnInit() {
    this.fetchCategories();    
  }

  fetchCategories() {
    this.dataService.fetchData('categories').subscribe(
      (data) => {
        this.categories = data;
        this.antipasti = data;
      },
      (error) => {
        console.error('Errore durante il recupero delle categorie:', error);
        if (error.status === 0) {
          this.errorMessage = 'Errore: impossibile connettersi al server.';
        } else if (error.status === 403) {
          this.errorMessage = 'Errore 403: Accesso vietato. Verifica i permessi e il token.';
        } else {
          this.errorMessage = `Errore ${error.status}: ${error.message}`;
        }
      }
    );
  }

  selectDeliveryMethod(method: string): void {
    if (method === 'Consegna a domicilio') {
      this.addDeliveryCharge();
    } else {
      this.removeDeliveryCharge();
    }
  }

  addDeliveryCharge(): void {
    const existingDeliveryCharge = this.order.find(
      (item) => item.id === this.deliveryCharge.id
    );
    if (!existingDeliveryCharge) {
      this.order.push(this.deliveryCharge);
      this.updateTotalOrderPrice();
    }
  }

  removeDeliveryCharge(): void {
    const index = this.order.findIndex(
      (item) => item.id === this.deliveryCharge.id
    );
    if (index !== -1) {
      this.order.splice(index, 1);
      this.updateTotalOrderPrice();
    }
  }

  openAddToOrderModal(category: Antipasti): void {
    console.log('openAddToOrderModal called with category:', category);
    const dialogRef = this.dialog.open(AddToOrderModalComponent, {
      width: '500px',
      data: this.convertToOrderItem(category),
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addToOrder(result);
      }
    });
  }

  openConcludiOrdineModal(): void {
    const dialogRef = this.dialog.open(ConcludiOrdineModalComponent, {
      width: '500px',
      height: '400px',
      data: {
        addDeliveryCharge: () => this.addDeliveryCharge(),
        removeDeliveryCharge: () => this.removeDeliveryCharge(),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  convertToOrderItem(category: Antipasti): OrderItem {
    const priceString = category.price ? category.price.toString() : '';
    const priceNumber = parseFloat(priceString.replace('€', '').trim());
    
    const opzionali = category.opzionali.map((opzionale: any) => ({
      name: opzionale.name,
      selected: opzionale.selected,
      priceOpzionale: opzionale.priceOpzionale || 0, // Assicurati che priceOpzionale sia presente o assegna un valore di default
      price: opzionale.price || 0, // Assicura che ci sia una proprietà price
    }));
    
    const ingredienti = category.ingredienti.map((ingredient: any) => ({
      name: ingredient.name,
      selected: ingredient.selected,
    }));
    
    return {
      id: category.categoryId || 0, // Assicura che categoryId sia presente o assegna un valore di default
      price: priceNumber,
      title: category.title || '',
      description: category.title || '',
      priceOpzionale: priceNumber,
      quantity: 1,
      ingredienti: ingredienti,
      opzionali: opzionali,
      image: category.image || 'assets/img/default-image.png',
      link: category.link || '',
    };
  }
  

  deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  addToOrder(category: OrderItem) {
    console.log('addToOrder called with category:', category);
    category.priceOpzionale = this.calculatePrice(category);
    const existingItem = this.order.find((item) =>
      this.areEqualOrders(item, category)
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      const newItem = this.deepCopy(category);
      this.order.push(newItem);
    }
    this.updateTotalOrderPrice();
  }

  areEqualOrders(order1: OrderItem, order2: OrderItem): boolean {
    if (
      order1.ingredienti.length !== order2.ingredienti.length ||
      order1.opzionali.length !== order2.opzionali.length
    ) {
      return false;
    }

    for (let i = 0; i < order1.ingredienti.length; i++) {
      if (
        order1.ingredienti[i].name !== order2.ingredienti[i].name ||
        order1.ingredienti[i].selected !== order2.ingredienti[i].selected
      ) {
        return false;
      }
    }

    for (let i = 0; i < order1.opzionali.length; i++) {
      if (
        order1.opzionali[i].name !== order2.opzionali[i].name ||
        order1.opzionali[i].selected !== order2.opzionali[i].selected
      ) {
        return false;
      }
    }

    return true;
  }

  removeItem(item: OrderItem) {
    const index = this.order.indexOf(item);
    if (index !== -1) {
      this.order.splice(index, 1);
      this.updateTotalOrderPrice();
    }
  }

  increaseQuantity(item: OrderItem) {
    item.quantity++;
    this.updateTotalOrderPrice();
  }

  decreaseQuantity(item: OrderItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateTotalOrderPrice();
    }
  }

  getTotalOrderPrice(): number {
    let total = 0;
    for (const item of this.order) {
      total += item.priceOpzionale * item.quantity;
    }
    return total;
  }

  editIngredients(item: OrderItem) {
    const dialogRef = this.dialog.open(AddToOrderModalComponent, {
      width: '500px',
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.saveIngredients(result);
      }
    });
  }

  saveIngredients(item: OrderItem) {
    item.priceOpzionale = this.calculatePrice(item);
    this.updateTotalOrderPrice();
  }

  calculatePrice(item: OrderItem): number {
    let basePrice = item.price;
    item.opzionali.forEach((optionalIngredient) => {
      if (optionalIngredient.selected) {
        basePrice += optionalIngredient.priceOpzionale;
      }
    });
    return basePrice;
  }

  updateTotalOrderPrice(): void {
    this.totalOrderPrice = this.getTotalOrderPrice();
  }

  addOptionalIngredients() {
    if (!this.currentOrderItem) return;

    const selectedOptionalIngredients = this.optionalIngredients.filter(
      (ingredient) => ingredient.selected
    );

    this.currentOrderItem.opzionali = selectedOptionalIngredients;
  }

  getOptionalIngredientsString(ingredients: OptionalIngredient[]): string {
    const selectedOptionalIngredients = ingredients.filter(
      (ingredient) => ingredient.selected
    );
    return selectedOptionalIngredients
      .map((ingredient) => ingredient.name)
      .join(', ');
  }

  hasSelectedOptionalIngredients(item: OrderItem): boolean {
    return item.opzionali.some((opt) => opt.selected);
  }
}
