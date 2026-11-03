import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateTeam } from './http/can-activate-team';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  {
    path: 'sign-in',
    loadChildren: () =>
      import(
        "./components/log-in/log-in.module"
      ).then((m) => m.LogInModule),
  },
  {
    path: 'registration',
    loadChildren: () =>
      import(
        "./components/registration/registration.module"
      ).then((m) => m.RegistrationModule),
  },
  {
    path: 'fines',
    canActivate: [CanActivateTeam],
    loadChildren: () =>
      import(
        "./components/admin-dashboard/admin-dashboard.module"
      ).then((m) => m.AdminDashboardModule),
  },
  {
    path: 'parking-system',
    canActivate: [CanActivateTeam],
    loadChildren: () =>
      import(
        "./components/customer-dashboard/customer-dashboard.module"
      ).then((m) => m.CustomerDashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
