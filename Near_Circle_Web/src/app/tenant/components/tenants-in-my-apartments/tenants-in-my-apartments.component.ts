import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';
import { TenantService } from '../../services/tenant.service';

@Component({
  selector: 'app-tenants-in-my-apartments',
  templateUrl: './tenants-in-my-apartments.component.html',
  styleUrls: ['./tenants-in-my-apartments.component.scss']
})
export class TenantsInMyApartmentsComponent implements OnInit {

  isSpinning = false;
  size: NzButtonSize = 'large';
  validateForm!: FormGroup;
  TENANTS: any;
  isVisible = false;
  apartmentId: any;
  inSessionTenantId:any

  constructor(private fb: FormBuilder,
    private tenantService: TenantService,
    private notification: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
    });
    this.getTenantByUserId();
  }

  getTenantByUserId() {
    this.isSpinning = true;
    this.tenantService.getTenantByUserId().subscribe((res) => {
      this.apartmentId = res.data.apartmentId;
      this.inSessionTenantId = res.data.id;
      console.log("hello world id"+this.inSessionTenantId);
      this.isSpinning = false;
      this.viewTenantsByApartmentId();
    })
  }

  viewTenantsByApartmentId() {
    this.isSpinning = true;
    this.tenantService.viewTenantsByApartmentId(this.apartmentId,this.inSessionTenantId).subscribe((res) => {
      console.log("hello world");
      console.log(res);
      this.TENANTS = res.data;
      this.isSpinning = false;

    })
  }

  addTenantToFriendList(tenantId: any) {
    const FriendsDto = {
      userId: UserStorageService.getUserId(),
      tenantId: tenantId
    }
    this.isSpinning = true;
    this.tenantService.addTenantToFriendList(FriendsDto).subscribe((res) => {
      console.log(res);
      this.isSpinning = false;
      if (res.status == "CREATED") {
        this.notification
          .success(
            'SUCCESS',
            `Tenant Added into Friend List successfully!`,
            { nzDuration: 5000 }
          );

      } else {
        this.notification
          .error(
            'ERROR',
            `${res.message}`,
            { nzDuration: 5000 }
          )
      }
    }, error => {
      console.log("errorr", error);
      if (error.status == 406) {
        this.notification
          .error(
            'ERROR',
            `${error.error}`,
            { nzDuration: 5000 }
          )
      }
      this.isSpinning = false;
    })
  }

  calculateDate(value) {
    return moment(value).fromNow();
  }

}
