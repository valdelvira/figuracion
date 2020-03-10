import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyService } from 'src/app/service/company.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }
  newCompany = {
    name: '',
    field: '',
    description: ''
  };
  selectedFile: File = null;

  ngOnInit() {
  }


 newCompanyUploadImage() {
    const fd = new FormData();
    fd.append('name', this.newCompany.name);
    fd.append('field', this.newCompany.field);
    fd.append('description', this.newCompany.description);
    // if (!this.selectedFile == null ) {
      fd.append('image', this.selectedFile, this.selectedFile.name);
    // }
    // LLamo al servicio encargado de hacer la peticion
    this.companyService.createImageUpload(fd)
      .subscribe(
        res => {
          this.router.navigate(['/company']);
          this.snackBar.open('Nueva empresa creada.', null, {duration: 2000});
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

}
