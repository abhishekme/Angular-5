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
        }
        private subscriptions: Subscription[] = [];
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        
        let currentUser;
        currentUser  = JSON.parse(sessionStorage.getItem('currentUser'));
        if(currentUser != null)
        {
            this.router.navigate(['/Home']);
        }else{
            return true;
        }
    }
    
    authCheck(){
        let currentUser = sessionStorage.getItem('currentUser');
        if(currentUser != null){
            currentUser  = JSON.parse(sessionStorage.getItem('currentUser'));
        }        
        if(currentUser !== null){
            this.router.navigate(['/Home']);
        }
        if(currentUser === null || currentUser === undefined){
            this.router.navigate(['/Login']);
        }
    }
}