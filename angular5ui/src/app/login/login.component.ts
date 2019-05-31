import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

import { DatabaseService } from '../services/database.service';
import { DictionaryService } from '../services/dictionary.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService as AuthServ } from './../services/auth.service.service';
import { NotificationsService } from 'angular2-notifications';
//import { EventEmitter } from 'protractor';
import { NotificationService } from '@progress/kendo-angular-notification';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private database: DatabaseService,
              private dictionary: DictionaryService,
              private authServ: AuthServ,
              private notificationService: NotificationService,
              private _notif_service: NotificationsService, 
              private router: Router) { }


    @Input() userData:any;
    @Output() onClose = new EventEmitter();


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
    private filipClass:string;
    private timeText:string;
    ngOnInit() {
        this.loginForm['username'] = '';
        this.loginForm['password'] = '';
    }
    ngAfterViewInit(){
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
                      this.userData = JSON.stringify(currentUser);
                      this.router.navigate(['/Home']);
                    } 
                    if(!data.status){
                      this.loginError = true;
                      this.errDialog  = true;
                      this.dialogTitle = "Login Error";
                        this.notificationService.show({
                          content: this.dialogText,
                          cssClass: 'login-notification-error',
                          animation: { type: 'slide', duration: 300 },
                          position: { horizontal: 'center', vertical: 'top' },
                          type: { style: 'error', icon: true },
                          closable: false
                      });
                    }
                },
                err => { console.log(this.dictionary.loginError, err.message); }
        ));
        return false;

      }

    }

}
