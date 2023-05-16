import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthManagerGuard } from '../guards/authManager/auth-manager.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyApartmentsComponent } from './components/my-apartments/my-apartments.component';
import { PostApartmentComponent } from './components/post-apartment/post-apartment.component';
import { ManagerComponent } from './manager.component';

const routes: Routes = [
  { path: '', component: ManagerComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthManagerGuard] },
  { path: 'apartment', component: PostApartmentComponent, canActivate: [AuthManagerGuard] },
  { path: 'apartments', component: MyApartmentsComponent, canActivate: [AuthManagerGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
