import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import{AuthService} from '../../services/auth/auth.service'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public route:Router,public auth:AuthService) { }

  ngOnInit(): void {
  }

  check(){
    console.log(this.auth.user);
  }
}
