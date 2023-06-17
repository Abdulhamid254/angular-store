import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import {NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';


interface carouselImage{
   url: string;
   title:string;
}

@Component({
  selector: 'app-banner',
  templateUrl: `./banner.component.html`,
 
})
export class BannerComponent implements OnInit {
	@Input() images:carouselImage[] = [];

	paused = false;
	unpauseOnArrow = false;
	pauseOnIndicator = false;
	pauseOnHover = true;
	pauseOnFocus = true;

	 @ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

  constructor() { }

  ngOnInit(): void {
  }
  
  togglePaused() {
		if (this.paused) {
			this.carousel.cycle();
		} else {
			this.carousel.pause();
		}
		this.paused = !this.paused;
	}

	// onSlide(slideEvent: NgbSlideEvent) {
	// 	if (
	// 		this.unpauseOnArrow &&
	// 		slideEvent.paused &&
	// 		(slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
	// 	) {
	// 		this.togglePaused();
	// 	}
	// 	if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
	// 		this.togglePaused();
	// 	}
	// }
  ngAfterViewInit() {
    // The carousel reference is now available
    console.log(this.carousel);
  }
}


