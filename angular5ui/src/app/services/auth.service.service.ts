import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';

import { DatabaseService } from './database.service';
import { DictionaryService } from './dictionary.service';

@Injectable()
export class AuthService implements CanActivate {

    constructor(private database: DatabaseService,
        private dictionary: DictionaryService,
        private router: Router) { 

            //localStorage.setItem('logToken','Hello123');
        }

    private subscriptions: Subscription[] = [];

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    /*canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let currentUser = '';;
        currentUser = JSON.parse(JSON.stringify(localStorage.getItem('loginToken')));
        alert('auth service');
        if(currentUser != null){
            //this.router.navigate(['/Home']);
            return false;
        }
        return true;

        
    }*/
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        
        let currentUser;
        currentUser  = JSON.parse(sessionStorage.getItem('currentUser'));

        if(currentUser != null){

        }else{
            
        }



        //JSON.parse(JSON.stringify(localStorage.getItem('logToken')));
        /*console.log(getToken);
          if (getToken != '' && getToken != null && getToken !== undefined )  {
            const tokenObj 	= (getToken);
            if (getToken === '' || getToken === undefined) {
            return true;
            } else {
            const thisToken = tokenObj;
            if (thisToken == null || thisToken == undefined) {
                return true;
            }
            //this.router.navigateByUrl('/Home');
            //alert('Login to home...');
            //return false;
            }
            this.router.navigateByUrl('/Home');
        } else {
          return true;
        }*/
        return;
        }
}