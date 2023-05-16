import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostApartmentComponent } from './components/post-apartment/post-apartment.component';
import { DemoNgZorroAntdModule } from '../DemoNgZorroAntdModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyApartmentsComponent } from './components/my-apartments/my-apartments.component';

@NgModule({
  declarations: [
    ManagerComponent,
    DashboardComponent,
    PostApartmentComponent,
    MyApartmentsComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    DemoNgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ManagerModule { }
