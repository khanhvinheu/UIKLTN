import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    constructor() {
        this.LoadingSub = new BehaviorSubject<boolean>(false);
        this.LoadingObs = this.LoadingSub.asObservable();
    }
    public LoadingSub: BehaviorSubject<boolean>;
    public LoadingObs: Observable<boolean>;
}
