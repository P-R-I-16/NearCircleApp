import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../services/auth/auth.service';
import { UserStorageService } from '../services/storage/user-storage.service';
import { TenantService } from 'src/app/tenant/services/tenant.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;
  isSpinning = false;
  isVerifiedTenantLoggedIn:boolean=false;
  apartmentId: any;
status:any;
  submitForm(): void {
    this.isSpinning = true;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.authService.login(this.validateForm.get(['userName'])!.value, this.validateForm.get(['password'])!.value).subscribe(res => {
      this.isSpinning = false;
     //old version
      /*if (UserStorageService.isAdminLoggedIn()) {
        this.router.navigateByUrl('admin/dashboard');
      } else if (UserStorageService.isTenantLoggedIn() && this.isVerifiedTenantLoggedIn) {
        this.router.navigateByUrl('tenant/dashboard');
      } else if (UserStorageService.isTenantLoggedIn() && !this.isVerifiedTenantLoggedIn) {
        this.router.navigateByUrl('tenant/tenant');
      }else if (UserStorageService.isManagerLoggedIn()) {
        this.router.navigateByUrl('manager/dashboard');
      }
*/

      if (UserStorageService.isAdminLoggedIn()) {
        this.router.navigateByUrl('admin/dashboard');
      }else if (UserStorageService.isManagerLoggedIn()) {
        this.router.navigateByUrl('manager/dashboard');
      }else{
        this.tenantService.getTenantByUserId().subscribe((res) => {
          
          this.apartmentId = res.data.apartmentId;
          this.status = res.data.status;
          console.log("verfied apt id"+this.apartmentId);
          console.log("verfied status"+this.status);
        
          if(this.status==null||this.status=='PENDING'){
            console.log("verfied apt id null"+this.apartmentId);
           this.isVerifiedTenantLoggedIn=false;
          //earlier code this.router.navigateByUrl('tenant/tenant');
          this.router.navigateByUrl('tenant/dashboard');
            }
            else{
            console.log("verfied apt id not null"+this.apartmentId);
            this.isVerifiedTenantLoggedIn=true;
            console.log("verfied login"+this.isVerifiedTenantLoggedIn);
            this.router.navigateByUrl('tenant/dashboard');
       
            }
        })
        this.router.navigateByUrl('tenant/tenant');
      }

      console.log("res", res);
    }, error => {
      console.log("errorr", error);
      if (error.status == 406) {
        this.notification
          .error(
            'ERROR',
            `User Is Not Active. Please Verify Email.`,
            { nzDuration: 5000 }
          )
      } else {
        this.notification
          .error(
            'ERROR',
            `Bad credentials`,
            { nzDuration: 5000 }
          )
      }
      this.isSpinning = false;

    })

  }

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private notification: NzNotificationService,private tenantService: TenantService,
    private router: Router,) { }

  ngOnInit(): void {
    
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
    
  }



  
}