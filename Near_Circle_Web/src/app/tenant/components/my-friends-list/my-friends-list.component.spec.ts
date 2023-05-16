import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFriendsListComponent } from './my-friends-list.component';

describe('MyFriendsListComponent', () => {
  let component: MyFriendsListComponent;
  let fixture: ComponentFixture<MyFriendsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyFriendsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFriendsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
