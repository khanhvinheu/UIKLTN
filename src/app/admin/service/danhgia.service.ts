import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ThongbaoService } from './thongbao.service';
import { DanhGia } from 'src/app/models/danhgia';
import { environment } from 'src/app/environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class DanhgiaService {
    danhgias: DanhGia[] = [];
    public danhgiaSubject: BehaviorSubject<DanhGia[]>;
    public currentDanhGia: Observable<DanhGia[]>;
    public API: string = environment.api_url + '/api/admin/danhgia';
    constructor(
        public http: HttpClient,
        private thongbaoService: ThongbaoService
    ) {
        this.danhgiaSubject = new BehaviorSubject<DanhGia[]>(this.danhgias);
        this.currentDanhGia = this.danhgiaSubject.asObservable();
        this.getAll();
    }

    getOne(id: number): Observable<DanhGia> {
        const url = `${this.API}/${id}`;
        return this.http.get<DanhGia>(url);
    }
    getAll() {
        return this.http.get<DanhGia[]>(this.API).subscribe(res => {
            if (res['status'] === 'OK') {
                this.danhgiaSubject.next(res['data']);
            }
        });
    }
    createNew(danhgia: DanhGia) {
        this.http.post<DanhGia>(this.API, danhgia).subscribe(data => {
            if (data['status'] === 'OK') {
                this.danhgiaSubject.value.push(data);
                this.danhgiaSubject.next(this.danhgiaSubject.value);
            }
        });
    }
    delete(danhgia: DanhGia) {
        const url = `${this.API}/${danhgia.id}`;
        this.http.delete(url).subscribe(
            data => {
                if (data['status'] === 'OK') {
                    const index = this.findIndex(
                        this.danhgiaSubject.value,
                        danhgia.id
                    );

                    if (index !== -1) {
                        this.danhgiaSubject.value.splice(index, 1);
                        this.danhgiaSubject.next(this.danhgiaSubject.value);
                        this.thongbaoService.open(
                            'Xóa thành công: ' + danhgia.id + ' !',
                            'bg-success'
                        );
                    }
                } else {
                    this.thongbaoService.open(data + '', 'bg-success');
                }
            },
            err => {}
        );
    }
    findIndex(array, id: number) {
        return array.findIndex(e => e.id === id);
    }
    update(formdata: FormData) {
        const url = `${this.API}/${formdata.get('id')}`;
        return this.http.post<DanhGia>(url, formdata).subscribe(data => {
            if (data) {
                const index = this.findIndex(
                    this.danhgiaSubject.value,
                    data.id
                );
                this.danhgiaSubject.value[index] = data;
                this.danhgiaSubject.next(this.danhgiaSubject.value);
                this.thongbaoService.open('Cập nhật thành công!', 'bg-success');
            }
        });
    }
}
