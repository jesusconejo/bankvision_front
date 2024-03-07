import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.css'
})
export class UserDataComponent {
  user: any; // Aquí puedes definir una interfaz o clase para tipar los datos del usuario

  constructor(private route: ActivatedRoute) { }

 
}
