import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MobileService {
    public mobileSubject: BehaviorSubject<boolean>;
    public mobileObs: Observable<boolean>;
    constructor() {
        this.mobileSubject = new BehaviorSubject<boolean>(true);
        this.mobileObs = this.mobileSubject.asObservable();
    }
    setMobileSubject(flag: boolean) {
        this.mobileSubject.next(flag);
    }
}
