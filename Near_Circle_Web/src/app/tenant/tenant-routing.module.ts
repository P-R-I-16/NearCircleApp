import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantGuard } from '../guards/authTenant/tenant.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyFriendsListComponent } from './components/my-friends-list/my-friends-list.component';
import { PostSomethingComponent } from './components/post-something/post-something.component';
import { PostTenantComponent } from './components/post-tenant/post-tenant.component';
import { TenantsInMyApartmentsComponent } from './components/tenants-in-my-apartments/tenants-in-my-apartments.component';
import { ViewFriendTenantDetailsComponent } from './components/view-friend-tenant-details/view-friend-tenant-details.component';
import { TenantComponent } from './tenant.component';

const routes: Routes = [
  { path: '', component: TenantComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [TenantGuard] },
  { path: 'tenant', component: PostTenantComponent, canActivate: [TenantGuard] },
  { path: 'tenants', component: TenantsInMyApartmentsComponent, canActivate: [TenantGuard] },
  { path: 'friends', component: MyFriendsListComponent, canActivate: [TenantGuard] },
  { path: 'friend/:tenantId', component: ViewFriendTenantDetailsComponent, canActivate: [TenantGuard] },
  { path: 'post', component: PostSomethingComponent, canActivate: [TenantGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantRoutingModule { }
