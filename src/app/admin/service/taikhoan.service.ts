import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ThongbaoService } from './thongbao.service';
import { Taikhoan } from 'src/app/models/taikhoan';
import { environment } from 'src/app/environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class TaikhoanService {
    constructor(
        public http: HttpClient,
        private thongbaoService: ThongbaoService
    ) {
        this.userSubject = new BehaviorSubject<Taikhoan[]>(this.users);
        this.currentUser = this.userSubject.asObservable();
        //this.getAll();
    }
    users: Taikhoan[] = [];
    public userSubject: BehaviorSubject<Taikhoan[]>;
    public currentUser: Observable<Taikhoan[]>;
    public API: string = environment.api_url + '/api/admin/taikhoan';
    getCountUser() {
        return this.userSubject.value.length;
    }
    pushUserSubject(data: Taikhoan) {
        this.userSubject.value.push(data);
    }
    referById(id) {
        const url = `${this.API}/${id}`;
        return this.http.get<Taikhoan>(url);
    }
    getAll() {
        return this.http.get<Taikhoan[]>(this.API).subscribe(res => {
            this.userSubject.next(res);    
            // console.log(this.userSubject);
                                        
        });
       
        
    }
    getOne(id: number): Observable<Taikhoan> {
        const url = `${this.API}/${id}`;
        return this.http.get<Taikhoan>(url);
    }
    createNew(user: any): Observable<Taikhoan> {
        return this.http.post<Taikhoan>(this.API, user);
    }
    delete(user: Taikhoan): Observable<any> {
        const url = `${this.API}/${user.id}`;
        return this.http.delete(url);
    }
    update_hinh(formdata: FormData) {
        const url = `${this.API}/${formdata.get('id')}/changehinh`;
        return this.http.post<Taikhoan>(url, formdata).pipe(
            map(data => {
                this.userSubject.value.map(e => {
                    if (e.id === data.id) {
                        // e.hoTen = data.hoTen;
                        // e.gioiTinh = data.gioiTinh;
                        // e.ngaySinh = data.ngaySinh;
                        // e.dienThoai = data.dienThoai;                        
                        // e.diaChi = data.diaChi;
                        // e.idQuyen = Number.parseInt(data.idQuyen + '');                       
                        e.hinh = data.hinh;
                        // e.trangThai = data.trangThai;
                        e.updated_at = data.updated_at;
                    }
                    return e;
                });
                this.userSubject.next(this.userSubject.value);
                this.thongbaoService.open(
                    'Cập nhật thành công ảnh đại diện!',
                    'bg-success'
                );
                return data;
            })
        );
    }
    update(formdata: FormData): Observable<Taikhoan> {
        const url = `${this.API}/${formdata.get('id')}`;   
        return this.http.post<Taikhoan>(url, formdata).pipe(
            map(data => {
                this.userSubject.value.map(e => {
                    if (e.id === data.id) {
                        e.hoTen = data.hoTen;
                        e.gioiTinh = data.gioiTinh;
                        e.ngaySinh = data.ngaySinh;
                        e.dienThoai = data.dienThoai;                        
                        e.diaChi = data.diaChi;
                        e.idQuyen = Number.parseInt(data.idQuyen + '');                       
                        e.hinh = data.hinh;
                        e.trangThai = data.trangThai;
                        e.updated_at = data.updated_at;
                    }
                    return e;
                });
                this.userSubject.next(this.userSubject.value);
                this.thongbaoService.open('Cập nhật thành công!', 'bg-success');    
                return data;
            })
        );
    }    
    updateTrangthai(formdata: FormData): Observable<Taikhoan> {
        const url = `${this.API}/${formdata.get('id')}`;   
        return this.http.post<Taikhoan>(url, formdata).pipe(
            map(data => {
                this.userSubject.value.map(e => {
                    if (e.id === data.id) {                       
                        e.trangThai = data.trangThai;
                        e.updated_at = data.updated_at;
                    }
                    return e;
                });
                this.userSubject.next(this.userSubject.value);                   
                return data;
                
            })
        );
        
    }    
}
