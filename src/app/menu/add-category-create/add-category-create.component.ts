import { Component } from '@angular/core';
import { DataService } from '../../service/data-service';
import { Router } from '@angular/router';
import { Antipasti } from 'src/interfaces/antipasti';
import { Ingredient } from 'src/interfaces/ingredient';
import { OptionalIngredient } from 'src/interfaces/optional-ingredient';

@Component({
  selector: 'app-add-category-create',
  templateUrl: './add-category-create.component.html',
  styleUrls: ['./add-category-create.component.scss']
})
export class AddCategoryCreateComponent {
  antipasti: Antipasti = {
    id: 0,
    title: '',
    description: '',
    price: '0',
    image: '',
    link: '',
    ingredienti: [],
    opzionali: [],
    categoryId: 0
  };

  errorMessage: string | undefined;
  currentOrderItem: any;

  constructor(
    private dataService: DataService, 
    private router: Router
  ) {}

  createAntipasto(): void {
    console.log('Antipasto da inviare:', this.antipasti); 
  
    const userToken = localStorage.getItem('user')?.trim() || '';
    console.log('Token recuperato:', userToken);
  
    if (!userToken) {
      console.error('Token non trovato nel localStorage.');
      this.errorMessage = 'Token non trovato. Effettua nuovamente il login.';
      return;
    }
  
    this.dataService.postData('categories', this.antipasti).subscribe({
      next: (newAntipasto) => {
        console.log('Antipasto creato:', newAntipasto);
        this.router.navigate(['/antipasti']);
      },
      error: (error) => {
        console.error('Errore durante la creazione dell\'antipasto:', error);
  
        if (error.status === 0) {
          this.errorMessage = 'Errore: impossibile connettersi al server.';
        } else if (error.status === 403) {
          this.errorMessage = 'Errore 403: Accesso vietato. Verifica i permessi e il token.';
        } else {
          this.errorMessage = `Errore ${error.status}: ${error.message}`;
        }
      }
    });
  }

  addIngrediente(): void {
    const newIngredient: Ingredient = {
      name: '',
      selected: true,
      categoryId: this.antipasti.categoryId 
    };
    
    this.dataService.postIngredient(newIngredient).subscribe({
      next: (ingredient) => {
        console.log('Ingrediente creato:', ingredient);
        this.antipasti.ingredienti.push(ingredient);
      },
      error: (error) => {
        console.error('Errore durante la creazione dell\'ingrediente:', error);
        this.errorMessage = `Errore ${error.status}: ${error.message}`;
      }
    });
  }

  addOpzionale(): void {
    const newOptionalIngredient: OptionalIngredient = {
      name: '',
      selected: false,
      priceOpzionale: 0,
      categoryId: this.antipasti.categoryId 
      ,
      price: 0
    };
    
    this.dataService.postOptionalIngredient(newOptionalIngredient).subscribe({
      next: (opzionale) => {
        console.log('Ingrediente opzionale creato:', opzionale);
        this.antipasti.opzionali.push(opzionale);
      },
      error: (error) => {
        console.error('Errore durante la creazione dell\'ingrediente opzionale:', error);
        this.errorMessage = `Errore ${error.status}: ${error.message}`;
      }
    });
  }
}
