import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Ingredient {
  name: string;
  selected: boolean;
}

interface OptionalIngredient {
  name: string;
  selected: boolean;
  price: number;
  priceOpzionale: string;
}

interface Category {
  quantity: any;
  editMode: boolean;
  description: string;
  id: number;
  title: string;
  ingredienti: Ingredient[];
  opzionali: OptionalIngredient[];
  price: number;
  priceOpzionale: string;
  image: string;
  link: string;
  totalPrice?: number;
}

@Component({
  selector: 'app-add-to-order-modal',
  templateUrl: './add-to-order-modal.component.html',
  styleUrls: ['./add-to-order-modal.component.scss'],
})
export class AddToOrderModalComponent {
  constructor(
    public dialogRef: MatDialogRef<AddToOrderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public category: Category
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addToOrder(): void {
    this.dialogRef.close(this.category);
  }

  onOptionalIngredientChange(optionalIngredient: OptionalIngredient): void {
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    function parsePrice(price: string | number): number {
      let priceStr = typeof price === 'string' ? price : price.toString();
      let trimmedPrice = priceStr.split('€').join('').trim();
      return parseFloat(trimmedPrice) || 0;
    }

    let basePrice = parsePrice(this.category.price);

    let optionalIngredientsCost = this.category.opzionali.reduce(
      (total, ingredient) => {
        return (
          total +
          (ingredient.selected ? parsePrice(ingredient.priceOpzionale) : 0)
        );
      },
      0
    );

    this.category.totalPrice = basePrice + optionalIngredientsCost;
  }

  parsePrice(price: string | number): number {
    if (price!== undefined) {
      if (typeof price === 'string') {
        let trimmedPrice = price.split('€').join('').trim();
        return parseFloat(trimmedPrice) || 0;
      } else {
        return price;
      }
    } else {
      return 0;
    }
  }
  
}
