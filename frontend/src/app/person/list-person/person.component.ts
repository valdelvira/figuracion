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

  constructor(
    private personService: PersonService,
    private router: Router,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    this.personService.getPerson()
      .subscribe(
        res => { this.persons = res; }, // Asigno el listado de personas al array vacio
        err => console.error(err)
      );
  }

  delete(user) {
    this.personService.deletePerson(user)
      .subscribe(
        res => {
          const index = this.persons.indexOf( user ); // Buscamos en el array de tareas la que voy a borrar
          if ( index > -1 ) {  // Si encuentra la tarea devuelve el indice, si no, devuelve un -1
            this.persons.splice(index, 1 ); // Busca la tarea y la elimina
            this.snackBar.open('Tarea borrada con éxito', null, {duration: 2000});
          }
        },
        err => {
          console.error(err);
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.snackBar.open('No estás logado', null, {duration: 2000});
              this.router.navigate(['/login']);
            }
          }
        }
      );
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
  //     width: '250px',
  //     data: {name: this.name, animal: this.animal}
  //   });

  //   dialogRef.afterClosed()
  //     .subscribe(result => {
  //       console.log('The dialog was closed');
  //       // this.animal = result;
  //       this.router.navigate(['/person']);
  //   });
  // }
}
