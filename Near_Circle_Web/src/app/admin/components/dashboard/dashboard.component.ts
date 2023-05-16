import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from '../../admin-services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  validateForm!: FormGroup;
  APARTMENTS: any = [];
  isSpinning = false;
  size: NzButtonSize = 'large';

  constructor(private adminService: AdminService,
    private notification: NzNotificationService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({});
    this.getAllApartments();
  }

  getAllApartments() {
    this.APARTMENTS = [];
    this.isSpinning = true;
    this.adminService.getAllApartments().subscribe((res) => {
      this.APARTMENTS = res.data
      console.log(res);
      this.isSpinning = false;
    });
  }

  downloadFile(apartmentId: any) {
    this.isSpinning = true;
    this.adminService.getFile(apartmentId).subscribe((res) => {
      console.log(res);
      this.isSpinning = false;
    });
  }

  approveApartment(apartmentId: any) {
    const approveApartmentDto = {
      apartmentId: apartmentId,
    }
    this.adminService.approveApartment(approveApartmentDto).subscribe((res) => {
      if (res.status == "OK") {
        this.getAllApartments();
        this.notification
          .success(
            'SUCCESS',
            `Apartment Approved Successfully!!!`,
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

  rejectApartment(apartmentId: any) {
    const approveApartmentDto = {
      apartmentId: apartmentId,
    }
    this.adminService.rejectApartment(approveApartmentDto).subscribe((res) => {
      if (res.status == "OK") {
        this.getAllApartments();
        this.notification
          .success(
            'REJECT',
            `Apartment Approval Request Rejected!!!`,
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
