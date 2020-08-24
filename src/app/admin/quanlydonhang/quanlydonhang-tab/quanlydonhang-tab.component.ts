import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Quanlydonhang } from 'src/app/models/quanlydonhang';
import { Taikhoan } from 'src/app/models/taikhoan';
import { Subscription } from 'rxjs';
import { TrangThai } from 'src/app/models/trangthai';
import { TrangthaiService } from '../../service/trangthai.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogService } from '../../service/confirm-dialog.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BaocaoService } from '../../service/baocao.service';
import { QuanlysdonhangService } from '../../service/quanlydonhang.service';

@Component({
  selector: 'app-quanlydonhang-tab',
  templateUrl: './quanlydonhang-tab.component.html',
  styleUrls: ['./quanlydonhang-tab.component.sass']
})
export class QuanlydonhangTabComponent implements OnInit {

    is_loading = false;
    @Input() idtab: number;
    expand = false;
    columnsToDisplay = [];
    hoadonxuats: Quanlydonhang[] = [];
    users: Taikhoan[] = [];
    subscriptions: Subscription[] = [];
    dataSource;
    //diadiems: DiaDiem[] = [];
    trangthais: TrangThai[] = [];
    loadDislayColumn() {
        const arrayHeader1 = [
            'id',
            'NguoiNhan',
            'DienThoai',
            'TongTien',
            'DiaChi',
            'idDiaDiem',
            'idUser',
            'idTrangThai',
            'LiDo',
            'created_at',
            'updated_at',
            'action'
        ];
        const arrayHeader2 =
            this.idtab === 5
                ? [
                      'id',
                      'NguoiNhan',
                      'DienThoai',
                      'TongTien',
                      'DiaChi',
                      'idDiaDiem',
                      'idUser',
                      'idTrangThai',
                      'LiDo',
                      'updated_at',
                      'action'
                  ]
                : [
                      'id',
                      'NguoiNhan',
                      'DienThoai',
                      'TongTien',
                      'DiaChi',
                      'idDiaDiem',
                      'idUser',
                      'idTrangThai',
                      'updated_at',
                      'action'
                  ];
        this.columnsToDisplay = this.expand ? arrayHeader1 : arrayHeader2;
    }

    constructor(
        private trangthaiService: TrangthaiService,
        private hoadonxuatService: QuanlysdonhangService,
        public dialog: MatDialog,
        private router: Router,
        private confirmDialogService: ConfirmDialogService,
        private baocaoService: BaocaoService
    ) {}
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;

    ngOnInit() {
        this.loadData();
    }
    onDetail(e) {
        this.router.navigate(['admin/quanlydonhang', e.id, 'detail']);
    }
    loadData() {
        this.loadDislayColumn();
        this.subscriptions.push(
            this.hoadonxuatService.itemsObs.subscribe(
                data => {
                    if (data.length > 0) {
                        if(JSON.parse(localStorage.getItem('currentUser'))['idQuyen']==1){
                            this.hoadonxuats = data.filter(e => {
                                return e.idTrangthai === this.idtab;
                            });
                        }
                        else{
                            this.hoadonxuats = data.filter(e => {
                                return e.idTrangthai === this.idtab;
                            });
                        }
                        this.dataSource = new MatTableDataSource<Quanlydonhang>(
                            this.hoadonxuats
                        );
                        this.dataSource.paginator = this.paginator;
                        this.dataSource.sort = this.sort;
                    }
                },
                () => {}
            ),
            this.trangthaiService.currentTrangThai.subscribe(
                data => {
                    this.trangthais = data;
                },
                () => {}
            ),
            this.hoadonxuatService.isLoadingObs.subscribe(data => {
                this.is_loading = data;
            })
        );
    }
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => {
                e.unsubscribe();
            });
        }
    }

    onChangeTrangThai(item) {
        const formdata = new FormData();
        formdata.append('_method', 'put');
        for (const key in item) {
            formdata.append(key, item[key]);
        }
        this.hoadonxuatService.update(formdata);
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    onExpand() {
        this.expand = !this.expand;
        this.loadDislayColumn();
    }
    onEdit(data) {
        this.router.navigate(['admin/quanlydonhang', data.id, 'edit']);
    }
    trackByFn(index, item) {
        return index;
    }

}
