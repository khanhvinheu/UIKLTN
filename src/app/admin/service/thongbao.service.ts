import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ThongbaoComponent } from 'src/app/components/thongbao/thongbao.component';

@Injectable({
    providedIn: 'root'
})
export class ThongbaoService {
    constructor(private _snackBar: MatSnackBar) {}
    open(data?: string, color?: string): void {
        this._snackBar.openFromComponent(ThongbaoComponent, {
            duration: 500,
            data,
            verticalPosition: 'bottom',
            panelClass: [color]
        });
    }
}
