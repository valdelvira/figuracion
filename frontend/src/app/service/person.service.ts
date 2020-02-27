import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private altaURL = 'http://localhost:3004/api/person';
  private listURL = 'http://localhost:3004/api/person/list';
  private personImageUpload = 'http://localhost:3004/api/person/upload';

  constructor( private http: HttpClient) { }

  altaPerson(user) {
    return this.http.post<any>(this.altaURL, user);
  }

  getPerson() {
    return this.http.get<any>(this.listURL);
  }

  deletePerson(user) {
    const _id = user._id;
    //const url = `${this.listURL}/`;
    const url = `${this.altaURL}/${_id}`; // le pasamos por URL el id de la tarea a borrar
    console.log(url);
    return this.http.delete<any>(url);
  }

  createImageUpload(user) {
    return this.http.post<any>(this.personImageUpload, user);
  }

}
