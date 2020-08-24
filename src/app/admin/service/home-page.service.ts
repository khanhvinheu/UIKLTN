import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ThongbaoService } from './thongbao.service';
import { LoadingService } from './loading.service';
import { environment } from 'src/app/environments/environment.prod';
import { Sanpham } from 'src/app/models/sanpham';

@Injectable({
    providedIn: 'root'
})
export class HomePageService {
    private API: string = environment.api_url + '/api/admin/home';
    private products: Sanpham[] = [];
    public ProductSub: BehaviorSubject<Sanpham[]>;
    public ProductObs: Observable<Sanpham[]>;
    public TopSellProductSub: BehaviorSubject<Sanpham[]>;
    public TopSellProductObs: Observable<Sanpham[]>;

    constructor(
        public http: HttpClient,
        public thongbaoService: ThongbaoService,
        private loadingService: LoadingService
    ) {
        this.ProductSub = new BehaviorSubject<Sanpham[]>(this.products);
        this.ProductObs = this.ProductSub.asObservable();
        this.TopSellProductSub = new BehaviorSubject<Sanpham[]>([]);
        this.TopSellProductObs = this.TopSellProductSub.asObservable();
    }
    FetchProduct() {
        if (this.ProductSub.value.length === 0) {
            this.loadingService.LoadingSub.next(true);
        }
        this.http.get<Sanpham[]>(this.API).subscribe(
            res => {
                this.ProductSub.next(res.slice());
            },
            err => {},
            () => this.loadingService.LoadingSub.next(false)
        );
    }
    GetTopSell() {
        // if (this.ProductSub.value.length === 0) {
        //     this.loadingService.LoadingSub.next(true);
        // }
        // this.http
        //     .get<Sanpham[]>(environment.api_url + '/api/admin/get-hot-sell')
        //     .subscribe(
        //         res => {
        //             this.TopSellProductSub.next(res);
        //         },
        //         err => {},
        //         () => this.loadingService.LoadingSub.next(false)
        //     );
    }
    ReferProduct(idSanPham) {
        if (this.ProductSub.value) {
            return this.ProductSub.value.filter(e => {
                return e.id === idSanPham;
            })[0];
        } else {
            return null;
        }
    }
}
