import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SectionComponent } from './section/section.component';
import { MenuComponent } from './menu/menu.component';
import { AntipastiComponent } from './menu/antipasti/antipasti.component';
import { PizzeComponent } from './menu/pizze/pizze.component';
import { HamburgerComponent } from './menu/hamburger/hamburger.component';
import { BibiteComponent } from './menu/bibite/bibite.component';
import { DolciComponent } from './menu/dolci/dolci.component';
import { DigestiviComponent } from './menu/digestivi/digestivi.component';
import { NewsletterModalComponent } from './newsletter-modal/newsletter-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddToOrderModalComponent } from './menu/add-to-order-modal/add-to-order-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConcludiOrdineModalComponent } from './menu/concludi-ordine-modal/concludi-ordine-modal.component';
import { CheckoutComponent } from './checkout/checkout.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SectionComponent,
    MenuComponent,
    AntipastiComponent,
    PizzeComponent,
    HamburgerComponent,
    BibiteComponent,
    DolciComponent,
    DigestiviComponent,
    NewsletterModalComponent,
    AddToOrderModalComponent,
    ConcludiOrdineModalComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
