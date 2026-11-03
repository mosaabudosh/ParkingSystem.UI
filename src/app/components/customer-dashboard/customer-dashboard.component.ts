import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BookingStatuses } from 'src/app/enum/enums';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { BookingService } from 'src/app/service/booking.service';
import { NotificationService } from 'src/app/service/notification.service';
import { ParkingSpotService } from 'src/app/service/parking-spots.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerDashboardComponent implements OnInit {

  parkingSpots: any[] = [];

  minTime: any = new Date().getHours() + 1;
  booking: any = {
    bookingId: null,
    userId: null,
    parkingSpotId: null,
    bookingStatusId: BookingStatuses.Active,
    parkingSpotSlots: [],
    payment: {
      amount: null,
      paymentMethod: null,
    }
  }
  submitted: boolean = false;
  step: number = 0;
  pricePerHour: number = 2.5;
  parkingSpotSlots: any[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private _cdr: ChangeDetectorRef,
    public bookingService: BookingService,
    private parkingSpotService: ParkingSpotService,
    private _notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getParkingSpots();
    this._notificationService.onNotificationListener((message) => {
      this.getParkingSpots();
    })
  }

  markForCheck() {
    this._cdr.markForCheck();
  }

  fillDataForBooking(parkingSpot: any) {
    let user = this.authenticationService.getLoggedUser();
    this.booking.userId = user.userId;
    this.booking.parkingSpotId = parkingSpot.parkingSpotId;
    this.parkingSpotSlots = parkingSpot.parkingSpotSlots;//.filter((p: any) => !p.isOccupied);
    this.markForCheck();
  }

  clearDataBooking() {
    this.submitted = false;
    this.step = 0;
    this.booking = {
      bookingId: null,
      userId: null,
      parkingSpotId: null,
      bookingStatusId: BookingStatuses.Active,
      parkingSpotSlots: [],
      payment: {
        amount: null,
        paymentMethod: null,
      }
    };
    this.markForCheck();
  }

  getIsSelectedSlot(parkingSpotSlotId: number) {
    return this.booking.parkingSpotSlots.find((p: any) => p.parkingSpotSlotId == parkingSpotSlotId) != null;
  }

  addSlotInBooking(parkingSpotSlot: any) {
    if(this.bookingService.isJustView){
      return;
    }
    if (parkingSpotSlot.isOccupied) {
      return;
    }
    if (this.getIsSelectedSlot(parkingSpotSlot.parkingSpotSlotId)) {
      let indexOf = this.booking.parkingSpotSlots.indexOf(parkingSpotSlot);
      if (indexOf > -1) {
        this.booking.parkingSpotSlots.splice(indexOf, 1);
      }
    } else {
      this.booking.parkingSpotSlots.push(parkingSpotSlot);
    }
    this.markForCheck();
  }

  calculateAmount() {
    this.booking.payment.amount = this.booking.parkingSpotSlots?.length * this.pricePerHour;
    this.markForCheck();
  }

  createBooking() {
    this.submitted = true;
    if (this.booking.parkingSpotSlots?.length == 0) {
      return;
    }
    if (this.step == 0) {
      this.step = + 1;
      this.submitted = false;
      this.calculateAmount();
      this.markForCheck();
      return;
    }
    this.checkSameSpotAlreadyBooked();
  }

  checkSameSpotAlreadyBooked() {
    this.bookingService.checkSameSpotAlreadyBooked(this.booking.userId, this.booking.parkingSpotId).subscribe(response => {
      if (response.isSuccess) {
        if (response.isExsist) {
          if (confirm('Booking will be extended based on the new selected duration')) {
            this.bookingService.createBooking(this.booking).subscribe(response => {
              this.clearDataBooking();
              this.getParkingSpots();
            })
          } else {
            this.clearDataBooking();
          }
        } else {
          this.bookingService.createBooking(this.booking).subscribe(response => {
            this.clearDataBooking();
            this.getParkingSpots();
          })

        }
      }
    })
  }

  getParkingSpots() {
    this.parkingSpotService.getParkingSpots().subscribe(response => {
      this.parkingSpots = [];
      if (response) {
        this.parkingSpots = response;
        this.markForCheck();
      }
    })
  }
}
