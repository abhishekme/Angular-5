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

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        let currentUser;
        currentUser  = (sessionStorage.getItem('currentUser'));
        console.log(currentUser);

        if(currentUser == null){
            this.router.navigate(['/Login']);
            return false;
        }
        return true;

        /*if(currentUser != null){
            alert('AUth guard...1');
            console.log('Auth guard return home');
            return true;
        }else{
            alert('AUth guard...2');
            console.log('Auth guard return login');
            this.router.navigate(['/Login']);
            return false;
        }*/
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let currentUser;
        currentUser  = (sessionStorage.getItem('currentUser'));
        if(currentUser != null){
            return true;
        }else{
            this.router.navigate(['/Login']);
            return false;
        }
    }
}