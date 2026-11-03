import { Injectable } from "@angular/core";
import { of, Observable, BehaviorSubject } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";
import { jwtDecode } from "jwt-decode";
import { AppConfig } from "../http/app.config";
import { StorageService } from "./storage.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LocalStorage } from "../enum/enums";

@Injectable({
    providedIn: "root"
})
export class AuthenticationService {
    loginSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    timezoneOffset: number = new Date().getTimezoneOffset();
    headers: HttpHeaders = new HttpHeaders({
        "Accept": "application/json",
        "Content-Type": "application/json",
        "TimeZone-Offset": this.timezoneOffset.toString(),
    })
    constructor(
        private storageService: StorageService,
        private http: HttpClient
    ) { }

    signIn(user: { email: string; password: string }): Observable<any> {
        return this.http.post(`${AppConfig.mainApiUrl}/UserManagement/login`, user, { headers: this.headers }).pipe(
            tap((response: any) => {
                if (response) {
                    this.saveLogedUserData(<any>response)
                }
            }),
            map(response => response)
        );
    }

    logout(logout: { email: string }): Observable<any> {
        return this.http.post(`${AppConfig.mainApiUrl}/UserManagement/logout`, logout, { headers: this.headers }).pipe(
            tap((response: any) => {
                if (response) {
                    this.removeLocalStorageData()
                }
            }),
            map(data => data),
            catchError(error => {
                console.error("Error in logout \n  => ", error);
                return of();
            })
        );
    }

    registration(user: any): Observable<any> {
        return this.http.post(`${AppConfig.mainApiUrl}/UserManagement/registration`, user, { headers: this.headers }).pipe(
            map(data => data),
            catchError(error => {
                console.error("Error in registration \n  => ", error);
                return of();
            })
        );
    }

    isLoggedIn() {
        return !!this.getAccessToken();
    }

    saveLogedUserData(info: any) {
        if (info?.isSuccess == false) {
            return;
        }
        this.setAccessToken(info.accessToken);
        this.storageService.setData(LocalStorage.User, JSON.stringify(info));
        this.loginSubject.next(info);
    }

    removeLocalStorageData() {
        this.storageService.removeData(LocalStorage.AccessToken);
        this.storageService.removeData(LocalStorage.User);
        this.storageService.removeData(LocalStorage.ClosedMenu);
        this.loginSubject.next(null);
    }


    getLoggedUser() {
        return JSON.parse(this.storageService.getData(LocalStorage.User));
    }

    setAccessToken(accessToken: any) {
        this.storageService.setData(LocalStorage.AccessToken, accessToken);
    }

    getAccessToken() {
        return this.storageService.getData(LocalStorage.AccessToken);
    }

}
