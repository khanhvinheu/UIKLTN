import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { ShareModule } from 'src/app/share/share.module';
import { PageRoutingModule } from '../page-routing.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SlideComponent } from './slide/slide.component';
import { SanphammoiComponent } from './sanphammoi/sanphammoi.component';
import { LoadingModule } from '../loading/loading.module';
import { SlidenhacungcapComponent } from './slidenhacungcap/slidenhacungcap.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BlockDanhMucComponent } from './block-danh-muc/block-danh-muc.component';
import { BlogNsxComponent } from './blog-nsx/blog-nsx.component';

@NgModule({
  declarations: [
    HomepageComponent,
    SlideComponent,
    SanphammoiComponent,
    SlidenhacungcapComponent,
    BlockDanhMucComponent,
    BlogNsxComponent,
  ],
  imports: [
    CommonModule,
    ShareModule,
    PageRoutingModule,
    SlickCarouselModule,
    LoadingModule,
    MDBBootstrapModule.forRoot()
  ],
  exports:[
    HomepageComponent,
    SlideComponent,
    SanphammoiComponent,
    BlockDanhMucComponent,
    BlogNsxComponent,
  ]
})
export class HomepageModule { }
