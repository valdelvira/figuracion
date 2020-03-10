import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private companyImageUpload = 'http://localhost:3004/api/company/upload';
  private listURL = 'http://localhost:3004/api/company/list';
  private companyURL = 'http://localhost:3004/api/company';

  constructor( private http: HttpClient ) { }

  createImageUpload(company) {
    return this.http.post<any>(this.companyImageUpload, company);
  }

  getCompanies() {
    return this.http.get<any>(this.listURL);
  }

  deleteCompany(company) {
    const _id = company._id;
    const url = `${this.companyURL}/${_id}`; // le pasamos por URL el id de la tarea a borrar
    return this.http.delete<any>(url);
  }

}
