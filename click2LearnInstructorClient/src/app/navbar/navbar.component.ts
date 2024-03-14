import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isMenuToggled = true;
  loginHeader: boolean = false;
  userLoggedIn = false;
  @Output() logoutUser = new EventEmitter<any>();
  userName: string = '';

  constructor(private router: Router) {
    this.userName = localStorage.getItem('username') || '';
  }

  logout(){
    this.logoutUser.emit(false);
    this.router.navigate(['/login'])
  }

}
