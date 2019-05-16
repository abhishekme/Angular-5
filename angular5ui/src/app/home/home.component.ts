import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService as AuthServ } from './../services/auth.service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router, private _authServ: AuthServ) { }

  onInit() { 
    alert('Home');
    //this._authServ.authCheck();
  }
  logOut(){
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/Login']);
  }

}
