import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service'; // Lo usamos en el html

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
