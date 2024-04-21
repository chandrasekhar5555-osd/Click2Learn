import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from './../services/authentiication/authentication.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  userLoggedIn = false;
  onMenuShow = false;

  constructor(private router: Router,private authService: AuthenticationService) {    
    this.router.events.pipe(filter((event:any) => event instanceof NavigationEnd)).subscribe((event: any) => {
      this.onMenuShow = event.urlAfterRedirects.includes("/verification") || event.urlAfterRedirects.includes("/login") || event.urlAfterRedirects.includes("/signup") ? false: true;
    });
    this.authService.userLoggedIn.subscribe((x: boolean) => this.userLoggedIn = x);
  }

  ngOnInit(): void {
  }
}
