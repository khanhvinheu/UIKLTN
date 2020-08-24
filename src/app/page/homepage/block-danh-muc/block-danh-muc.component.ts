import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/app/environments/environment.prod';
import { DanhMuc } from 'src/app/models/danhmuc';
import { Sanpham } from 'src/app/models/sanpham';
import { Subscription } from 'rxjs';
import { DanhmucService } from 'src/app/admin/service/danhmuc.service';
import { CartService } from 'src/app/admin/service/cart.service';
import { DataService } from 'src/app/admin/service/data.service';
import { Router } from '@angular/router';
import { MobileService } from 'src/app/admin/service/mobile.service';
import { HomePageService } from 'src/app/admin/service/home-page.service';
import { LoadingService } from 'src/app/admin/service/loading.service';
import { Cart } from 'src/app/models/cart';
import { ThongbaoService } from 'src/app/admin/service/thongbao.service';

@Component({
  selector: 'app-block-danh-muc',
  templateUrl: './block-danh-muc.component.html',
  styleUrls: ['./block-danh-muc.component.sass']
})
export class BlockDanhMucComponent implements OnInit {

  matches = true;
    api_url = environment.api_img;
    @Input() idblock: any;
    @Input() idbaner: number;
    mysubdanhmuc: number[] = [];
    danhmucs: DanhMuc[] = [];
    sanphams: Sanpham[] = [];
    products: Sanpham[] = [];
    subscriptions: Subscription[] = [];
    isloaded = false;
    is_loading = true;
    loading = false;
    constructor(
        private danhmucService: DanhmucService,
        private cartService: CartService,
        private dataService: DataService,
        private router: Router,
        private mobileService: MobileService,
        private homepageService: HomePageService,
        private loadingService: LoadingService,
        private thongbaoService: ThongbaoService
    ) {}
    ngOnInit() {
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
    onClickDanhMuc(e) {
        this.router.navigate(['/search'], { queryParams: { cat: e.id } });
    }
    loadData() {
        this.subscriptions.push(
            this.loadingService.LoadingObs.subscribe(
                data => (this.loading = data)
            ),
            this.danhmucService.itemsObs.subscribe(
                data => {
                    this.danhmucs = data;
                    this.getallsub_danhmuc(this.idblock.id);
                },
                err => {}
            ),
            this.dataService.currentIsLoaded.subscribe(data => {
                this.isloaded = data;
            }),
            this.mobileService.mobileObs.subscribe(data => {
                this.matches = data;
            }),
            this.homepageService.ProductObs.subscribe(data => {
                if (data.length > 0) {
                    this.products = data
                        .filter(e => {
                            return this.mysubdanhmuc.includes(e.idDanhMuc);
                        })
                        .slice(0, 8);
                    this.is_loading = false;
                }
            })
        );
    }
    getsub_danhmuc(iddanhmuc: number) {
        return this.danhmucs.filter(e => {
            return e.danhMuccha === iddanhmuc;
        });
    }
    dequy(danhMuccha: number) {
        if (this.getsub_danhmuc(danhMuccha).length > 0) {
            this.getsub_danhmuc(danhMuccha).forEach(e => {
                this.dequy(e.id);
            });
        } else {
            this.mysubdanhmuc.push(danhMuccha);
        }
    }
    getallsub_danhmuc(iddanhmuc: number) {
        this.dequy(iddanhmuc);
    }
    onAddCart(sp) {
        if(sp.soLuong>0){
            this.cartService.addCart(new Cart(sp.id, 1));
            this.thongbaoService.open(
              'Đã thêm sản phẩm vào giỏ hàng thành công',
              'bg-success'
          )
        }
        else{
          this.thongbaoService.open(
              'Sản phẩm đã hết! Vui lòng chọn sản phẩm khác',
              'bg-danger'
          )
        }
    }

}
