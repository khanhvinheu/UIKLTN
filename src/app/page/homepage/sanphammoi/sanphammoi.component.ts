import { Component, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { environment } from 'src/app/environments/environment.prod';
import { DanhMuc } from 'src/app/models/danhmuc';
import { Sanpham } from 'src/app/models/sanpham';
import { Subscription } from 'rxjs';
import { DanhmucService } from 'src/app/admin/service/danhmuc.service';
import { CartService } from 'src/app/admin/service/cart.service';
import { DataService } from 'src/app/admin/service/data.service';
import { HomePageService } from 'src/app/admin/service/home-page.service';
import { Cart } from 'src/app/models/cart';

@Component({
  selector: 'app-sanphammoi',
  templateUrl: './sanphammoi.component.html',
  styleUrls: ['./sanphammoi.component.sass']
})
export class SanphammoiComponent implements OnInit {

  @ViewChild('slickModal', { static: false }) myslick: SlickCarouselComponent;
    is_loading = true;
    api_url = environment.api_img;
    idtab: number;
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
    mysubdanhmuc: number[] = [];
    danhmucs: DanhMuc[] = [];
    propducts: Sanpham[] = [];
    topSellProduct: Sanpham[] = [];
    sanphamtab: Sanpham[] = [];
    subscriptions: Subscription[] = [];
    isloaded = false;
    constructor(
        private danhmucService: DanhmucService,
        private cartService: CartService,
        private dataService: DataService,
        private homepageService: HomePageService
    ) {}
    ngOnInit() {
        this.homepageService.FetchProduct();
        this.is_loading = true;
        this.loadData();          
        
    }
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => {
                e.unsubscribe();
            });
        }
    }
    loadData() {
        this.subscriptions.push(
            // this.danhmucService.itemsObs.subscribe(
            //     data => {
            //         this.danhmucs = data;
            //     },
            //     err => {}
            // ),
            this.dataService.currentIsLoaded.subscribe(data => {
                this.isloaded = data;
            }),
            this.dataService.getIdTab().subscribe(data => {
                this.idtab = data;
                this.loadTab();
            }),
            this.homepageService.ProductObs.subscribe(data => {
                if (data && data.length > 0) {
                    this.is_loading = false;
                    this.propducts = data.slice();
                    this.loadTab();                   
                }
            }),
            this.homepageService.TopSellProductObs.subscribe(data => {
                if (data && data.length > 0) {
                    this.is_loading = false;
                    this.topSellProduct = data.slice();
                    this.loadTab();
                }
            })
        );
    }
    loadTab() {
        if (this.idtab === 2) {
            this.sanphamtab = this.propducts
                .sort((a, b) => {
                    return b.gia > a.gia ? 1 : -1;
                })

                .slice(0, 8);
        }
        if (this.idtab === 1) {
            this.sanphamtab = this.propducts
                .slice()
                .sort((a, b) => {
                    return b.id - a.id;
                })
                .slice(0, 10);
        }
        if (this.idtab === 3) {
            this.sanphamtab = this.topSellProduct;
        }
    }
    onAddCart(sp) {
        this.cartService.addCart(new Cart(sp.id, 1));
    }
    trackByFn(index, item) {
        return index;
    }

}
