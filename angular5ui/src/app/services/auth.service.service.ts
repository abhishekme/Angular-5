import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';

import { DatabaseService } from './database.service';
import { DictionaryService } from './dictionary.service';
//import { NotificationService } from './notification.service';
//import { TabService } from './tabs.service';

@Injectable()
export class AuthService implements CanActivate {

    constructor(private database: DatabaseService,
        private dictionary: DictionaryService,
        private router: Router) { }

    private subscriptions: Subscription[] = [];

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let currentUser = '';;
        currentUser = JSON.parse(JSON.stringify(localStorage.getItem('loginToken')));
        alert('auth service');
        if(currentUser != null){
            //this.router.navigate(['/Home']);
            return false;
        }
        return true;
    }
}