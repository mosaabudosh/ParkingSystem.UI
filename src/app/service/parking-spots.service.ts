import { Injectable } from "@angular/core";
import { of, Observable, } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AppConfig } from "../http/app.config";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";

@Injectable({
    providedIn: 'root'
})
export class ParkingSpotService {

    timezoneOffset: number = new Date().getTimezoneOffset();
    headers: HttpHeaders;
    constructor(
        private http: HttpClient,
        private _authenticationService: AuthenticationService
    ) {
        const accessToken = _authenticationService.getAccessToken();
        this.headers = new HttpHeaders({
            "Accept": "application/json",
            "Content-Type": "application/json",
            "TimeZone-Offset": this.timezoneOffset.toString(),
            "Authorization": `Bearer ${accessToken}`
        })
    }

    getParkingSpots(): Observable<any> {
        return this.http.get(`${AppConfig.mainApiUrl}/ParkingSpot/parking-spots`, { headers: this.headers }).pipe(
            map(data => data),
            catchError(error => {
                console.error("Error in getParkingSpots \n  => ", error);
                return of();
            })
        );
    }
}