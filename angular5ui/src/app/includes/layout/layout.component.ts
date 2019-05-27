import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService as AuthServ } from '../../services/auth.service.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private router: Router, private _authServ: AuthServ) { }

  ngOnInit(){
    let logUser   = sessionStorage.getItem('currentUser');
  }

}
