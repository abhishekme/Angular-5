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
    private errDialog:boolean = false;
    private dialogText:string;
    private dialogTitle:string;
    ngOnInit() {
        this.loginForm['username'] = '';
        this.loginForm['password'] = '';
        //Auth check redirect
        this.authServ.authCheck();
    }

    closeDialog(){
      this.errDialog = false;
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
                      console.log('login redirecting');
                      this.router.navigateByUrl('/Home');
                    } 
                    if(!data.status){
                      this.errDialog  = true;
                      this.dialogTitle = "Login Error";
                      this.dialogText = data.message;
                    }
                },
                err => { console.log(this.dictionary.loginError, err.message); }
        ));
        return false;

      }

    }

}
