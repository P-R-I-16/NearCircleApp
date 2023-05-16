import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TenantService } from '../../services/tenant.service';

@Component({
  selector: 'app-post-something',
  templateUrl: './post-something.component.html',
  styleUrls: ['./post-something.component.scss']
})
export class PostSomethingComponent implements OnInit {

  isSpinning = false;
  validateForm!: FormGroup;
  USER: any;
  TENANTINFO:any;
  tenantId: any;
  POSTS: any
  imgSrc:any
  noPosts:boolean=true;
 
 

  constructor(private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private tenantService: TenantService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      text: [null, [Validators.required]],
    });
    this.getTenantByUserId();
    this.getTenantProfilePic();
    this.getFriendsCountByUserId();
    this.getAllPosts();
  }

  getTenantByUserId() {
    this.isSpinning = true;
    this.tenantService.getTenantByUserId().subscribe((res) => {
      console.log("hi"+res);
      console.log("in res:::"+res.data.id);
      this.TENANTINFO=res.data;
      this.tenantId = res.data.id;
      console.log("in res ten:::"+this.tenantId );
      this.isSpinning = false;
    })
  }

  getTenantProfilePic(){
    this.tenantService.getTenantProfilePic().subscribe((res) => {
      this.imgSrc =res.data.file
      
      
    })
 
  }


  getFriendsCountByUserId() {
    this.isSpinning = true;
    this.tenantService.getFriendsCountByUserId().subscribe((res) => {
      console.log("in user"+res);
      this.USER = res.data;
      this.isSpinning = false;
    })
  }

  getAllPosts() {
    this.isSpinning = true;
    this.tenantService.getTenantByUserId().subscribe((res) => {
      console.log("hi"+res);
      console.log("in res:::"+res.data.id);
      this.TENANTINFO=res.data;
      this.tenantId = res.data.id;
      console.log("in res ten:::"+this.tenantId );
      console.log("posts tenantId:"+this.tenantId);
      this.tenantService.getAllPosts(this.tenantId).subscribe((res) => {
        console.log(res);
        this.POSTS = res.data;
       // console.log("in res posts::"+res.data.id);
        if(res.data.length==0){
          this.noPosts=true;
        }
        else if(res.data.length>0){
          this.noPosts=false;
        }
        this.isSpinning = false;
      })
      this.isSpinning = false;
    })
   
  }

  submitForm(): void {
    this.isSpinning = true;
    this.tenantService.getTenantByUserId().subscribe((res) => {
      this.tenantId = res.data.id;
     
    })
    console.log("tenantId:"+this.tenantId)
    this.tenantService.tenantPostSomething(this.validateForm.value, this.tenantId).subscribe((res) => {
      this.isSpinning = false;
      if (res.status == "CREATED") {
        this.notification
          .success(
            'SUCCESS',
            `Post Posted Successfully!`,
            { nzDuration: 5000 }
          );
        this.getAllPosts();
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

}
