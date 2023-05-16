import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TenantService } from '../../services/tenant.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-post-tenant',
  templateUrl: './post-tenant.component.html',
  styleUrls: ['./post-tenant.component.scss']
})
export class PostTenantComponent implements OnInit {

  APARTMENTS: any
  isSpinning = false;
  validateForm!: FormGroup;
  AGE: string[] = ["Young(15-30)", "Middle Age(31-50)", "Senior(50+)"]
  //AGE: string[] = ["Young", "Middle Age", "Senior"]
  loading = false;
  avatarUrl?: string;
  img: File;
  TENANTINFO:any;
  imgSrc:any
 
  

 
  


  constructor(private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private tenantService: TenantService,private msg: NzMessageService) { }

  ngOnInit(): void {
    
    this.validateForm = this.fb.group({
      apartmentId: [null, [Validators.required]],
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      address: [null, []],
      avatarUrl:[null, []],
      age: [null, [Validators.required]],
      bio: [null, [Validators.required]],
      interests: [null, [Validators.required]],
      //race: [null, [Validators.required]],
      //ethnicity: [null, [Validators.required]],
      nationality: [null, [Validators.required]],
      mobile: [null, [Validators.pattern("^\\d{10}$")]],
    });
    this.getAllTenants();
    this.getTenantByUserId();
    
    
    
  }

  getAllTenants() {
    this.isSpinning = true;
    this.tenantService.getAllTenants().subscribe((res) => {
      console.log(res);
      this.APARTMENTS = res.data;
     
      this.isSpinning = false;
    });
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
  new Observable((observer: Observer<boolean>) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      this.msg.error('You can only upload JPG file!');
      observer.complete();
      return;
    }
    const isLt2M = file.size! / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.msg.error('Image must smaller than 2MB!');
      observer.complete();
      return;
    }
    observer.next(isJpgOrPng && isLt2M);
 
    observer.complete();
  });

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
    this.tenantService.postPic(img).subscribe() ;
  }

  handleChange(info: { file: NzUploadFile }): void {
    console.log("status"+info.file.status);

    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        info.file.status='done';
        
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
       
        break;
      case 'error':
        //this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }


  getTenantByUserId() {
   
    this.tenantService.getTenantByUserId().subscribe((res) => {
     // console.log("hi"+res);
     // console.log("in res:::"+res.data.id);
     
      //if(res=!null && res.data!=null){
        this.TENANTINFO=res.data;
      console.log("tenantInfo:"+res.data.lastname);
      console.log("serter:"+this.TENANTINFO.apartmentId);
    console.log("serter11:"+this.TENANTINFO.interests);
    if(this.TENANTINFO.firstname!=null && this.TENANTINFO.firstname!=""){
      this.validateForm.get('firstname').setValue(this.TENANTINFO.firstname);
      this.validateForm.get('firstname').disable();
    }

    if(this.TENANTINFO.lastname!=null && this.TENANTINFO.lastname!=""){
      this.validateForm.get('lastname').setValue(this.TENANTINFO.lastname);
      this.validateForm.get('lastname').disable();
    }

    if(this.TENANTINFO.apartmentId!=null && this.TENANTINFO.apartmentId!=""){
      this.validateForm.get('apartmentId').setValue(String(this.TENANTINFO.apartmentId));
      this.validateForm.get('apartmentId').disable();
    }

    if(this.TENANTINFO.apartmentId!=null && this.TENANTINFO.apartmentId!=""){
      this.validateForm.get('apartmentId').setValue(String(this.TENANTINFO.apartmentId));
      this.validateForm.get('apartmentId').disable();
    }

    if(this.TENANTINFO.address!=null && this.TENANTINFO.address!=""){
      this.validateForm.get('address').setValue(String(this.TENANTINFO.address));
      this.validateForm.get('address').disable();
    }

    if(this.TENANTINFO.mobile!=null && this.TENANTINFO.mobile!=""){
      this.validateForm.get('mobile').setValue(this.TENANTINFO.mobile);
      this.validateForm.get('mobile').disable();
    }

    if(this.TENANTINFO.nationality!=null && this.TENANTINFO.nationality!=""){
      this.validateForm.get('nationality').setValue(this.TENANTINFO.nationality);
      this.validateForm.get('nationality').disable();
    }
    
    
   
    this.validateForm.get('age').setValue(this.TENANTINFO.age);
    this.validateForm.get('bio').setValue(this.TENANTINFO.bio);
    this.getTenantProfilePic();
    
    console.log("bio::"+this.TENANTINFO.bio)
   if( Array(this.TENANTINFO.interests).length>1){
for(let entry of this.TENANTINFO.interests){
  this.validateForm.get('interests').setValue(0)[entry];
  
}
    }else{

    }
    this.validateForm.get('interests').setValue(Array(this.TENANTINFO.interests));
    
     // }
    })
    
  }


  getTenantProfilePic(){
    this.tenantService.getTenantProfilePic().subscribe((res) => {
      this.imgSrc =res.data.file
      //this.validateForm.get('avatarUrl').setValue(this.imgSrc);
      
    })
 
  }

  submitForm(): void {
    console.log(this.validateForm.valid);
    console.log(this.validateForm);
    
    if (this.validateForm.valid) {
      console.log("In function");
      this.isSpinning = true;
      this.tenantService.postTenant(this.validateForm.value).subscribe((res) => {
        this.isSpinning = false;
        if (res.status == "CREATED") {
          this.notification
            .success(
              'SUCCESS',
              `Tenant Profile Verification Request sent to Apt Manager Successfully !`,
              { nzDuration: 5000 }
            );
          this.router.navigateByUrl('/tenant/dashboard');
        } else {
          this.notification
            .error(
              'ERROR',
              `${res.message}`,
              { nzDuration: 5000 }
            )
        }
      });
    } else {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }

}
