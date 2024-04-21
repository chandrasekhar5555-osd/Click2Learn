import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentiication/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
@Component({
  selector: 'app-otp-verification-modal',
  templateUrl: './otp-verification-modal.component.html',
  styleUrls: ['./otp-verification-modal.component.scss']
})
export class OtpVerificationModalComponent {
  enteredOTP: string = '';
  code!: string;
  constructor(private router: Router, private authService: AuthenticationService, private toastr: ToastrService, private location: Location) {
  }

  ngOnInit() {
  }
  verifyOTP() {

    console.log("here verify otp")
    const email = localStorage.getItem("email")
    this.authService.verifyOTP(email, this.code).subscribe({
      next: (response: any) => {
        this.toastr.success('OTP verified successfully');
        this.authService.onLoginUser(true);
        // Proceed with login after OTP verification
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        this.toastr.error('Failed to verify OTP');
      }
    });
  }
}
