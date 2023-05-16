import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-my-apartments',
  templateUrl: './my-apartments.component.html',
  styleUrls: ['./my-apartments.component.scss']
})
export class MyApartmentsComponent implements OnInit {

  APARTMENTS: any;
  validateForm!: FormGroup;
  isSpinning = false;
  size: NzButtonSize = 'large';

  constructor(private managerService: ManagerService,
    private notification: NzNotificationService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
    });
    this.getAllApartmentsByUserId();
  }

  getAllApartmentsByUserId() {
    this.isSpinning = true;
    this.managerService.getAllApartmentsByUserId().subscribe((res) => {
      console.log(res);
      this.APARTMENTS = res.data;
      this.isSpinning = false;
    });
  }

  calculateDate(value) {
    return moment(value).fromNow();
  }

}
