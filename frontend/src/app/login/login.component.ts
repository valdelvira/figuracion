import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service'; // para autentificar
import { Router } from '@angular/router'; // me lo traigo para redirigir una vez se logeen

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUser = {   // Este es el objeto que se crea con los parametros del formulario
    email: '',
    password: ''
  };
  constructor(private auth: AuthService, private router: Router) { }  // Instancio las clases en el constructor

  login() {
    this.auth.loginUser(this.loginUser) // llamo a la función y le paso un objeto de tipo user que lleva los datos del formulario
    // devuelve un observable por lo que debemos subscribirnos para recibir los cambios
    .subscribe(
      res => {    // Recoje la respuesta en el caso de que haya resultado
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
