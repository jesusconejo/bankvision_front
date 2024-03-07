import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserDataComponent } from '../user-data/user-data.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule,FormsModule, CommonModule, UserDataComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: string = '';
  password: string = '';
  errorMessage: string = '';
  userDataComponent: any;
  constructor(private http: HttpClient) {}

  login():void {
    console.log("LOGIN")
    if (!this.validatePassword(this.password)) {
      
      this.errorMessage = 'La contraseña debe tener al menos una mayúscula, un carácter especial, un número y una longitud mínima de 8 caracteres.';
      return;
    }

    const body = {
      user: this.user,
      password: this.password
    };

    this.http.post('http://localhost:8080/auth/userLogin', body)
      .subscribe(
        (response) => {
          console.log('Login successful');
        this.userDataComponent=response;
        console.log(this.userDataComponent)
        this.user="";
        this.password="";
        },
        (error) => {
          console.error('Error:', error);
          
          if (error.status === 404) {
            this.errorMessage = 'Usuario no encontrado. Verifica tus credenciales e intenta nuevamente.';
          } else {
            this.errorMessage = 'Error desconocido. Por favor, inténtalo de nuevo más tarde.';
          }
        }
      );
  }

  validatePassword(password: string): boolean {
    console.log("LOGIN validatePassword")
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
    return regex.test(password);
  }
}
