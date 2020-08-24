import { Component, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { environment } from 'src/app/environments/environment.prod';
import { Sanpham } from 'src/app/models/sanpham';
import { ChiTietDonHang } from 'src/app/models/chitietdonhang';
import { Khuyenmai } from 'src/app/models/khuyenmai';
import { Chitietkhuyenmai } from 'src/app/models/chitietkhuyenmai';
import { Subscription } from 'rxjs';
import { DanhmucService } from 'src/app/admin/service/danhmuc.service';
import { CartService } from 'src/app/admin/service/cart.service';
import { ActivatedRoute } from '@angular/router';
import { HomePageService } from 'src/app/admin/service/home-page.service';
import { Cart } from 'src/app/models/cart';

@Component({
  selector: 'app-sanphamlienquan',
  templateUrl: './sanphamlienquan.component.html',
  styleUrls: ['./sanphamlienquan.component.sass']
})
export class SanphamlienquanComponent implements OnInit {

  @ViewChild('slickModal', { static: false }) myslick: SlickCarouselComponent;
    api_url = environment.api_img;
    sanpham: Sanpham;
    products: Sanpham[];
    product: Sanpham;
    idtab: number;
    slideConfig = {
        infinite: true,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplaySpeed: 3000,
        pauseOnFocus: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    centerMode: true,
                    centerPadding: '0px'
                }
            },
            {
                breakpoint: 600,
                settings: {
                    centerMode: true,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerPadding: '40px'
                }
            },
            {
                breakpoint: 480,
                settings: {
                    centerMode: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '60px'
                }
            }
        ]
    };
    sanphamall: Sanpham[] = [];
    idSanPham: number;
    mysubdanhmuc: number[] = [];
    sanphams: Sanpham[] = [];
    chitietHDNs: ChiTietDonHang[] = [];
    chitietHDXs: ChiTietDonHang[] = [];
    khuyenmais: Khuyenmai[] = [];
    chitietkhuyenmais: Chitietkhuyenmai[] = [];
    subscriptions: Subscription[] = [];
    isloaded = false;
    array_top: number[] = [];
    constructor(
        private danhmucService: DanhmucService,
        private cartService: CartService,
        private activatedRoute: ActivatedRoute,
        private homepageService: HomePageService
    ) {}

    ngOnInit() {
        this.homepageService.FetchProduct();
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
            this.homepageService.ProductObs.subscribe(data => {
                data = data.slice();
                if (data) {
                    this.product = data.filter(e => {
                        return (
                            e.id ===
                            Number.parseInt(
                                this.activatedRoute.params['value'].id
                            )
                        );
                    })[0];
                    if (this.product) {
                        this.products = data.splice(0, 8);
                    }
                    if (this.products && this.products.length < 4) {
                        this.myslick.unslick();
                    }
                }
            }),
            this.activatedRoute.params.subscribe(data => {
                this.idSanPham = data['id'];
            })
        );
    }
    onAddCart(sp) {
        this.cartService.addCart(new Cart(sp.id, 1));
    }
    trackByFn(index, item) {
        return index;
    }

}
