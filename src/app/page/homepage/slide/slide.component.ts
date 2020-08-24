import { Component, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { environment } from 'src/app/environments/environment.prod';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.sass']
})
export class SlideComponent implements OnInit {

  @ViewChild('slickModal', { static: true })
  slickModal: SlickCarouselComponent;
  api_url = environment.api_img;
  slideConfig = {
      infinite: true,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: true,
      touchMove: true,
      dot: false,
      arrows: false
  };
  constructor() {}

  ngOnInit() {
      // tslint:disable-next-line:no-unused-expression
      this.slickModal.slides;
  }

}
