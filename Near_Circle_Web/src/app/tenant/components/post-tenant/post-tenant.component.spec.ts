import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTenantComponent } from './post-tenant.component';

describe('PostTenantComponent', () => {
  let component: PostTenantComponent;
  let fixture: ComponentFixture<PostTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostTenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
