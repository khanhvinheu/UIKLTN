import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DanhMuc } from 'src/app/models/danhmuc';
import { ThongbaoService } from './thongbao.service';
import { environment } from 'src/app/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class DanhmucService {
    public itemsSub: BehaviorSubject<DanhMuc[]>;
    public itemsObs: Observable<DanhMuc[]>;
    public isLoadingSub: BehaviorSubject<boolean>;
    public isLoadingObs: Observable<boolean>;
    public itemSub: BehaviorSubject<DanhMuc>;
    public itemObs: Observable<DanhMuc>;
    public catalogParent:BehaviorSubject<DanhMuc[]>;
    private API: string = environment.api_url + '/admin/danhmuc';
    constructor(
        public http: HttpClient,
        private thongbaoService: ThongbaoService
    ) {
        this.itemsSub = new BehaviorSubject<DanhMuc[]>([]);
        this.itemsObs = this.itemsSub.asObservable();
        this.itemSub = new BehaviorSubject<DanhMuc>(null);
        this.itemObs = this.itemSub.asObservable();
        this.isLoadingSub = new BehaviorSubject<boolean>(false);
        this.isLoadingObs = this.isLoadingSub.asObservable();
    }
    findIndex(array, id: number) {
        return array.findIndex(e => e.id === id);
    }
    referById(id: number) {
        const url = `${this.API}/${id}`;
        this.http.get<DanhMuc>(url);
    }
    getAll() {
        this.isLoadingSub.next(true);
        return this.http.get<DanhMuc[]>(this.API).subscribe(
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
        this.http.post<DanhMuc>(this.API, values).subscribe(
            res => {
                if (res['status'] === 'OK') {
                    this.itemsSub.value.push(res['data']);
                    this.itemsSub.next(this.itemsSub.value);
                    this.thongbaoService.open('Thêm thành công!', 'bg-success');
                }
                else{
                    this.thongbaoService.open('Thêm thất bại! Tên danh mục bị trùng', 'bg-danger');
                }
            },
            () => {},
            () => this.isLoadingSub.next(false)
        );
    }
    reloadData(){
        window.location.reload();
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
                            'Xóa thành công: ' + value.tenDanhmuc + '',
                            'bg-success'
                        );
                        this.getAll();
                    }
                }              
                else{
                    const index = this.findIndex(this.itemsSub.value, value.id);
                    if (index !== -1) {
                        // this.itemsSub.value.splice(index, 1);
                        // this.itemsSub.next(this.itemsSub.value);
                        this.thongbaoService.open(
                            'Xóa ' + value.tenDanhmuc + ' thất bại! Vui lòng kiểm tra lại',
                            'bg-danger'
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
        this.http.post<DanhMuc>(url, value).subscribe(
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
                    }
                }
            },
            () => {},
            () => this.isLoadingSub.next(false)
        );
    }
}
