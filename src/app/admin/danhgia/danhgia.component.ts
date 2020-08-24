import { Component, OnInit, ViewChild } from '@angular/core';
import { DanhGia } from 'src/app/models/danhgia';
import { Sanpham } from 'src/app/models/sanpham';
import { Taikhoan } from 'src/app/models/taikhoan';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogService } from '../service/confirm-dialog.service';
import { MyHelper } from 'src/app/helper/MyHelper';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DanhgiaService } from '../service/danhgia.service';

@Component({
  selector: 'app-danhgia',
  templateUrl: './danhgia.component.html',
  styleUrls: ['./danhgia.component.sass']
})
export class DanhgiaComponent implements OnInit {

  title = 'ĐÁNH GIÁ';
    expand = false;
    columnsToDisplay = this.expand
        ? [
              'id',
              'diem',
              'noidung',
              'idsanpham',
              'iduser',
              'created_at',
              'updated_at',
              'action'
          ]
        : ['id', 'diem', 'noidung', 'idsanpham', 'iduser', 'action'];
    danhgias: DanhGia[] = [];
    sanphams: Sanpham[] = [];
    users: Taikhoan[] = [];
    subscriptions: Subscription[] = [];
    dataSource;
    isLoading = false;
    constructor(
        // private sanphamService: SanphamService,
        // private userService: UserService,
        private danhgiaService: DanhgiaService,
        public dialog: MatDialog,
        private confirmDialogService: ConfirmDialogService,
        private myHelper: MyHelper
    ) {}
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;

    ngOnInit() {
        this.isLoading = true;
        this.loadData();
    }
    loadData() {
        this.subscriptions.push(
            this.danhgiaService.currentDanhGia.subscribe(
                data => {
                    this.danhgias = data;
                    this.dataSource = new MatTableDataSource<DanhGia>(
                        this.danhgias
                    );
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.isLoading = false;
                },
                err => {}
            )
        );
    }
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => {
                e.unsubscribe();
            });
        }
    }
    onDelete(danhgia: DanhGia) {
        this.confirmDialogService.openDialog().then(result => {
            if (result) {
                this.danhgiaService.delete(danhgia);
            }
        });
    }
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    onExpand() {
        this.expand = !this.expand;
        this.columnsToDisplay = this.expand
            ? [
                  'id',
                  'diem',
                  'noidung',
                  'idsanpham',
                  'iduser',
                  'created_at',
                  'updated_at',
                  'action'
              ]
            : ['id', 'diem', 'noidung', 'idsanpham', 'iduser', 'action'];
    }  
}
