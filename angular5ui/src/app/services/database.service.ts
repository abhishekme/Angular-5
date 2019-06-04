//import { TitleCasePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty as observableEmpty, Subject } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
//import { Observable } from 'rxjs/Observable';
import { DictionaryService } from './dictionary.service';

@Injectable()

export class DatabaseService {
    constructor(private http: HttpClient,
        public dictionary: DictionaryService) {
            
    }
    // ----------------------------------- Variables -----------------------------------------
    // URLs
    public serverUrl               : string = 'http://192.168.0.15:8085/api/';    
    public apiVersion              : string = "v1";
    public auth                    : string;
    public dbName                  : string;
    public licenseId               : string;
    public sessionId               : string;
    public actionUrl               : string;
    public reqOptions              : RequestOptions;

    getHeaders() {
        return new Headers({'Content-Type': 'application/json', 'Authorization' : 'Basic ' + this.auth});
    }
    getUploadHeaders() {
        return new Headers({'enctype': 'multipart/form-data', 'Authorization' : 'Basic ' + this.auth});
    }
    getParams() {
        return new HttpParams();
    }
    getRequestOptions() {
        return new RequestOptions({ headers: this.getHeaders() });
    }
    getUUID() {
        //return uuid();
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
    getcurrentUser():string{
        let getToken = '',getTokenData:any;
        if(sessionStorage.getItem('currentUser') != undefined){
            getTokenData 	=	JSON.parse(sessionStorage.getItem('currentUser'));            
            getToken 		=	getTokenData.token;
        }
        console.log(getTokenData, " == ", getToken);
        return getToken;
    }
    logoutSession(){
        sessionStorage.removeItem('currentUser');
    }
    isAdminLogin() : any{
        let url 	=	this.serverUrl + 'isAdminLogin';
        let getToken 		=	'';
        if(sessionStorage.getItem('currentUser') != undefined){
          let getTokenData 	=	JSON.parse(sessionStorage.getItem('currentUser'));
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
        if(sessionStorage.getItem('currentUser') != undefined){
            return true;
        }else{
            return false;
        }
    }
    setDate(paramsObject: HttpParams, parameterName, parameter) {
        let fromDate = new Date(parameter);
        fromDate.setHours(0,0,0,0);
        let toDate = new Date(parameter);
        toDate.setHours(23,59,0,0);
        paramsObject = paramsObject.append(parameterName, (fromDate.toISOString()));
        paramsObject = paramsObject.append(parameterName, (toDate.toISOString()));
        paramsObject = paramsObject.append('high', (parameterName));
        paramsObject = paramsObject.append('low', (parameterName));
        return paramsObject;
    }
    append(paramsObject: HttpParams, parameterName, parameter) {
        if (parameter instanceof Date) {
            paramsObject = this.setDate(paramsObject, parameterName, parameter);
        }
        else if (typeof parameter == 'number') {
            paramsObject = paramsObject.append(parameterName, (parameter.toString()));
        }
        else {
            paramsObject = paramsObject.append(parameterName, parameter);
        }
        return paramsObject;
    }

    /****************************
    *
    *   User Service
    * 
    * 
    *****************************/

   /*adminGetUserById(userId : number) {
    // Check User Data
    this.actionUrl  =   this.serverUrl + 'user-by-id' ;
    const getToken    =   this.getcurrentUser();
    return this.http.post(this.actionUrl, {id:userId,token:getToken})
    .map(data => {
        data.json();
        // alert('total rec...');
        // the console.log(...) line prevents your code from working 
        // either rem+ove it or add the line below (return ...)
        // console.log("I CAN SEE TOTAL DATA HERE: ", data.json());
        return data.json();
    });
}*/

    adminGetUserData(srchKey, limitNum) {
        // Check User Data
        this.actionUrl  =   this.serverUrl + 'user-total-record' ;
        const getToken    =   this.getcurrentUser();

        let params                  = new HttpParams();
        if (srchKey)                params = this.append(params,'srchKey', srchKey);
        if (getToken)               params = this.append(params,'token', getToken);
        
        return this.http.post<any>(this.actionUrl, {srchKey: srchKey, token: getToken, limitNum: limitNum});
    }

    adminUserList(pageNum: any, limitNum: any, srchKey: any, queryType: any, sortByField: any, sortByDir: any) {
        this.actionUrl  =   this.serverUrl + 'user-list-record';
        const getToken  =   this.getcurrentUser();
        //console.log('@@@',pageNum,' - ',limitNum, ' = ',srchKey);
        //this.reqOptions = this.getRequestOptions();
        
        /*let params                  = new HttpParams();
        if (limitNum)               params = params.append('limitNum', limitNum);
        if (pageNum)                params = params.append('pageNum',  pageNum);
        if (srchKey)                params = params.append('srchKey', srchKey);
        //if (getToken)               params = params.append('token', getToken);
        if (sortByField)            params = params.append('sortByField', sortByField);
        if (sortByDir)              params = params.append('sortByDir', sortByDir);

        params = params.append('token', getToken);
        console.log('###### USER LIST ########',params.toString());
        let pobj = params.toString();
        //return this.http.post<any>(this.actionUrl, params.toString());*/
        
        return this.http.post<any>(this.actionUrl, { limitNum: limitNum, pageNum: pageNum, srchKey: srchKey, queryType: queryType,
            token: getToken, sortByField: sortByField, sortByDir: sortByDir});
    }

    /*adminUserEdit(editId: number = 0) {
        this.actionUrl  =   this.serverUrl + 'user-edit';
            // alert(this.actionUrl);
        let getToken    =   this.getcurrentUser();
         return this.http.post(this.actionUrl,{id:editId,token:getToken})
            .map(data => {
                data.json();
                // the console.log(...) line prevents your code from working 
                // either rem+ove it or add the line below (return ...)
                // console.log("I CAN SEE DATA HERE: ", data.json());
                return data.json();
            });
    }

    // Add New Record
    userSave(postData:any) : any{
        this.actionUrl  =   this.serverUrl + 'user-save' ;
       
        return this.http.post(this.actionUrl, postData)
        .map(data => {
            data.json();
            // the console.log(...) line prevents your code from working 
            // either rem+ove it or add the line below (return ...)
            // console.log("Submit Post Data :: ", data.json());
            return data.json();
        });
    }

    // Profile save
    profileSave(postData:any) : any{
        this.actionUrl  =   this.serverUrl + 'profile-update' ;
       
        return this.http.post(this.actionUrl, postData)
        .map(data => {
            data.json();
            return data.json();
        });
    }

    // Delete Records
    adminUserDelete(DelId : number) : any{
        let getToken    =   this.getcurrentUser();
        this.actionUrl  =   this.serverUrl + 'user-delete' ;
        return this.http.post(this.actionUrl, {id: DelId, token:getToken})
        .map(data => {
            data.json();
            // the console.log(...) line prevents your code from working 
            // either rem+ove it or add the line below (return ...)
            // console.log("Submit Post Data :: ", data.json());
            return data.json();
        });
    }*/

}