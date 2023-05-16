import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFriendTenantDetailsComponent } from './view-friend-tenant-details.component';

describe('ViewFriendTenantDetailsComponent', () => {
  let component: ViewFriendTenantDetailsComponent;
  let fixture: ComponentFixture<ViewFriendTenantDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFriendTenantDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFriendTenantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
