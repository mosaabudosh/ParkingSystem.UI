import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { AppConfig } from '../http/app.config';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    private hubConnection!: signalR.HubConnection;
    connectionId: any;
    notificationSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    notificationUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    userId: any;

    constructor(private _authenticationService: AuthenticationService) {
        if (this._authenticationService.isLoggedIn()) {
            this.getUser();
        }
    }

    getUser() {
        let user = this._authenticationService.getLoggedUser();
        this.userId = user?.userId;
    }

    startConnection(): void {
        if (!this._authenticationService.isLoggedIn()) {
            return;
        }
        let urlGroupParkingSystemTeam = `${AppConfig.notificationUrl}?group=${this.userId ? this.userId : 'ParkingSystemTeam'}`;
        if (this.hubConnection) {
            this.stopConnection();
        }
        this.hubConnection = new signalR.HubConnectionBuilder().withUrl(`${urlGroupParkingSystemTeam}`).withAutomaticReconnect().build();
        this.hubConnection?.start()
            .then(() => console.log('SignalR connection started'))
            .then(() => this.getConnectionId())
            .catch((err: any) => console.error('Error connecting to ParkingSystemTeam SignalR', err));

    }

    onNotificationListener = (callback: (notifications: any) => void) => {
        if (!this._authenticationService.isLoggedIn()) {
            return;
        }
        this.hubConnection?.on(`ParkingSystemTeam`, (response) => {
            this.notificationSubject.next(response);
            callback(response);
        })
    }

    getConnectionId = () => {
        this.hubConnection?.invoke('getconnectionid').then((data) => {
            this.connectionId = data;
        });
    }

    stopConnection(): void {
        this.hubConnection?.stop();
    }

}
