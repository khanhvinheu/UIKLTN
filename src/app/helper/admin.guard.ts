
import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanDeactivate
} from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from '../admin/service/login.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate, CanDeactivate<AdminComponent> {
    constructor(private router: Router, private loginService: LoginService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        return this.loginService.auth().pipe(
            map(res => {               
                if (res['user'] ) {
                    this.loginService.updateUser(res['user']);
                    if (Number.parseInt(res['user'].idQuyen) === 1 || Number.parseInt(res['user'].idQuyen) === 2) {
                        return true;
                    }
                }                
                this.router.navigateByUrl('/');
                return false;
            })
            );            
    }
    canDeactivate() {
        const currentUser = this.loginService.currentUserValue;
        if (currentUser) {
            if (currentUser.idQuyen !== 0) {                
                return true;                
            }
        }      
        return false;
    }
}
