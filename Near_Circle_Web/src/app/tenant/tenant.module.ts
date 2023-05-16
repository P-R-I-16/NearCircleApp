import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantRoutingModule } from './tenant-routing.module';
import { TenantComponent } from './tenant.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostTenantComponent } from './components/post-tenant/post-tenant.component';
import { DemoNgZorroAntdModule } from '../DemoNgZorroAntdModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TenantsInMyApartmentsComponent } from './components/tenants-in-my-apartments/tenants-in-my-apartments.component';
import { MyFriendsListComponent } from './components/my-friends-list/my-friends-list.component';
import { ViewFriendTenantDetailsComponent } from './components/view-friend-tenant-details/view-friend-tenant-details.component';
import { PostSomethingComponent } from './components/post-something/post-something.component';

@NgModule({
  declarations: [
    TenantComponent,
    DashboardComponent,
    PostTenantComponent,
    TenantsInMyApartmentsComponent,
    MyFriendsListComponent,
    ViewFriendTenantDetailsComponent,
    PostSomethingComponent
  ],
  imports: [
    CommonModule,
    TenantRoutingModule,
    DemoNgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TenantModule { }
