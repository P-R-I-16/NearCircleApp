import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStorageService } from '../services/storage/user-storage.service';
import { TenantService } from '../tenant/services/tenant.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  apartmentId: any;
  isTenantLoggedIn: boolean = UserStorageService.isTenantLoggedIn();
  isAdminLoggedIn: boolean = UserStorageService.isAdminLoggedIn();
  isManagerLoggedIn: boolean = UserStorageService.isManagerLoggedIn();
  isVerifiedTenantLoggedIn:boolean=false;
  status:any;


  constructor(private router: Router,private tenantService: TenantService) { }

  ngOnInit(): void {
  
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.isTenantLoggedIn = UserStorageService.isTenantLoggedIn();
        this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
        this.isManagerLoggedIn = UserStorageService.isManagerLoggedIn();
        this.getTenantByUserId();
        console.log("inside this.isVerifiedTenantLoggedIn:"+this.isVerifiedTenantLoggedIn);
       
        
      }
    })
  }

  logout() {
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }


  getTenantByUserId() {

    this.tenantService.getTenantByUserId().subscribe((res) => {
     // this.apartmentId = res.data.apartmentId;
      this.status=res.data.status;
      if(this.status==null||this.status=='PENDING'){
        
       this.isVerifiedTenantLoggedIn=false;
        }
        else{
        
        this.isVerifiedTenantLoggedIn=true;
       
   
        }
    })
    
   
   
  }
}