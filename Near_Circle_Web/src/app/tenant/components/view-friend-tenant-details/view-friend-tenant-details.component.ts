import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TenantService } from '../../services/tenant.service';

@Component({
  selector: 'app-view-friend-tenant-details',
  templateUrl: './view-friend-tenant-details.component.html',
  styleUrls: ['./view-friend-tenant-details.component.scss']
})
export class ViewFriendTenantDetailsComponent implements OnInit {

  tenantId: any = this.activatedroute.snapshot.params['tenantId'];
  isSpinning = false;
  size: NzButtonSize = 'large';
  validateForm!: FormGroup;
  FRIEND: any

  constructor(private fb: FormBuilder,
    private tenantService: TenantService,
    private notification: NzNotificationService,
    private router: Router,
    private activatedroute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({});
    this.getTenantFriendByTenantId();
  }

  getTenantFriendByTenantId() {
    this.isSpinning = true;
    this.tenantService.getTenantFriendByTenantId(this.tenantId).subscribe((res) => {
      console.log(res);
      this.FRIEND = res.data;
      this.isSpinning = false;
    })
  }

  calculateDate(value) {
    return moment(value).fromNow();
  }

}
