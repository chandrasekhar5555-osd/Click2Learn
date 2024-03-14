import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  coursesList = [
    {'id':1, 'course': 'Java for Beginners', price: 25},
    {'id':1, 'course': 'React Basics', price: 35},
    {'id':1, 'course': 'Web Development', price: 40},
    {'id':1, 'course': 'Frontend Designing', price: 20}
  ]
}
