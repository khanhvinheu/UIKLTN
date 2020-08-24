import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    CanActivate,
    Router,
    CanDeactivate
} from '@angular/router';
import { Observable } from 'rxjs';

// import { User } from '../models/user';
import { AdminComponent } from '../admin/admin.component';
import { LoginService } from '../admin/service/login.service';

@Injectable({
    providedIn: 'root'
})
export class RootadminGuard
    implements CanActivate, CanDeactivate<AdminComponent> {
    constructor(private router: Router, private loginService: LoginService) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> {
        const currentUser = this.loginService.currentUserValue;
        if (currentUser) {
            if (currentUser.idQuyen == 0) {
                this.router.navigate(['/admin']);
                return false;
            }
        }
        return true;
    }

    canDeactivate() {
        const currentUser = this.loginService.currentUserValue;
        if (currentUser) {
            if (currentUser.idQuyen == 0) {
                return true;
            }
        }
        return false;
    }
}
