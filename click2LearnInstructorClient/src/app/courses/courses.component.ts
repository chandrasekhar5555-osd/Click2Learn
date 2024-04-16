import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  @ViewChild('closeButton') closeButton!: ElementRef;
  expandedIndex: number = -1;
  courses: any[] = [
    {
      id: 1,
      title: 'Angular Basics',
      description: 'Learn the fundamentals of Angular and build your first app.',
      price: '$49',
      image: '.../../assets/images/dashboardmain.jpg',
      videoId: 'k5E2AVpwsko',
      rating: 4.5,
      numberOfRatings: 1200,
      createdBy: 'John Doe',
      lastUpdated: '2022-04-01',
      courseDetails: {
        hours: '7.5 hours on-demand video',
        codingExercises: 6,
        articles: 1,
        downloadableResources: 25,
        accessibility: 'Access on mobile and TV',
        certificate: true
      },
      sections: [
        {
          title: 'Section 1: Introduction',
          lectures: [
            { title: 'Welcome to the Course', duration: '10 mins' },
            { title: 'Getting Started with Angular', duration: '20 mins' }
          ],
          isContentOpen: false
        },
        {
          title: 'Section 2: Basics',
          lectures: [
            { title: 'Templates and Data Binding', duration: '15 mins' },
            { title: 'Components and Directives', duration: '25 mins' }
          ],
          isContentOpen: false
        },
        {
          title: 'Section 3: Services and Dependency Injection',
          lectures: [
            { title: 'Creating and Using Services', duration: '20 mins' },
            { title: 'Understanding Dependency Injection', duration: '30 mins' }
          ],
          isContentOpen: false
        },
        {
          title: 'Section 4: Routing and Navigation',
          lectures: [
            { title: 'Setting up Routing', duration: '15 mins' },
            { title: 'Implementing Navigation', duration: '25 mins' }
          ],
          isContentOpen: false
        },
        {
          title: 'Section 5: Forms and Validation',
          lectures: [
            { title: 'Template-driven Forms', duration: '20 mins' },
            { title: 'Reactive Forms', duration: '30 mins' }
          ],
          isContentOpen: false
        },
        {
          title: 'Section 6: HTTP Client and Observables',
          lectures: [
            { title: 'Making HTTP Requests', duration: '15 mins' },
            { title: 'Working with Observables', duration: '25 mins' }
          ],
          isContentOpen: false
        },
        {
          title: 'Section 7: Deployment and Optimization',
          lectures: [
            { title: 'Deploying Angular Apps', duration: '20 mins' },
            { title: 'Performance Optimization Tips', duration: '30 mins' }
          ],
          isContentOpen: false
        }
      ]
    },
    {
      id: 2,
      title: 'React Essentials',
      description: 'Master React and build powerful web applications.',
      price: '$59',
      image: '.../../assets/images/dashboardmain.jpg',
      videoId: 's2skans2dP4',
      rating: 4.8,
      numberOfRatings: 1500,
      createdBy: 'Jane Smith',
      lastUpdated: '2022-04-05',
      courseDetails: {
        hours: '8 hours on-demand video',
        codingExercises: 8,
        articles: 2,
        downloadableResources: 30,
        accessibility: 'Access on mobile, tablet, and TV',
        certificate: true
      },
      sections: [
        {
          title: 'Section 1: Introduction to React',
          lectures: [
            { title: 'Welcome to React Essentials', duration: '15 mins' },
            { title: 'Setting up React Environment', duration: '30 mins' }
          ],
          isContentOpen: false
        },
        // Add more sections as needed
      ]
    },
    {
      id: 3,
      title: 'Vue.js Crash Course',
      description: 'Get up to speed with Vue.js and start building interactive web apps.',
      price: '$39',
      image: '.../../assets/images/dashboardmain.jpg',
      videoId: 'Wy9q22isx3U',
      rating: 4.6,
      numberOfRatings: 1000,
      createdBy: 'Emily Johnson',
      lastUpdated: '2022-04-10',
      courseDetails: {
        hours: '6.5 hours on-demand video',
        codingExercises: 5,
        articles: 2,
        downloadableResources: 20,
        accessibility: 'Access on mobile and TV',
        certificate: true
      },
      sections: [
        {
          title: 'Section 1: Getting Started with Vue.js',
          lectures: [
            { title: 'Welcome to Vue.js Crash Course', duration: '20 mins' },
            { title: 'Setting up Vue.js Environment', duration: '25 mins' }
          ],
          isContentOpen: false
        },
        // Add more sections as needed
      ]
    },
    {
      id: 4,
      title: 'Node.js Masterclass',
      description: 'Become a Node.js expert and build scalable backend applications.',
      price: '$69',
      image: '.../../assets/images/dashboardmain.jpg',
      videoId: 'U8XF6AFGqlc',
      rating: 4.7,
      numberOfRatings: 1800,
      createdBy: 'Michael Brown',
      lastUpdated: '2022-04-15',
      courseDetails: {
        hours: '9 hours on-demand video',
        codingExercises: 10,
        articles: 3,
        downloadableResources: 35,
        accessibility: 'Access on mobile, tablet, and TV',
        certificate: true
      },
      sections: [
        {
          title: 'Section 1: Introduction to Node.js',
          lectures: [
            { title: 'Welcome to Node.js Masterclass', duration: '25 mins' },
            { title: 'Setting up Node.js Environment', duration: '30 mins' }
          ],
          isContentOpen: false
        },
        // Add more sections as needed
      ]
    },
    {
      id: 5,
      title: 'Python for Beginners',
      description: 'Learn Python programming from scratch and start your journey as a Python developer.',
      price: '$45',
      image:  '.../../assets/images/dashboardmain.jpg',
      videoId: 'rfscVS0vtbw',
      rating: 4.4,
      numberOfRatings: 900,
      createdBy: 'Jessica Davis',
      lastUpdated: '2022-04-20',
      courseDetails: {
        hours: '6 hours on-demand video',
        codingExercises: 7,
        articles: 2,
        downloadableResources: 25,
        accessibility: 'Access on mobile, tablet, and TV',
        certificate: true
      },
      sections: [
        {
          title: 'Section 1: Introduction to Python',
          lectures: [
            { title: 'Welcome to Python for Beginners', duration: '20 mins' },
            { title: 'Setting up Python Environment', duration: '25 mins' }
          ],
          isContentOpen: false
        },
        // Add more sections as needed
      ]
    },
    {
      id: 6,
      title: 'JavaScript Fundamentals',
      description: 'Master JavaScript basics and build interactive web applications.',
      price: '$55',
      image: '.../../assets/images/dashboardmain.jpg',
      videoId: 'hdI2bqOjy3c',
      rating: 4.6,
      numberOfRatings: 1500,
      createdBy: 'Mark Wilson',
      lastUpdated: '2022-04-25',
      courseDetails: {
        hours: '8.5 hours on-demand video',
        codingExercises: 8,
        articles: 2,
        downloadableResources: 30,
        accessibility: 'Access on mobile, tablet, and TV',
        certificate: true
      },
      sections: [
        {
          title: 'Section 1: Getting Started with JavaScript',
          lectures: [
            { title: 'Welcome to JavaScript Fundamentals', duration: '20 mins' },
            { title: 'JavaScript Syntax and Variables', duration: '30 mins' }
          ],
          isContentOpen: false
        },
        // Add more sections as needed
      ]
    },
    {
      id: 7,
      title: 'HTML5 and CSS3 Mastery',
      description: 'Become proficient in HTML5 and CSS3 and design stunning websites.',
      price: '$59',
      image: '.../../assets/images/dashboardmain.jpg',
      videoId: '4WJLlWpzpP0',
      rating: 4.7,
      numberOfRatings: 1300,
      createdBy: 'Sophia Martinez',
      lastUpdated: '2022-05-01',
      courseDetails: {
        hours: '7 hours on-demand video',
        codingExercises: 7,
        articles: 2,
        downloadableResources: 25,
        accessibility: 'Access on mobile, tablet, and TV',
        certificate: true
      },
      sections: [
        {
          title: 'Section 1: Introduction to HTML5 and CSS3',
          lectures: [
            { title: 'Welcome to HTML5 and CSS3 Mastery', duration: '25 mins' },
            { title: 'HTML5 Tags and Attributes', duration: '30 mins' }
          ],
          isContentOpen: false
        }
      ]
    }
  ];

  constructor(private sanitizer: DomSanitizer, private cartService: CartService, private toastr: ToastrService) {}

  getSafeImageUrl(imageUrl: string): any {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  getSafeVideoUrl(videoId: string): any {
    // Attempt to sanitize the videoId
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }
  
  toggleSectionContent(section: any): void {
    section.isContentOpen = !section.isContentOpen;
  }

  addToCart(course: any) {
    const existingCoursesStr = localStorage.getItem('courses');
    if (existingCoursesStr) {
      const existingCourses: any[] = JSON.parse(existingCoursesStr);
      const courseExists = existingCourses.some(existingCourse => existingCourse.id === course.id);
      if (courseExists) {
        this.toastr.success('You are already enrolled in this course.');
        return; // Exit the function
      }
    }
    if (this.cartService.isCourseInCart(course)) {
      this.toastr.success('This course is already in your cart!');
    } else {
      this.cartService.addToCart(course);
      this.toastr.success('Course added to cart!');
    }

    if (this.closeButton) {
      this.closeButton.nativeElement.click();
    }
  }
}
