import { Component, OnInit } from '@angular/core';
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
  
  passwordType = 'Password';
  formvalid: boolean = false;
  selectedUser: string = '';
  email!: string
  password!: string
  code!:string
  isOtpSent: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthenticationService, private toastr: ToastrService,
  ) {

  }

  ngOnInit(): void {
  }
  

  login() {
    console.log("here inside")
    console.log(this.email);
    // console.log(this.invalid)
    // if (!this.loginForm.invalid) {
    //   this.formvalid = true;
    // }
    // else{
      let credentials = {
        email: this.email,
        password: this.password
      }
      this.authService.login(credentials).subscribe({
        next:(response:any) => {
          this.toastr.success(response.message);
          localStorage.setItem('email', this.email);
          localStorage.setItem('userID', response._id);
          // this.loginForm.reset();
          this.authService.onLoginUser(true);
this.sendOTP();

          // this.router.navigate(['/dashboard']);
        },
        error:(err:any) => {
          if(err?.error.message)
          {
            this.toastr.error(err?.error.message);
          }
          else {
          this.toastr.error("Unavailable SQL Server");
          }
        }
      });
      
    // }
  }
  sendOTP() {
    // Call your OTP service to send OTP to the user's email
    this.authService.sendOTP(this.email).subscribe({
      next: (response: any) => {
        window.location.reload();
        // console.log(response,"inside auth")
        this.toastr.success('OTP sent to your email');
        // this.isOtpSent = true;
        
      },
      error: (err: any) => {
        this.toastr.error('Failed to send OTP');
      }
      
    });
    this.router.navigate(['/verification'])
    this.isOtpSent = true;
  }


  handleOTPVerification(otp: string) {
    // Handle OTP verification result here
    console.log('OTP entered by user:', otp);
  }
  fbLogin(fbAuthSuccess: boolean){ // Dummy login for test
    this.authService.onLoginUser(fbAuthSuccess);
    this.router.navigate(['/dashboard']);
  }

  userSelect(user: string){
    this.selectedUser = user.toUpperCase();
  }
}
