import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AntipastiComponent } from './menu/antipasti/antipasti.component';
import { PizzeComponent } from './menu/pizze/pizze.component';
import { HamburgerComponent } from './menu/hamburger/hamburger.component';
import { BibiteComponent } from './menu/bibite/bibite.component';
import { DolciComponent } from './menu/dolci/dolci.component';
import { DigestiviComponent } from './menu/digestivi/digestivi.component';
import { MenuComponent } from './menu/menu.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'menu/antipasti', component: AntipastiComponent },
  { path: 'menu/pizze', component: PizzeComponent },
  { path: 'menu/hamburger', component: HamburgerComponent },
  { path: 'menu/bibite', component: BibiteComponent },
  { path: 'menu/dolci', component: DolciComponent },
  { path: 'menu/digestivi', component: DigestiviComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'accedi', component: LoginComponent },
  { path: 'registrati', component: RegisterComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
