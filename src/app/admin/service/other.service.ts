import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OtherService {
    showmenuSubject: BehaviorSubject<boolean>;
    public showmenuObser: Observable<boolean>;
    show_filter_subject: BehaviorSubject<boolean>;
    public show_filter_obser: Observable<boolean>;
    constructor() {
        this.showmenuSubject = new BehaviorSubject<boolean>(false);
        this.showmenuObser = this.showmenuSubject.asObservable();
        this.show_filter_subject = new BehaviorSubject<boolean>(false);
        this.show_filter_obser = this.show_filter_subject.asObservable();
    }
    toggle_showmenu() {
        this.showmenuSubject.next(true);
    }
    toggle_showfilter() {
        this.show_filter_subject.next(true);
    }
}
