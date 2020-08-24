import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ThongbaoService } from './thongbao.service';
import { Password_reset } from 'src/app/models/password_reset';
import { environment } from 'src/app/environments/environment.prod';
import { Taikhoan } from 'src/app/models/taikhoan';

@Injectable({
    providedIn: 'root'
})
export class PasswordResetService {
    password_resets: Password_reset[] = [];
    public prSubject: BehaviorSubject<Password_reset[]>;
    public currentPR: Observable<Password_reset[]>;
    public API: string = environment.api_url + '/api/admin/password_reset';
    constructor(
        public http: HttpClient,
        private thongbaoService: ThongbaoService
    ) {
        this.prSubject = new BehaviorSubject<Password_reset[]>(
            this.password_resets
        );
        this.currentPR = this.prSubject.asObservable();
        this.getAll();
    }
    set_subject(data) {
        this.prSubject.next(data);
    }
    getAll() {
        return this.http.get<Password_reset[]>(this.API).subscribe(res => {
            this.prSubject.next(res);
        });
    }
    reset(formdata): Observable<Taikhoan> {
        const url = this.API + '/reset';
        return this.http.post<Taikhoan>(url, formdata).pipe(
            map(
                data => {
                    return data;
                },
                err => {}
            )
        );
    }
}
