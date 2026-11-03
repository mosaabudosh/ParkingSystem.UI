import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { BookingService } from 'src/app/service/booking.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDashboardComponent {
  notValidBookings: any[] = [];

  constructor(
    private _cdr: ChangeDetectorRef,
    public bookingService: BookingService,
  ) {
    this.getNotValidBookings();
  }

  markForCheck() {
    this._cdr.markForCheck();
  }

  getNotValidBookings() {
    this.bookingService.getNotValidBookings().subscribe(response => {
      this.notValidBookings = [];
      if (response) {
        this.notValidBookings = response;
        this.markForCheck();
      }
    })
  }

  makeFineOfParkedNotValidBooking(notValidBooking: any) {
    this.bookingService.fineOfParkedNotValidBooking({ userId: notValidBooking.userId, fines: (notValidBooking.minutes * 0.25) / 100 }).subscribe(response => {
      if (response.isSuccess) {
        this.getNotValidBookings();
      }
    })
  }
}
