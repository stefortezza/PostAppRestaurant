import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  isCategorySelected: boolean = false;

  categories = [
    { title: 'Antipasti', link: '/menu/antipasti', image: 'assets/img/antipasto.jpg'},
    { title: 'Pizze', link: '/menu/pizze', image: 'assets/img/pizza.jpg' },
    { title: 'Hamburger', link: '/menu/hamburger', image: 'assets/img/cheese.jpg'},
    { title: 'Bibite', link: '/menu/bibite', image: 'assets/img/drink.jpg' },
    { title: 'Dolci', link: '/menu/dolci', image: 'assets/img/cake.jpg' },
    { title: 'Digestivi', link: '/menu/digestivi', image: 'assets/img/limoncello.jpg'}
  ];

  order: any[] = [];
  totalPrice: number = 0;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isCategorySelected =
          this.router.url !== '/menu' && this.router.url !== '/';
      }
    });
  }

  addToOrder(product: any) {
    this.order.push(product);
    this.totalPrice += product.price; // Aggiungi il prezzo del prodotto al totale
  }
}
