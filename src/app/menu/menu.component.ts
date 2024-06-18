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
    {
      title: 'Antipasti',
      link: '/menu/antipasti',
      image: 'assets/img/antipasto.jpg',
    },
    { title: 'Pizze', link: '/menu/pizze', image: 'assets/img/pizza.jpg' },
    {
      title: 'Hamburger',
      link: '/menu/hamburger',
      image: 'assets/img/hamburger.jpg',
    },
    { title: 'Bibite', link: '/menu/bibite', image: 'assets/img/bibite.jpg' },
    { title: 'Dolci', link: '/menu/dolci', image: 'assets/img/dolci.jpg' },
    {
      title: 'Digestivi',
      link: '/menu/digestivi',
      image: 'assets/img/digestivi.jpg',
    },
  ];

  order: any[] = []; // Array per memorizzare i prodotti aggiunti all'ordine
  totalPrice: number = 0; // Variabile per memorizzare il totale dell'ordine

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
