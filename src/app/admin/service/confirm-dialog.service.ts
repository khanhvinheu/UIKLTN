import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';



@Injectable({
    providedIn: 'root'
})
export class ConfirmDialogService {
    subcription: Subscription;
    constructor(private dialog: MatDialog) {}
    async openDialog() {
        let status = false;
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: 'Bạn muốn xóa ?'
        });
        await dialogRef
            .afterClosed()
            .toPromise()
            .then(result => {
                if (result) {
                    status = true;
                }
            });
        return status;
    }
    async openDialogwr() {
        let status = false;
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: 'Bạn thật sự muốn xóa nhà cung cấp?',           
        });
        await dialogRef
            .afterClosed()
            .toPromise()
            .then(result => {
                if (result) {
                    status = true;
                }
            });
        return status;
    }
}
