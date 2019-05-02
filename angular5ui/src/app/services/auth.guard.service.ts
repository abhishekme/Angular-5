import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';

import { DatabaseService } from './database.service';
import { DictionaryService } from './dictionary.service';
//import { NotificationService } from './notification.service';
//import { TabService } from './tabs.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private database: DatabaseService,
        private dictionary: DictionaryService,
        private router: Router) { 
        }

    private subscriptions: Subscription[] = [];

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    /*canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        let currentUser;
        alert('auth guard');
        console.log(localStorage.getItem('loginToken'));
        currentUser = JSON.parse(JSON.stringify(localStorage.getItem('loginToken')));
        //console.log('### Log Token:: ',currentUser);
        //alert('dsfdsfd');
        
        if (currentUser != null) {
            //url = "/Home";
            //this.router.navigate([url]);
            return true;
        }
        else {
            //localStorage.clear();
            //this.database.clearData();
            //this.router.navigate(['/Login']);
            return false;
        }
        //return this.database.isAuthenticated();
    }*/

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
          const getToken  = JSON.parse(JSON.stringify(localStorage.getItem('logToken')));
          console.log(getToken);
        if (getToken != '' && getToken != null && getToken !== undefined )  {
              const tokenObj 	= (getToken);
              console.log(tokenObj);
              const thisToken = tokenObj.token;
              if (thisToken == null || thisToken == undefined) {
                this.router.navigate(['/Login']);
                return false;
              }
              alert('#Login to home...');
              return true;
          }
          alert('@Login to home...');
          this.router.navigate(['/Login']);
          return false;
      }

    /*canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;

        let currentUser;
        if (this.dictionary.debugMode) {
            currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        }
        else {
            currentUser = this.database.userInfo;
        }
        if (currentUser != null) {
            this.database.setInfo(currentUser.auth, currentUser.license, currentUser.session, currentUser.database, currentUser.databases, currentUser.serverUrl, currentUser.apiVersion);
            this.subscriptions.push(this.database.validateSession().subscribe(
                    data => {
                        this.database.setAuthenticated(true);
                        this.database.setCurrentUser(currentUser.user);
                    },
                    err => {
                        for (var i in this.database.loading) {
                            this.database.loading[i].active = false;
                        }
                        sessionStorage.clear();
                        this.database.clearData();
                        this.router.navigate(['/Login'], { queryParams: { 'returnUrl': state.url } });
                        this.notification.setErrorMessage(err, this.dictionary.invalidSession);
                    }
                )
        );
        }
        else {
            sessionStorage.clear();
            this.database.clearData();
            this.router.navigate(['/Login']);
        }
        return this.database.isAuthenticated();
    }*/
}