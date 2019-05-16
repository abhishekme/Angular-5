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
            if(currentUser != null)
            {
                return true;
            }else{
                return false;
            }
        }
    
    authCheck(){
        let currentUser = sessionStorage.getItem('currentUser');
        if(currentUser != ''){
            currentUser  = JSON.parse(sessionStorage.getItem('currentUser'));
        }        
        if(currentUser != ''){
            alert('1111');
            this.router.navigate(['/Home']);
        }
        if(currentUser === '' || currentUser === undefined){
            alert('2222');
            this.router.navigate(['/Login']);
        }
    }
}