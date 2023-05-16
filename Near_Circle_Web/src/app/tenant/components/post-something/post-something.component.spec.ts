import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSomethingComponent } from './post-something.component';

describe('PostSomethingComponent', () => {
  let component: PostSomethingComponent;
  let fixture: ComponentFixture<PostSomethingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostSomethingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSomethingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
