import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/authAdmin/admin.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [

  { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
