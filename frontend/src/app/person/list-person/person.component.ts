import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../service/person.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  persons: any = [{}]; // Se usa para listar las persona por defecto esta vacio. Se declara un array vacio

  altaPerson = {
    name: '',
    fisrtSurname: '',
    lastSurname: '',
    email: 'sip@sip.com'
  };
  selectedFile: File = null;

  constructor(
    private personService: PersonService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.personService.getPerson()
      .subscribe(
        res => { this.persons = res; }, // Asigno el listado de personas al array vacio
        err => console.log(err)
      );
  }

  alta() {
    this.personService.altaPerson(this.altaPerson)
    .subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
  }

  onFileSelected(event) {
    // Guardo la imagen cargada por el usuari
    this.selectedFile = event.target.files[0] as File;
  }

  createUploadImage() {
    const fd = new FormData();
    fd.append('name', this.altaPerson.name);
    fd.append('firstSurname', this.altaPerson.fisrtSurname);
    fd.append('lastSurname', this.altaPerson.lastSurname);
    fd.append('email', this.altaPerson.email);
    fd.append('image', this.selectedFile, this.selectedFile.name);
    // LLamo al servicio encargado de hacer la peticion
    this.personService.createImageUpload(fd)
      .subscribe(
        res => {
          this.router.navigate(['/person']);
          this.snackBar.open('Persona dada de alta correctamente.', null, {duration: 2000});
        },
        err => {
          console.log(err);
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.snackBar.open('No está logado.', null, {duration: 2000});
              this.router.navigate(['/login']);
            }
          }

        }
      );

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        console.log('The dialog was closed');
        // this.animal = result;
        this.router.navigate(['/person']);
    });
  }
}
