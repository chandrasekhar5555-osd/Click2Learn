import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  isMenuToggled = true;
  loginHeader: boolean = false;
  userLoggedIn = false;
  cartItems: any = [];
  @Output() logoutUser = new EventEmitter<any>();
  userName: string = '';

  constructor(private router: Router, private cartService: CartService) {
    this.userName = localStorage.getItem('username') || 'Praveen';
  }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(x => this.cartItems = x);
  }

  logout(){
    this.logoutUser.emit(false);
    this.router.navigate(['/login'])
  }

}
