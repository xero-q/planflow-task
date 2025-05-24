import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterAuthComponent } from './after-auth.component';

describe('AfterAuthComponent', () => {
  let component: AfterAuthComponent;
  let fixture: ComponentFixture<AfterAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfterAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfterAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
