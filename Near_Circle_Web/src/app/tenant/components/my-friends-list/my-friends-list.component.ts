import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';
import { TenantService } from '../../services/tenant.service';

@Component({
  selector: 'app-my-friends-list',
  templateUrl: './my-friends-list.component.html',
  styleUrls: ['./my-friends-list.component.scss']
})
export class MyFriendsListComponent implements OnInit {

  gridStyle = {
    width: '20%',
    textAlign: 'center'
  };

  isSpinning = false;
  size: NzButtonSize = 'large';
  validateForm!: FormGroup;
  FRIENDS: any;
  noFriend:boolean=true;
  isVisible = false;
  imgSrc:any

  constructor(private fb: FormBuilder,
    private tenantService: TenantService,
    private notification: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({});
    this.getFriendListByUserId();
  }

  getFriendListByUserId() {
    this.isSpinning = true;
    this.tenantService.getFriendListByUserId().subscribe((res) => {
      console.log(res);
      this.FRIENDS = res.data;
      if(res.data.length==0){
        this.noFriend=true
      }else if(res.data.length>0){
        this.noFriend=false;
      }
      this.isSpinning = false;
      this.imgSrc
    })
  }

 

}
