import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../services/database.service';
import { DictionaryService } from '../services/dictionary.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService as AuthServ } from './../services/auth.service.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private database: DatabaseService,
              private dictionary: DictionaryService,
              private authServ: AuthServ,
              private _notif_service: NotificationsService, 
              private router: Router) { }


    public loginForm:any = {};
    private subscriptions: Subscription[] = [];
    private errDialog:boolean = false;
    private dialogText:string;
    private dialogTitle:string;
    public options = {
      position: ["right", "top"],
      timeOut: 5000,
      lastOnBottom: true
    }
    private loginError: boolean = false;
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
                      this.router.navigateByUrl('/Home');
                    } 
                    if(!data.status){
                      this.loginError = true;
                      this.errDialog  = true;
                      this.dialogTitle = "Login Error";
                      this.dialogText = data.message;
                        setTimeout(() => {
                          this.loginError = false;
                        }, 2000);
                        this._notif_service.error(
                            this.dialogTitle,
                            this.dialogText,
                        {
                            timeOut: 2000,
                            showProgressBar: true,
                            pauseOnHover: false,
                            clickToClose: false,
                            maxLength: 0
                        });
                    }
                },
                err => { console.log(this.dictionary.loginError, err.message); }
        ));
        return false;

      }

    }

}
