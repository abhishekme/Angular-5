//import { TitleCasePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty as observableEmpty, Subject } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

import { DictionaryService } from './dictionary.service';

@Injectable()

export class DatabaseService {
    constructor(private http: HttpClient,
        public dictionary: DictionaryService) {
            localStorage.setItem('loginToken','gfhgfhf');
    }
    // ----------------------------------- Variables -----------------------------------------
    // URLs
    public serverUrl               : string = 'http://192.168.0.15:8085/api/';    
    public apiVersion              : string = "v1";
    public auth                    : string;
    public dbName                  : string;
    public licenseId               : string;
    public sessionId               : string;

    getHeaders() {
        return new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : 'Basic ' + this.auth});
    }
    getUploadHeaders() {
        return new HttpHeaders({'enctype': 'multipart/form-data', 'Authorization' : 'Basic ' + this.auth});
    }
    getParams() {
        return new HttpParams();
    }
    getUUID() {
        return uuid();
    }
    isEmpty(obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop)) {
                return false;
            }
        }
        if (obj != null) {
            return JSON.stringify(obj) === JSON.stringify({});
        }
        else {
            return true;
        }
    }
    // In grids, an array must be built to represent multiple selections.
    getSelectionsArray(object, multiSelection) {
        let selections = [];
        if (multiSelection.length) {
            selections = multiSelection;
        }
        else if (!this.isEmpty(object)) {
            selections.push(object);
        }
        return selections;
    }

    getApiVersion() {
        let url = this.serverUrl + 'preauth/apiversion';
        return this.http.get<any>(url);
    }
    createLogin(username: string, password: string) {
        let body = JSON.stringify({ username: username, password: password});
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : 'Basic ' + btoa(username + ':' + password)});
        let url = this.serverUrl + 'auth/login';
        return this.http.post<any>(url, body, {headers});
    }
    getLoginToken():string{
        let getToken 		=	'';
        if(localStorage.getItem('loginToken') != undefined){
            let getTokenData 	=	JSON.parse(localStorage.getItem('loginToken'));
            getToken 		      =	getTokenData.token;
        }
        return getToken;
    }
    logoutSession(){
        localStorage.removeItem('loginToken');
    }
    isAdminLogin() : any{
        let url 	=	this.serverUrl + 'isAdminLogin';
        let getToken 		=	'';
        if(localStorage.getItem('loginToken') != undefined){
          let getTokenData 	=	JSON.parse(localStorage.getItem('loginToken'));
          getToken 		    =	getTokenData.token;
        }
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let body = {token:getToken};
        return this.http.post<any>(url, body, {headers});

          /*return this.http.post<any>(this.actionUrl,{token:getToken})
            .map(respData => {
                console.log(respData);
                return respData;
            });  */  
    }
    isAuthenticated(){
        if(localStorage.getItem('loginToken') != undefined){
            return true;
        }else{
            return false;
        }
    }
}