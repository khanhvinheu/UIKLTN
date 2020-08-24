import { Component, OnInit, ViewChild } from '@angular/core';
import { NhaSanXuat } from 'src/app/models/nhasanxuat';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogService } from '../../service/confirm-dialog.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NhasanxuatAddComponent } from '../nhasanxuat-add/nhasanxuat-add.component';
import { NhasanxuatEditComponent } from '../nhasanxuat-edit/nhasanxuat-edit.component';
import { NhasanxuatService } from '../../service/nhasanxuat.service';

@Component({
  selector: 'app-nhasanxuat-list',
  templateUrl: './nhasanxuat-list.component.html',
  styleUrls: ['./nhasanxuat-list.component.sass']
})
export class NhasanxuatListComponent implements OnInit {

  expand = false;
    columnsToDisplay = [];
    items: NhaSanXuat[] = [];
    subscriptions: Subscription[] = [];
    dataSource = new MatTableDataSource<NhaSanXuat>();
    isLoading = false;
    constructor(
        private nhasanxuatService: NhasanxuatService,
        public dialog: MatDialog,
        private confirmDialogService: ConfirmDialogService
    ) {}
    loadDislayColumn() {
        this.columnsToDisplay = this.expand
            ? ['id', 'Ten', 'created_at', 'updated_at', 'action']
            : ['id', 'Ten', 'action'];
    }
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;
    ngOnInit() {
        this.nhasanxuatService.getAll();
        this.loadData();
    }
    loadData() {
        this.isLoading = true;
        this.loadDislayColumn();
        this.subscriptions.push(
            this.nhasanxuatService.itemsObs.subscribe(
                data => {
                    this.items = data;                   
                    this.dataSource.data = this.items;
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.isLoading = false;
                },
                () => {}
            )
        );
    }
    onAdd() {
        this.dialog.open(NhasanxuatAddComponent, {
            width: '400px'
        });
    }
    onDelete(item: NhaSanXuat) {
        this.confirmDialogService.openDialog().then(result => {
            if (result) {
                this.nhasanxuatService.delete(item);
            }
        });
    }
    onUpdate(item) {
        this.dialog.open(NhasanxuatEditComponent, {
            width: '400px',
            data: item
        });
    }
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    onExpand() {
        this.expand = !this.expand;
        this.loadDislayColumn();
    }

    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.forEach(subscription =>
                subscription.unsubscribe()
            );
        }
    }
    trackByFn(index, item) {
        return index;
    }

}
