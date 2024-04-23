import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpVerificationModalComponent } from './otp-verification-modal.component';

describe('OtpVerificationModalComponent', () => {
  let component: OtpVerificationModalComponent;
  let fixture: ComponentFixture<OtpVerificationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtpVerificationModalComponent]
    });
    fixture = TestBed.createComponent(OtpVerificationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
