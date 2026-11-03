import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: LogInComponent,
  }
];

@NgModule({
  declarations: [LogInComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    LogInComponent
  ],
})
export class LogInModule { }
