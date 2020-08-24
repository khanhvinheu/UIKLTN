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
import { Nhacungcap } from 'src/app/models/nhacungcap';

@Injectable({
    providedIn: 'root'
})
export class NccDetailService {
    constructor(
        public http: HttpClient,
        public thongbaoService: ThongbaoService,
        public loadingService: LoadingService
    ) {
        this.ProductDetailSub = new BehaviorSubject<Nhacungcap>(this.product);
        this.ProductDetailObs = this.ProductDetailSub.asObservable();   
    }
    private API: string = environment.api_url + '/api/admin/';
    private product: Nhacungcap;
    public ProductDetailSub: BehaviorSubject<Nhacungcap>;
    public ProductDetailObs: Observable<Nhacungcap>;
    
    FetchProduct(sanpham_id) {
        this.loadingService.LoadingSub.next(true);
        this.http.get<any>(this.API + 'nhacungcap/' + sanpham_id).subscribe(
            res => {
                this.ProductDetailSub.next(res['data']);          
            },
            err => {},
            () => this.loadingService.LoadingSub.next(false),
            );            
    } 
    findIndex(array, id: number) {
        return array.findIndex(e => e.id === id);
    }   
    update_hinh(value) {
        value.append('_method', 'put');
        const url = `${this.API}nhacungcap/${value.get('id')}/changehinh`;
        this.loadingService.LoadingSub.next(true);
        this.http.post<any>(url, value).subscribe(
            res => {
                if (res['status'] === 'OK') {
                    const index = this.findIndex(
                        this.ProductDetailSub.value,
                        Number.parseInt(value.get('id') + '')
                    );
                    if (index !== -1) {
                        this.ProductDetailSub.value[index] = res['data'];
                        this.ProductDetailSub.next(this.ProductDetailSub.value);                                           
                    }
                }               
                this.thongbaoService.open(
                    'Cập nhật thành công ảnh đại diện!',
                    'bg-success'
                );
                this.FetchProduct( Number.parseInt(value.get('id') + ''));
            },
            () => {},
            () => this.loadingService.LoadingSub.next(false)
        ); 
    }

}
