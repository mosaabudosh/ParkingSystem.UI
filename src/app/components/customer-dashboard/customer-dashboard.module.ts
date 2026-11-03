import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomerDashboardComponent } from './customer-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerDashboardComponent,
  }
];

@NgModule({
  declarations: [CustomerDashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    CustomerDashboardComponent
  ],
  providers: [DatePipe]
})
export class CustomerDashboardModule { }
