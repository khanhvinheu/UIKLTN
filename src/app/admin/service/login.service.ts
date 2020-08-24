import { Overlay } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaikhoanService } from './taikhoan.service';
import { Taikhoan } from 'src/app/models/taikhoan';
import { environment } from 'src/app/environments/environment';
import { NhacungcapService } from './nhacungcap.service';
import { Nhacungcap } from 'src/app/models/nhacungcap';
import { ThongbaoService } from './thongbao.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    nhacungcap:Nhacungcap[];
    public API: string = environment.api_url + '/admin';
    private currentUserSubject: BehaviorSubject<Taikhoan>;
    public currentUser: Observable<Taikhoan>;   
    constructor(
        private http: HttpClient,
        private userService: TaikhoanService,
        private router: Router,
        private nhacungcapService:NhacungcapService,
        private thongbaoService:ThongbaoService,
    ) {
        const token =
            localStorage.getItem('token') !== 'undefined'
                ? localStorage.getItem('token')
                : null;
        if (token) {
            this.auth().subscribe(
                res => {
                    if (res['user']) {
                        this.updateUser(res['user']);
                    } else {
                    }
                },
                err => {}
            );
        }
        this.currentUserSubject = new BehaviorSubject<Taikhoan>(null);
        this.currentUser = this.currentUserSubject.asObservable();      
        
        if (this.currentUserValue) {
            this.userService.currentUser.subscribe(data => {
                const value = data.filter(e => {
                    return e.id === this.currentUserValue.id;
                })[0];
                if (value) {
                    this.updateUser(value);
                }
            });
        }
    }
    public get currentUserValue(): Taikhoan {
        return this.currentUserSubject.value;
    }
    auth(): Observable<any[]> {
        const url = `${this.API}/auth`;  
        const token = localStorage.getItem('token');
        const header= {Authorization: `Bearer ${token}`};   
        return this.http.get<any>(url,{headers:header});       
    }
    login(data) {
        const url = `${this.API}/login`;
        // const url = `${this.API}/authenticate`;
        return this.http.post<any>(url, data).pipe(
            map(
                res => {                    
                    if (res['token'] && res['user']) {
                        localStorage.setItem('token', res['token']);
                        this.updateUser(res['user']);                       
                        if(res['user'].idQuyen==2){
                            this.nhacungcapService.getAll();
                            this.nhacungcapService.itemsSub.subscribe(data=>{
                                for (let index = 0; index < data.length; index++) {
                                    const element =data[index];                                     
                                    if(element.idTaiKhoan==res['user'].id){          
                                      const peopleArraya = data[index];                                      
                                      localStorage.setItem('nhacungcap',JSON.stringify(peopleArraya));
                                     
                                    }  
                                  }    
                                
                            });                            
                        }
                    }
                    return res;                   
                    
                },
                err => {}
            )
        );
        
        
    }
    updateUser(user) {     
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);        
    }
    logout() {
        const url = `${this.API}/logout`;
        const token =
            localStorage.getItem('token') !== 'undefined'
                ? localStorage.getItem('token')
                : null;
        if (token) {
            const formData = new FormData();
            formData.append('token', token);
            this.http.post<any>(url, formData).subscribe(res => {});
            localStorage.removeItem('currentUser');
            localStorage.removeItem('nhacungcap');
            this.currentUserSubject.next(null);
            this.router.navigateByUrl('/');
        }
    }
    register(data) {
        const url = `${this.API}/register`;
        return this.http.post<any>(url, data).pipe(
            map(
                user => {
                    if (
                        user['error'] === true ||
                        user['error_email'] === true
                        
                    ) {
                        this.thongbaoService.open('Email đã tồn tại! Vui lòng đăng ký với email khác', 'bg-danger');
                    } else {
                        this.userService.pushUserSubject(user.user);                        
                        this.thongbaoService.open('Đăng ký tài khoản thành công', 'bg-success');
                    }
                    return user;
                },
                err => {}
                )
                );
            }
    reset_password(formdata: FormData) {
        const url = `${this.API}/reset_password`;
        return this.http.post<any>(url, formdata).pipe(
            map(
                data => {
                    this.thongbaoService.open('Vui lòng kiểm tra email để đổi mật khẩu!!', 'bg-success');
                    return data;
                },
                err => {}
            )
        );
    }
    doimatkhau(formdata): Observable<Taikhoan> {
        const url = `${this.API}/profile/doimatkhau`;
        return this.http.post<Taikhoan>(url, formdata).pipe(
            map(
                data => {
                    if (data['user']) {
                        this.updateUser(data['user']);
                        this.thongbaoService.open('Đổi mật khẩu thành công', 'bg-success');
                    }
                    return data;
                },
                err => {}
            )
        );
    }
}
