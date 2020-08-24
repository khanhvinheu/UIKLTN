import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { ThongbaoService } from './thongbao.service';
import { TrangThai } from 'src/app/models/trangthai';
import { environment } from 'src/app/environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class TrangthaiService {
    title = 'TrangThai';
    TrangThais: TrangThai[] = [];
    public TrangThaiSubject: BehaviorSubject<TrangThai[]>;
    public currentTrangThai: Observable<TrangThai[]>;
    public API: string = environment.api_url + '/api/admin/trangthai';
    constructor(
        public http: HttpClient,
        private thongbaoService: ThongbaoService
    ) {
        this.TrangThaiSubject = new BehaviorSubject<TrangThai[]>(
            this.TrangThais
        );
        this.currentTrangThai = this.TrangThaiSubject.asObservable();
        this.getAll();
    }

    getOne(id: number): Observable<TrangThai> {
        const url = `${this.API}/${id}`;
        return this.http.get<TrangThai>(url);
    }
    getAll() {
        return this.http.get<TrangThai[]>(this.API).subscribe(res => {
            this.TrangThaiSubject.next(res);
        });
    }
    createNew(trangthai: any): Observable<TrangThai> {
        return this.http.post<TrangThai>(this.API, trangthai).pipe(
            map(data => {
                this.TrangThaiSubject.value.push(data);
                this.TrangThaiSubject.next(this.TrangThaiSubject.value);
                this.thongbaoService.open('Thêm thành công!', 'bg-success');
                return data;
            })
        );
    }
    delete(trangthai: TrangThai): Observable<any> {
        const url = `${this.API}/${trangthai.id}`;
        return this.http.delete(url).pipe(
            map(data => {
                this.TrangThaiSubject.value.forEach((e, index) => {
                    if (e.id === trangthai.id) {
                        this.TrangThaiSubject.value.splice(index, 1);
                        this.TrangThaiSubject.next(this.TrangThaiSubject.value);
                        return false;
                    }
                });
                this.thongbaoService.open(
                    'Xóa thành công: ' + trangthai.id + ' !',
                    'bg-success'
                );
                return data;
            })
        );
    }
    update(formdata: FormData): Observable<TrangThai> {
        const url = `${this.API}/${formdata.get('id')}`;
        return this.http.post<TrangThai>(url, formdata).pipe(
            map(data => {
                this.TrangThaiSubject.value.map(e => {
                    if (e.id === data.id) {
                        e.updated_at = data.updated_at;
                    }
                    return e;
                });
                this.TrangThaiSubject.next(this.TrangThaiSubject.value);
                this.thongbaoService.open('Cập nhật thành công!', 'bg-success');
                return data;
            })
        );
    }
    findTrangThai(id: number): TrangThai {
        return this.TrangThaiSubject.value.filter(e => {
            return e.id === id;
        })[0];
    }
}
