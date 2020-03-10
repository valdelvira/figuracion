import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../service/person.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.css']
})
export class CreatePersonComponent implements OnInit {

  constructor(
    private personService: PersonService,
    private router: Router,
    private snackBar: MatSnackBar
    ) { }

    altaPerson = {
      name: '',
      fisrtSurname: '',
      lastSurname: '',
      email: ''
    };
    selectedFile: File = null;

  ngOnInit() {
  }

  createUploadImage() {
    const fd = new FormData();
    fd.append('name', this.altaPerson.name);
    fd.append('firstSurname', this.altaPerson.fisrtSurname);
    fd.append('lastSurname', this.altaPerson.lastSurname);
    fd.append('email', this.altaPerson.email);
    if (!this.selectedFile == null ) {
      fd.append('image', this.selectedFile, this.selectedFile.name);
    }
    // LLamo al servicio encargado de hacer la peticion
    this.personService.createImageUpload(fd)
      .subscribe(
        res => {
          this.router.navigate(['/person']);
          this.snackBar.open('Persona dada de alta correctamente.', null, {duration: 2000});
        },
        err => {
          console.error(err);
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.snackBar.open('No está logado.', null, {duration: 2000});
              this.router.navigate(['/login']);
            }
          }

        }
      );

  }

  onFileSelected(event) {
    // Guardo la imagen cargada por el usuario
    this.selectedFile = event.target.files[0] as File;
  }

  alta() {
    this.personService.altaPerson(this.altaPerson)
    .subscribe(
      res => {
        console.log(res);
      },
      err => console.error(err)
    );
  }

}
