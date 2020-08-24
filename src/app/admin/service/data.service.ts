import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

import { ThongbaoService } from './thongbao.service';
import { environment } from 'src/app/environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    isShow: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private idTab: BehaviorSubject<number> = new BehaviorSubject<number>(1);
    data: any[] = [];
    isLoaded = false;
    public isLoadedSubject: BehaviorSubject<boolean>;
    public currentIsLoaded: Observable<boolean>;
    public API: string = environment.api_url + '/api/admin/data';
    constructor(
        public http: HttpClient,
        private thongbaoService: ThongbaoService
    ) {
        this.isLoadedSubject = new BehaviorSubject<boolean>(this.isLoaded);
        this.currentIsLoaded = this.isLoadedSubject.asObservable();
    }
    // getAll(): Observable<any[]> {
    //     return this.http.get<any[]>(this.API).pipe(retry(2));
    // }
    getIsShow(): Observable<boolean> {
        return this.isShow.asObservable();
    }
    setIsShow(value: boolean) {
        return this.isShow.next(value);
    }
    getIdTab(): Observable<number> {
        return this.idTab.asObservable();
    }
    setIdTab(value: number) {
        return this.idTab.next(value);
    }
}
