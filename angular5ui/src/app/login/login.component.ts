import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../services/database.service';
import { DictionaryService } from '../services/dictionary.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
//import { timeout } from 'rxjs/operators/timeout';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private database: DatabaseService,
    private dictionary: DictionaryService, private router: Router) { }


    public loginForm:any = {};
    private subscriptions: Subscription[] = [];

    ngOnInit() {
        this.loginForm['username'] = '';
        this.loginForm['password'] = '';
    }

    loginSubmit(formObj){
      console.log(formObj);
      if(formObj.form.valid){
        this.subscriptions.push(this.database.createLogin(this.loginForm.username,this.loginForm.password)
            .subscribe(
                data => {
                    console.log("LOGIN RESPONSE: ", data);
                    if(data.status){
                      alert('login success...');
                     // sessionStorage.setItem('currentUser',JSON.stringify(data));
                      this.router.navigateByUrl('/Home');
                    } 
                    if(!data.status){

                    }
                },
                err => { console.log(this.dictionary.loginError, err.message); }
        ));
        alert('pass login....');

      }

    }

}
