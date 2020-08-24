import { Injectable } from '@angular/core';
import { ThongbaoService } from './thongbao.service';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    public ExportOrderSub: BehaviorSubject<any[]>;
    public ExportOrderObs: Observable<any[]>;
    constructor(
        public http: HttpClient,
        private thongbaoService: ThongbaoService
    ) {
        this.ExportOrderSub = new BehaviorSubject<any[]>([]);
        this.ExportOrderObs = this.ExportOrderSub.asObservable();
    }
    API = environment.api_url;
    fetchExportOrder(formData) {
        this.http
            .post<any[]>(this.API + '/api/admin/fetch-export-order', formData)
            .subscribe(
                res => {
                    this.ExportOrderSub.next(res);
                },
                err => {},
                () => {}
            );
    }
}
