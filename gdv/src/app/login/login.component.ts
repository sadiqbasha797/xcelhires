import { Component,OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router,RouterLink } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.credentials).subscribe(response => {
      console.log(response.accessToken);
      if (response.status==200) {
        this.authService.setToken(response.accessToken);
        this.authService.setAuthenticated(true);
        this.router.navigate(['/dashboard']);
      } else {
        alert('Login failed');
      }
    });
  }
}
