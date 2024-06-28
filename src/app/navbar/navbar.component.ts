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
    this.authSrv.user$.subscribe((user) => {
      this.user = user;
    });
  }

  login(): void {
    if (this.email && this.password) {
      const userCredentials = { email: this.email, password: this.password };
      this.authSrv.login(userCredentials).subscribe({
        next: () => {
          // Login successful, clear form fields if needed
          this.email = '';
          this.password = '';
        },
        error: (error) => {
          console.error('Login error:', error);
          // Handle error as needed
        }
      });
    }
  }

  logout(): void {
    this.authSrv.logout();
  }
}
