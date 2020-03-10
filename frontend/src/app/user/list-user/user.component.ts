import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any = [{}];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getPerson()
    .subscribe(
      res => { this.users = res; }, // Asigno el listado de personas al array vacio
      err => console.error(err)
    );
  }

}
