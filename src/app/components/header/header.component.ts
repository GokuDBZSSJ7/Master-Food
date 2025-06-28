import { Component } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private scroller: ViewportScroller) { }

  scrollTo(sectionId: string) {
    this.scroller.scrollToAnchor(sectionId);
  }
}
