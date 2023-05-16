import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';
import { TenantService } from '../../services/tenant.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  AGE: string[] = [
    "Young", "Middle Age", "Senior"
  ]

  isSpinning = false;
  size: NzButtonSize = 'large';
  validateForm!: FormGroup;
  TENANTS: any;
  isVisible = false;
  userId = UserStorageService.getUserId();
  public show:boolean = true;
  public hideProfStatus:boolean=false;
  TENANTINFO:any;
  TenantStatus:any;
  tenantUserId:any;

  constructor(private fb: FormBuilder,
    private tenantService: TenantService,
    private notification: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      nationality: [null],
      age: [null,],
      interests: [null],
    });
    console.log(this.userId)
    this.getTenantByUserId();
  }

  searchTenant() {
    console.log(this.validateForm.value);
    this.isSpinning = true;
    this.tenantService.searchTenant(this.validateForm.value).subscribe((res) => {
      console.log(res);
      this.TENANTS = res.data.tenantDtoList;
      this.isSpinning = false;
    })
  }

  addTenantToFriendList(tenantId: any,tenantUserId:any) {
    const FriendsDto = {
      userId: UserStorageService.getUserId(),
      tenantId: tenantId,
      tenantUserId:tenantUserId
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

  getTenantByUserId() {
   
    this.tenantService.getTenantByUserId().subscribe((res) => {
      console.log("hi"+res);
      console.log("in res:::"+res.data.id);
      this.TENANTINFO=res.data;
      this.TenantStatus=res.data.status;
      console.log("in hideProfStatus:::"+this.TenantStatus);
      if(this.TenantStatus=='PENDING'){
        this.hideProfStatus=true;
        this.show=false;
        console.log("in hideProfStatus:::"+this.hideProfStatus);
        console.log("in hideProfStatus:::"+this.show);
      }
  
    
    })
    
  }

}
