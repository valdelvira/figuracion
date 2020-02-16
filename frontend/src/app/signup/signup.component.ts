import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';  // Importo la clase de autentificación

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpUser = {
    user: '',
    email: '',
    password: '',
    passwordConfir: ''
  }; // Me creo un objeto vacío que recibirá los datos de usuario
  constructor( private auth: AuthService) { // Instancio el servicio de autentificación
  }

  signUp() {
    this.auth.signUpUser(this.signUpUser) // llamo a la función pasándole el objeto con los datos del usuario
    // La función devuleve un objeto observable por lo que hay que subscribirse
    .subscribe(
      res => {console.log(res);
      },
      err => console.log(err)
    );
  }

  ngOnInit() {
  }

}
