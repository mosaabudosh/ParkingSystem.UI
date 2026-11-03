import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from 'src/app/enum/enums';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent {

  registrationModel: any = {
    fullName: null,
    phone: null,
    email: null,
    password: null,
    repeatPassword: null,
    roleId: Roles.Customer
  }
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) { }

  registration() {
    this.authenticationService.registration(this.registrationModel).subscribe(response => {
      if (response && response.isSuccess) {
        this.onBack();
      }
    })
  }

  onBack() {
    this.router.navigate(['/sign-in']);
  }
}
