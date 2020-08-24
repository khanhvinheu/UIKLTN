import { DatePipe, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map, retry } from 'rxjs/operators';


import { ThongbaoService } from './thongbao.service';
import { environment } from 'src/app/environments/environment.prod';
import { Quanlydonhang } from 'src/app/models/quanlydonhang';

@Injectable({
    providedIn: 'root'
})
export class BaocaoService {
    private array_top: BehaviorSubject<number[]> = new BehaviorSubject<
        number[]
    >([]);
    public API: string = environment.api_url + '/api/admin';
    private hoadonxuats: Quanlydonhang[] = [];
    private subscriptions: Subscription[] = [];
    constructor(
        public http: HttpClient,
        private thongbaoService: ThongbaoService,
        private datePipe: DatePipe
    ) {
        this.get_array_top_from_api();
        this.setHDX_by_month();
    }
    setHDX_by_month() {
        const date = new Date();
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const formData = new FormData();
        formData.append(
            'NgayBD',
            this.datePipe.transform(firstDay, 'dd-MM-yyyy')
        );
        formData.append(
            'NgayKT',
            this.datePipe.transform(lastDay, 'dd-MM-yyyy')
        );
        this.subscriptions.push(
            this.getbaocao_donhang(formData).subscribe(
                data => {
                    if (data) {
                        this.hoadonxuats = data.slice();
                    }
                },
                err => {
                    {
                    }
                }
            )
        );
    }
    getDoanhThuTheoThang(data): Observable<any> {
        const formData = new FormData();
        formData.append('date', formatDate(data, 'yyyy/MM/dd', 'en-US'));
        return this.http.post<any>(this.API + '/doanhthutheothang', formData);
    }
    getbaocao_donhang(formdata: FormData): Observable<any[]> {
        return this.http.post<any[]>(this.API + '/baocao_donhang', formdata);
    }
    getbaocao_topsanpham(formdata: FormData): Observable<any[]> {
        return this.http
            .post<any[]>(this.API + '/baocao_topsanpham', formdata)
            .pipe(
                map(
                    data => {
                        return data;
                    },
                    err => {}
                ),
                retry(3)
            );
    }
    getbaocao_luotmua(formdata: FormData): Observable<any[]> {
        // console.log(formdata.get('NgayBD'))
        // console.log(formdata.get('NgayKT'))
        return this.http
            .post<any[]>(this.API + '/baocao_luotmua', formdata)
            .pipe(
                map(
                    data => {
                        // console.log(data)
                        return data;
                    },
                    err => {}
                ),
                retry(3)
            );
    }
    getbaocao_giatridonhang(formdata: FormData): Observable<any[]> {
        return this.http
            .post<any[]>(this.API + '/baocao_giatridonhang', formdata)
            .pipe(
                map(
                    data => {
                        // console.log(data)
                        return data;
                    },
                    err => {}
                ),
                retry(3)
            );
    }
    get_array_top_from_api() {
        this.http
            .get<number[]>(this.API + '/get_array_top')
            .pipe()
            .subscribe(
                data => {
                    this.array_top.next(data);
                },
                err => {}
            );
    }
    get_array_top(): Observable<number[]> {
        return this.array_top.asObservable().pipe(retry(3));
    }
}
