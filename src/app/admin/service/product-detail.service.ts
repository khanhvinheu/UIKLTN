import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ThongbaoService } from './thongbao.service';
import { BehaviorSubject, Observable } from 'rxjs';

import { LoginService } from './login.service';
import { map } from 'rxjs/operators';
import { LoadingService } from './loading.service';
import { Sanpham } from 'src/app/models/sanpham';
import { DanhMucHinh } from 'src/app/models/danhmuchinh';
import { Rating } from 'src/app/models/rating';
import { environment } from 'src/app/environments/environment.prod';
import { DanhGia } from 'src/app/models/danhgia';

@Injectable({
    providedIn: 'root'
})
export class ProductDetailService {
    constructor(
        public http: HttpClient,
        public thongbaoService: ThongbaoService,
        public loadingService: LoadingService
    ) {
        this.ProductDetailSub = new BehaviorSubject<Sanpham>(this.product);
        this.ProductDetailObs = this.ProductDetailSub.asObservable();
        this.ImageDetailSub = new BehaviorSubject<DanhMucHinh[]>(this.images);
        this.ImageDetailObs = this.ImageDetailSub.asObservable();
        this.RatingDetailSub = new BehaviorSubject<Rating[]>(this.ratings);
        this.RatingDetailObs = this.RatingDetailSub.asObservable();
        this.CanRateDetailSub = new BehaviorSubject<boolean>(false);
        this.CanRateDetailObs = this.CanRateDetailSub.asObservable();
    }
    private API: string = environment.api_url + '/api/admin/';
    private product: Sanpham;
    private images: DanhMucHinh[] = [];
    private ratings: Rating[] = [];
    public ProductDetailSub: BehaviorSubject<Sanpham>;
    public ProductDetailObs: Observable<Sanpham>;
    public ImageDetailSub: BehaviorSubject<DanhMucHinh[]>;
    public ImageDetailObs: Observable<DanhMucHinh[]>;
    public RatingDetailSub: BehaviorSubject<Rating[]>;
    public RatingDetailObs: Observable<Rating[]>;
    public CanRateDetailSub: BehaviorSubject<boolean>;
    public CanRateDetailObs: Observable<boolean>;
    FetchProduct(sanpham_id) {
        this.loadingService.LoadingSub.next(true);
        this.http.get<any>(this.API + 'product-detail/' + sanpham_id).subscribe(
            res => {
                this.ProductDetailSub.next(res['product'][0]);
                this.ImageDetailSub.next(res['images']);
                this.RatingDetailSub.next(res['ratings']);
            },
            err => {},
            () => this.loadingService.LoadingSub.next(false)
        );
    }
    checkBill(user_id, sanpham_id) {
        const formData = new FormData();
        formData.append('idUser', user_id);
        formData.append('idSanPham', sanpham_id);
        this.http
            .post<boolean>(this.API + 'check-bill', formData)
            .subscribe(res => {
                if (res) {
                    this.CanRateDetailSub.next(res);
                }
            });
    }
    createRating(danhgia) {
        this.http
            .post<any>(this.API + 'create-rating', danhgia)
            .subscribe(res => {
                if (res['status'] === 'OK') {
                    this.RatingDetailSub.value.push(res['data']);
                    this.RatingDetailSub.next(this.RatingDetailSub.value);
                    this.CanRateDetailSub.next(false);
                }
            });
    }
    deleteRating(danhgia: DanhGia) {
        const url = `${this.API + 'danhgia'}/${danhgia.id}`;
        return this.http.delete(url).subscribe(res => {
            if (res) {
                this.RatingDetailSub.value.map((e, index) => {
                    if (e.id === danhgia.id) {
                        this.RatingDetailSub.value.splice(index, 1);
                        this.RatingDetailSub.next(this.RatingDetailSub.value);
                        this.CanRateDetailSub.next(true);
                    }
                    return e;
                });
            }
        });
    }
}
