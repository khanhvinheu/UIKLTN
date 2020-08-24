import { Component, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { environment } from 'src/app/environments/environment.prod';
import { DanhMuc } from 'src/app/models/danhmuc';
import { Subscription } from 'rxjs';
import { Nhacungcap } from 'src/app/models/nhacungcap';
import { DataService } from 'src/app/admin/service/data.service';
import { HomePageService } from 'src/app/admin/service/home-page.service';
import { NhacungcapService } from 'src/app/admin/service/nhacungcap.service';
import { CartService } from 'src/app/admin/service/cart.service';
import { Cart } from 'src/app/models/cart';

@Component({
  selector: 'app-slidenhacungcap',
  templateUrl: './slidenhacungcap.component.html',
  styleUrls: ['./slidenhacungcap.component.sass']
})
export class SlidenhacungcapComponent implements OnInit {

  @ViewChild('slickModal', { static: false }) myslick: SlickCarouselComponent;    
    is_loading = true;
    api_url = environment.api_img;    
    mysubdanhmuc: number[] = [];
    danhmucs: DanhMuc[] = [];
    nhacungcap: Nhacungcap[];   
    slideConfig = {
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2000,
      slidesToShow: 4,
      slidesToScroll: 1,
      centerPadding: ' 0px',
      centerMode: true,
      responsive: [
          {
              breakpoint: 768,
              settings: {
                  centerMode: true,
                  slidesToShow: 3,
                  centerPadding: ' 10px'
              }
          },
          {
              breakpoint: 480,
              settings: {
                  slidesToShow: 1,
                  centerPadding: ' 10px'
              }
          }
      ]
   };
  
    subscriptions: Subscription[] = [];
    isloaded = false;
    constructor(       
        private dataService: DataService,
        private homepageService: HomePageService,
        private nhacungcapService: NhacungcapService,
        private cartService: CartService,
    ) {}
    ngOnInit() {
        
        //this.homepageService.FetchProduct();
        this.is_loading = true;
        this.loadData();  
    }    
    loadData() {
        this.subscriptions.push(  
            //this.nhacungcapService.getAll(),         
            this.dataService.currentIsLoaded.subscribe(data => {
                this.isloaded = data;
            }),  
            this.nhacungcapService.itemsObs.subscribe(data=>{
              //this.nhacungcap=data;
            //   if (data && data.length > 0) {
            //     this.is_loading = false;
            //     this.nhacungcap = data.slice();                
            //     }
                this.nhacungcap = data.filter(e => {                    
                    return e.idQuyen == 2 && Number.parseInt(e.trangThai + '') == 1
                })
            })  
            
           
        );       
    }
    onAddCart(sp) {
        this.cartService.addCart(new Cart(sp.id, 1));
    }

}
