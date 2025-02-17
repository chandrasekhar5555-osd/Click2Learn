import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ShopComponent } from './sidebar/shop/shop.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './sidebar/cart/cart.component';
import { CoursesComponent } from './courses/courses.component';
import { OtpVerificationModalComponent } from './otp-verification-modal/otp-verification-modal.component';
import { AuthGuard } from './services/AuthGuard/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'shop', component: CoursesComponent, canActivate: [AuthGuard] },
  { path: 'course', component: ShopComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  {path:'verification',component:OtpVerificationModalComponent},
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
