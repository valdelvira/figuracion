import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userURL = 'http://localhost:3004/api/user';
  private listURL = 'http://localhost:3004/api/user/list';

  constructor( private http: HttpClient ) { }

  getPerson() {
    return this.http.get<any>(this.listURL);
  }

}
