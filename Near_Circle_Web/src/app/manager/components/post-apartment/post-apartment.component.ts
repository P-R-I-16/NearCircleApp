import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-post-apartment',
  templateUrl: './post-apartment.component.html',
  styleUrls: ['./post-apartment.component.scss']
})
export class PostApartmentComponent implements OnInit {

  isSpinning = false;
  validateForm!: FormGroup;
  currentFileUpload: File;
  myFile: FileList;

  constructor(private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private managerService: ManagerService,
    private msg: NzMessageService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      address: [null, [Validators.required]],
      managerName: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      country: [null, [Validators.required]],
      mobile: [null, [Validators.pattern("^\\d{10}$")]],
    });
  }

  submitForm(): void {
    console.log(this.validateForm.valid);
    console.log(this.validateForm);
    if (this.validateForm.valid) {
      console.log("In function");
      this.isSpinning = true;
      const formData: FormData = new FormData();
      formData.append('img', this.currentFileUpload);
      formData.append('name', this.validateForm.get('name').value);
      formData.append('address', this.validateForm.get('address').value);
      formData.append('managerName', this.validateForm.get('managerName').value);
      formData.append('city', this.validateForm.get('city').value);
      formData.append('state', this.validateForm.get('state').value);
      formData.append('country', this.validateForm.get('country').value);
      formData.append('phoneNo', this.validateForm.get('mobile').value);
      console.log(formData);
      this.managerService.postApartment(formData).subscribe((res) => {
        this.isSpinning = false;
        if (res.status == "CREATED") {
          this.notification
            .success(
              'SUCCESS',
              `Apartment Posted Successfully!`,
              { nzDuration: 5000 }
            );
          this.router.navigateByUrl('/manager/apartments');
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

  uploadProfileImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const file = input.files[0];
    this.currentFileUpload = file;
    alert('File is here : ' + this.currentFileUpload);

  }

  public selectFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.myFile = input.files;

    if (!input.files?.length) {
      return;
    }
    this.currentFileUpload = input.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.currentFileUpload);
    reader.onload = (_event) => {
      // this.avatarUrl = reader.result;
    };
  }

}
