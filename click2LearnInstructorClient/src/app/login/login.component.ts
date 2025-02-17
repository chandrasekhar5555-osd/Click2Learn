import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services/authentiication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('closeLoginButton') closeLoginButton!: ElementRef;
  @ViewChild('closeRegButton') closeRegButton!: ElementRef;

  passwordType = 'Password';
  formvalid: boolean = false;
  fname!: string;
  lname!: string;
  email!: string;
  password!: string;
  code!: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  login() {
    console.log('here inside');
    console.log(this.email);
    // console.log(this.invalid)
    // if (!this.loginForm.invalid) {
    //   this.formvalid = true;
    // }
    // else{
    let credentials = {
      email: this.email,
      password: this.password,
    };
    this.authService.login(credentials).subscribe({
      next: (response: any) => {
        this.toastr.success(response.message);
        localStorage.setItem('email', this.email);
        localStorage.setItem('userID', response.user._id);
        localStorage.setItem('username', response.user.firstName);
        // this.loginForm.reset();

        if (this.closeLoginButton) {
          this.closeLoginButton.nativeElement.click();
        }

        this.sendOTP();

        this.fname = '';
        this.lname = '';
        this.email = '';
        this.password = '';
      },
      error: (err: any) => {
        if (err?.error.message) {
          this.toastr.error(err?.error.message);
        } else {
          this.toastr.error('Incorrect Username or Password');
        }
      },
    });

    // }
  }

  register() {
    let register = {
      lastName: this.fname,
      firstName: this.lname,
      email: this.email,
      password: this.password,
    };

    this.authService.signUp(register).subscribe({
      next: (response: any) => {
        debugger
        if (response?.code == 11000) {
          this.toastr.error('Your email already registered');
        }
        else if(!response?.errors) {
          this.toastr.success("Your enrollment is successful, Please login !!");
          localStorage.setItem('email', this.email);
          localStorage.setItem('userID', response.user._id);
          this.authService.onLoginUser(true);

          if (this.closeRegButton) {
            this.closeRegButton.nativeElement.click();
          }

          this.fname = '';
          this.lname = '';
          this.email = '';
          this.password = '';
        }
        else {
          this.toastr.error(response?._message);
        }

      },
      error: (err: any) => {
        if (err) {
          this.toastr.error('Unable to connect Database');
        }
      },
    });
  }

  sendOTP() {
    // Call your OTP service to send OTP to the user's email
    this.authService.sendOTP(this.email).subscribe({
      next: (response: any) => {
        //window.location.reload();
        this.toastr.success('OTP sent to your email');
      },
      error: (err: any) => {
        this.toastr.error('Failed to send OTP');
      },
    });
    this.router.navigate(['/verification']);
  }

  handleOTPVerification(otp: string) {
    // Handle OTP verification result here
    console.log('OTP entered by user:', otp);
  }
  fbLogin(fbAuthSuccess: boolean) {
    // Dummy login for test
    this.authService.onLoginUser(fbAuthSuccess);
    this.router.navigate(['/dashboard']);
  }
}
