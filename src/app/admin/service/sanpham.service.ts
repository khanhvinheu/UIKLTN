import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { ThongbaoService } from './thongbao.service';
import { Sanpham } from 'src/app/models/sanpham';

@Injectable({
    providedIn: 'root'
})
export class SanphamService {
    public itemsSub: BehaviorSubject<Sanpham[]>;
    public itemsObs: Observable<Sanpham[]>;
    public isLoadingSub: BehaviorSubject<boolean>;
    public isLoadingObs: Observable<boolean>;
    public itemSub: BehaviorSubject<Sanpham>;
    public itemObs: Observable<Sanpham>;
    private API: string = environment.api_url + '/admin/sanpham';
    constructor(
        public http: HttpClient,
        private thongbaoService: ThongbaoService
    ) {
        this.itemsSub = new BehaviorSubject<Sanpham[]>([]);
        this.itemsObs = this.itemsSub.asObservable();
        this.itemSub = new BehaviorSubject<Sanpham>(null);
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
        this.http.post<Sanpham>(this.API, values).subscribe(
            res => {
                if (res['status'] === 'OK') {
                    this.itemsSub.value.push(res['data']);
                    this.itemsSub.next(this.itemsSub.value);
                    this.thongbaoService.open('Thêm thành công!', 'bg-success');
                    this.getAll();
                }
            },
            () => {},
            () => this.isLoadingSub.next(false)
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
                            'Xóa thành công: ' + value.Ten + ' !',
                            'bg-success'
                        );
                    }
                }
            },
            () => {},
            () => this.isLoadingSub.next(false)
        );
    }
    update(value) {
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
                        this.thongbaoService.open(
                            'Cập nhật thành công!',
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
}
