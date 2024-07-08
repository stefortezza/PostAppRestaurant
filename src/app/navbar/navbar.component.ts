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

  constructor(public authSrv: AuthService) {}

  ngOnInit(): void {
    this.authSrv.user$.subscribe((token) => {
      if (token) {
        this.user = {
          accessToken: token,
          user: {
            id: '1',
            name: '', 
            surname: '', 
            email: '',
            role: 'ADMIN' 
          }
        };
      } else {
        this.user = null;
      }
    });
  }

  login(): void {
    if (this.email && this.password) {
      const userCredentials = { email: this.email, password: this.password };
      this.authSrv.login(userCredentials).subscribe({
        next: (token) => {
          // Il token verrà gestito automaticamente nel ngOnInit tramite l'observable user$
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
}
