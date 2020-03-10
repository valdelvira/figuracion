import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyService } from 'src/app/service/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  companies: any = [{}]; // Se usa para listar las persona por defecto esta vacio. Se declara un array vacio

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.companyService.getCompanies()
    .subscribe(
      res => { this.companies = res; }, // Asigno el listado de personas al array vacio
      err => console.error(err)
    );
  }

  delete(company) {
    this.companyService.deleteCompany(company)
      .subscribe(
        res => {
          const index = this.companies.indexOf( company ); // Buscamos en el array de tareas la que voy a borrar
          if ( index > -1 ) {  // Si encuentra la tarea devuelve el indice, si no, devuelve un -1
            this.companies.splice(index, 1 ); // Busca la tarea y la elimina
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
}

