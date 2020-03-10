import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';  // Importo la clase de autentificación
import { Router } from '@angular/router';

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
  constructor( private auth: AuthService, private router: Router) { // Instancio el servicio de autentificación
  }

  signUp() {
    this.auth.signUpUser(this.signUpUser) // llamo a la función pasándole el objeto con los datos del usuario
    // La función devuleve un objeto observable por lo que hay que subscribirse
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.jwToken);  // Recojo el token y lo guardo como una variable en el navegador
        this.router.navigate(['/person']);  // Redirecciono si el login es correcto
      },
      err => console.error(err)   // Recojo los posibles errores
    );
  }

  ngOnInit() {
  }

}
