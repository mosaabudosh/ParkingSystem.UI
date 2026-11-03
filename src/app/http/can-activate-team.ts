import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AuthenticationService } from "../service/authentication.service";

@Injectable({
    providedIn: "root"
})
export class CanActivateTeam implements CanActivate {

    constructor(private authenticationService: AuthenticationService) { }

    canActivate(): boolean {
        return this.authenticationService.isLoggedIn();
    }


}
