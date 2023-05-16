import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantsInMyApartmentsComponent } from './tenants-in-my-apartments.component';

describe('TenantsInMyApartmentsComponent', () => {
  let component: TenantsInMyApartmentsComponent;
  let fixture: ComponentFixture<TenantsInMyApartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantsInMyApartmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantsInMyApartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
