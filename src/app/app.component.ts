import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';
import { Router } from '@angular/router';
import { Roles } from './enum/enums';
import { NotificationService } from './service/notification.service';
import { BookingService } from './service/booking.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'ParkingSystem.UI';
  isClosedMenu: boolean = false;
  isViewLayout: boolean = false;
  isCustomerLayout: boolean = false;
  sideMenus: any[] = [
    {
      label: "Fines",
      icon: "bi bi-cash",
      command: (event: any) => {
        this.router.navigate(['/fines']);
      }
    },
    {
      label: "Parking",
      icon: "bi bi-p-square-fill",
      command: (event: any) => {
        this.bookingService.isJustView = true;
        this.router.navigate(['/parking-system']);
      }
    },
  ];
  userLoginSubjectSubscription: any;
  notificationCount: number;
  notificationMessage: string;
  viewMessage: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private _cdr: ChangeDetectorRef,
    private _notificationService: NotificationService,
    private bookingService: BookingService,
  ) {
    this.userLoginSubjectSubscription = this.authenticationService.loginSubject.subscribe(response => {
      let user = this.authenticationService.getLoggedUser();
      if (user) {
        if (user.roleIds.includes(Roles.Admin || Roles.Staff)) {
          this.isViewLayout = true;
          this.isCustomerLayout = false;
          this.router.navigate(['/fines']);

        } else {
          this.isViewLayout = false;
          this.isCustomerLayout = true;
          this.router.navigate(['/parking-system']);

        }
        this.markForCheck();
        this.startConnection();
      }
    });
  }

  startConnection() {
    this._notificationService.startConnection();
    this._notificationService.onNotificationListener((message) => {
      this.notificationMessage = message;
      this.viewMessage = true;
      this.notificationCount = 1;
      this.markForCheck();
      setTimeout(() => {
        this.notificationCount = 0;
        this.viewMessage = false;
        this.markForCheck();
      }, 1000000);
    });
  }

  markForCheck() {
    this._cdr.markForCheck();
  }

  hideMessage() {
    this.viewMessage = false;
    this.markForCheck();
  }

  onSignOut() {
    let user = this.authenticationService.getLoggedUser()
    this.authenticationService.logout({ email: user.email }).subscribe(response => {
      if (response && response.isSuccess) {
        this._notificationService.stopConnection();
        this.isViewLayout = false;
        this.markForCheck();
        this.router.navigate(['/sign-in']);
      }
    })
  }

  onMenuClick() {
    this.isClosedMenu = !this.isClosedMenu;
    this.markForCheck();
  }

  checkTheDuration() {
    this.bookingService.checkTheDuration().subscribe(response => { })
  }
}
