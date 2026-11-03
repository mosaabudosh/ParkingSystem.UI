import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from 'src/app/enum/enums';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogInComponent {

  loginModel: any = {
    email: null,
    password: null
  }
  errorMessage: any;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private _cdr: ChangeDetectorRef,
  ) { }

  onRegistration() {
    this.router.navigate(['/registration']);
  }

  signIn() {
    this.authenticationService.signIn(this.loginModel).subscribe(response => {
      if (!response?.isSuccess) {
        this.errorMessage = response?.message;
        this._cdr.markForCheck();
        return;
      }
      if (response) {
        if (response.roleIds && response.roleIds.includes(Roles.Admin || Roles.Staff)) {
          this.router.navigate(['/fines']);
        } else {
          this.router.navigate(['/parking-system']);
        }
      }
    })
  }
}
