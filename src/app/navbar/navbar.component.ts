import { Component, OnInit } from '@angular/core';
import { AuthData } from 'src/interfaces/auth-data.interface';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: AuthData | null = null;
  email: string = '';
  password: string = '';

  constructor(private authSrv: AuthService) {}

  ngOnInit(): void {
    this.authSrv.user$.subscribe((token) => {
      if (token) {
        this.user = this.getUserDetailsFromToken(token);
      } else {
        this.user = null;
      }
    });
  }

  login(): void {
    if (this.email && this.password) {
      const userCredentials = { email: this.email, password: this.password };
      this.authSrv.login(userCredentials).subscribe({
        next: () => {
          this.email = '';
          this.password = '';
        },
        error: (error) => {
          console.error('Login error:', error);
        }
      });
    }
  }

  logout(): void {
    this.authSrv.logout();
    this.user = null; 
  }

  private getUserDetailsFromToken(token: string): AuthData {
    return {
      accessToken: token,
      user: {
        id: '1', // Sostituisci con i dettagli effettivi dell'utente
        name: '', // Sostituisci con i dettagli effettivi dell'utente
        surname: '', // Sostituisci con i dettagli effettivi dell'utente
        email: '' // Sostituisci con i dettagli effettivi dell'utente
      }
    };
  }
}
