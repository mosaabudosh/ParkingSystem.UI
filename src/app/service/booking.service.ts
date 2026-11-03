import { Injectable } from "@angular/core";
import { of, Observable, } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AppConfig } from "../http/app.config";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";

@Injectable({
    providedIn: 'root'
})
export class BookingService {

    timezoneOffset: number = new Date().getTimezoneOffset();
    headers: HttpHeaders;
    isJustView: boolean = false;

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

    checkSameSpotAlreadyBooked(userId: any, parkingSpotId: number): Observable<any> {
        return this.http.get(`${AppConfig.mainApiUrl}/Booking/check-spot-already-booked?userId=${userId}&parkingSpotId=${parkingSpotId}`, { headers: this.headers }).pipe(
            map(data => data),
            catchError(error => {
                console.error("Error in checkSameSpotAlreadyBooked \n  => ", error);
                return of();
            })
        );
    }

    createBooking(user: any): Observable<any> {
        return this.http.post(`${AppConfig.mainApiUrl}/Booking/create-booking`, user, { headers: this.headers }).pipe(
            map(data => data),
            catchError(error => {
                console.error("Error in CreateBooking \n  => ", error);
                return of();
            })
        );
    }

    checkTheDuration(): Observable<any> {
        return this.http.get(`${AppConfig.mainApiUrl}/Booking/check-duration`, { headers: this.headers }).pipe(
            map(data => data),
            catchError(error => {
                console.error("Error in checkTheDuration \n  => ", error);
                return of();
            })
        );
    }

    getNotValidBookings(): Observable<any> {
        return this.http.get(`${AppConfig.mainApiUrl}/Booking/not-valid-bookings`, { headers: this.headers }).pipe(
            map(data => data),
            catchError(error => {
                console.error("Error in getNotValidBookings \n  => ", error);
                return of();
            })
        );
    }

    fineOfParkedNotValidBooking(fineOfParkedNotValidBookingModel: any): Observable<any> {
        return this.http.put(`${AppConfig.mainApiUrl}/UserManagement/fine-parked-not-valid-booking`, fineOfParkedNotValidBookingModel, { headers: this.headers }).pipe(
            map(data => data),
            catchError(error => {
                console.error("Error in fineOfParkedNotValidBooking \n  => ", error);
                return of();
            })
        );
    }
}