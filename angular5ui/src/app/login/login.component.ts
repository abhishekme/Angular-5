import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../services/database.service';
import { DictionaryService } from '../services/dictionary.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService as AuthServ } from './../services/auth.service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private database: DatabaseService,
              private dictionary: DictionaryService,
              private authServ: AuthServ, 
              private router: Router) { }


    public loginForm:any = {};
    private subscriptions: Subscription[] = [];

    ngOnInit() {
        this.loginForm['username'] = '';
        this.loginForm['password'] = '';
        //Auth check redirect
        //this.authServ.authCheck();
    }

    loginSubmit(formObj){
      if(formObj.form.valid){
        this.subscriptions.push(this.database.createLogin(this.loginForm.username,this.loginForm.password)
            .subscribe(
                data => {
                    let currentUser = {};
                    if(data.status){
                      currentUser   = {
                        userId: data.user_id,
                        token:  data.loginToken
                      }
                      sessionStorage.setItem('currentUser',JSON.stringify(currentUser));
                      alert('dddd');
                      this.router.navigateByUrl('Home');
                    } 
                    if(!data.status){
                    }
                },
                err => { console.log(this.dictionary.loginError, err.message); }
        ));
        return false;

      }

    }

}
