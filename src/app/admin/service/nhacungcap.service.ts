import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ThongbaoService } from './thongbao.service';
import { Nhacungcap } from 'src/app/models/nhacungcap';

@Injectable({
    providedIn: 'root'
})
export class NhacungcapService {
    public itemsSub: BehaviorSubject<Nhacungcap[]>;
    public itemsObs: Observable<Nhacungcap[]>;
    public isLoadingSub: BehaviorSubject<boolean>;
    public isLoadingObs: Observable<boolean>;
    public itemSub: BehaviorSubject<Nhacungcap>;
    public itemObs: Observable<Nhacungcap>;
    private API: string = environment.api_url + '/admin/nhacungcap';
    private API2: string = environment.api_url + '/admin/duyetnhacungcap';
    constructor(
        public http: HttpClient,
        private thongbaoService: ThongbaoService
    ) {
        this.itemsSub = new BehaviorSubject<Nhacungcap[]>([]);
        this.itemsObs = this.itemsSub.asObservable();
        this.itemSub = new BehaviorSubject<Nhacungcap>(null);
        this.itemObs = this.itemSub.asObservable();
        this.isLoadingSub = new BehaviorSubject<boolean>(false);
        this.isLoadingObs = this.isLoadingSub.asObservable();
    }
    findIndex(array, id: number) {
        return array.findIndex(e => e.id === id);
    }
    referById(id: number) {
        const url = `${this.API}/${id}`;
        this.http.get<any>(url);
    }
    getAll() {
        this.isLoadingSub.next(true);
        return this.http.get<any[]>(this.API).subscribe(
            res => {
                if (res['status'] === 'OK') {
                    this.itemsSub.next(res['data']); 
                }
            },
            () => {},
            () => this.isLoadingSub.next(false)
        );
    }   
    createNew(values: any) {
        this.isLoadingSub.next(true);       
        this.http.post<Nhacungcap>(this.API, values).subscribe(
            res => {
                if (res['status'] === 'OK') {
                    this.itemsSub.value.push(res['data']);
                    this.itemsSub.next(this.itemsSub.value);
                    this.thongbaoService.open('Đăng ký thành công, Vui lòng chờ kết quả', 'bg-success');
                    this.getAll();
                }
                else{
                    this.thongbaoService.open('Bạn đã hoàn tất đăng ký, Vui lòng chờ xét duyệt! Chi tiết liên hệ Hotline để được hỗ trợ', 'bg-success');
                    this.getAll();
                }
            },
            () => {},
            () => this.isLoadingSub.next(false),            
        );        
    }
    delete(value) {
        const url = `${this.API}/${value.id}`;
        this.isLoadingSub.next(true);
        this.http.delete(url).subscribe(
            data => {
                if (data['status'] === 'OK') {
                    const index = this.findIndex(this.itemsSub.value, value.id);
                    if (index !== -1) {
                        this.itemsSub.value.splice(index, 1);
                        this.itemsSub.next(this.itemsSub.value);
                        this.thongbaoService.open(
                            'Xóa thành công: ' + value.tenNhacungcap + ' !',
                            'bg-success'
                        );
                    }
                }
            },
            () => {},
            () => this.isLoadingSub.next(false)
        );
    }
    update(value){
        value.append('_method', 'put');
        const url = `${this.API}/${value.get('id')}`;
        this.isLoadingSub.next(true);
        this.http.post<any>(url, value).subscribe(
            res => {
                if (res['status'] === 'OK') {
                    const index = this.findIndex(
                        this.itemsSub.value,
                        Number.parseInt(value.get('id') + '')
                    );
                    if (index !== -1) {
                        this.itemsSub.value[index] = res['data'];
                        this.itemsSub.next(this.itemsSub.value);                         
                        this.getAll();
                            
                    }
                    //localStorage.removeItem('nhacungcap');
                    
                    localStorage.setItem('nhacungcap',JSON.stringify(this.itemsSub.value))
                    this.thongbaoService.open(
                        'Cập nhật thành công!',
                        'bg-success'
                    );
                }
            },
            
            () => {},
            () => this.isLoadingSub.next(false)
        );
    }
    updateQuyen(value){
       
        value.append('_method', 'put');
        const url = `${this.API2}/${value.get('id')}`;
        this.isLoadingSub.next(true);
        this.http.post<any>(url, value).subscribe(
            res => {
                if (res['status'] === 'OK') {
                    const index = this.findIndex(
                        this.itemsSub.value,
                        Number.parseInt(value.get('id') + '')
                    );
                    if (index !== -1) {
                        this.itemsSub.value[index] = res['data'];
                        this.itemsSub.next(this.itemsSub.value);
                        this.thongbaoService.open(
                            'Cập nhật quyền thành công!',
                            'bg-success'
                        );
                        this.getAll();
                    }
                }
            },
            () => {},
            () => this.isLoadingSub.next(false)
        ); 
    }
    // update_hinh(value) {
    //     value.append('_method', 'put');
    //     const url = `${this.API}/${value.get('id')}/changehinh`;
    //     this.isLoadingSub.next(true);
    //     this.http.post<any>(url, value).subscribe(
    //         res => {
    //             if (res['status'] === 'OK') {
    //                 const index = this.findIndex(
    //                     this.itemsSub.value,
    //                     Number.parseInt(value.get('id') + '')
    //                 );
    //                 if (index !== -1) {
    //                     this.itemsSub.value[index] = res['data'];
    //                     this.itemsSub.next(this.itemsSub.value);
    //                     this.thongbaoService.open(
    //                         'Cập nhật quyền thành công!',
    //                         'bg-success'
    //                     );                       
    //                 }
    //             }
    //         },
    //         () => {},
    //         () => this.isLoadingSub.next(false)
    //     ); 
    // }
    
}
