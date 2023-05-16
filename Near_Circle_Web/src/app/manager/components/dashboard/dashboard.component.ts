import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ManagerService } from '../../services/manager.service';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  validateForm!: FormGroup;
  TENANTS: any;
  isSpinning = false;
  size: NzButtonSize = 'large';

  constructor(private managerService: ManagerService,
    private notification: NzNotificationService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({});
    this.getTenantsByManagerId();
  }

  getTenantsByManagerId() {
    this.isSpinning = true;
    this.managerService.getTenantsByManagerId().subscribe((res) => {
      console.log(res);
      this.TENANTS = res.data
      this.isSpinning = false;
    });
  }

  approveTenant(tenantId: any) {
    const approveTenantDto = {
      tenantId: tenantId,
    }
    console.log(approveTenantDto)
    this.managerService.approveTenant(approveTenantDto).subscribe((res) => {
      if (res.status == "OK") {
        this.getTenantsByManagerId();
        this.notification
          .success(
            'SUCCESS',
            `Tenant Approved Successfully!!!`,
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
    });
  }

  calculateDate(value) {
    return moment(value).fromNow();
  }

}
