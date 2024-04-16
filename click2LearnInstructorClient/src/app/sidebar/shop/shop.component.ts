import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  expandedIndex: number = -1;
  courses: any = [];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const purchasedCoursesStr = localStorage.getItem('courses');
    if (purchasedCoursesStr) {
      // Parse the JSON string to retrieve the purchased courses
      this.courses = JSON.parse(purchasedCoursesStr);
    }
  }

  getSafeImageUrl(imageUrl: string): any {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  getSafeVideoUrl(videoId: string): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }

  toggleSectionContent(section: any): void {
    section.isContentOpen = !section.isContentOpen;
  }

}
