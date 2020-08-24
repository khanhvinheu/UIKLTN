import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/app/environments/environment.prod';
import { TrangThai } from 'src/app/models/trangthai';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Sanpham } from 'src/app/models/sanpham';
import { Taikhoan } from 'src/app/models/taikhoan';
import { DatePipe } from '@angular/common';
import { TrangthaiService } from '../../service/trangthai.service';
import { SanphamService } from '../../service/sanpham.service';
import { TaikhoanService } from '../../service/taikhoan.service';
import { QuanlysdonhangService } from '../../service/quanlydonhang.service';
import { ResultValidatorService } from '../../service/result-validator.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ChitietdonhangService } from '../../service/chitietdonhang.service';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { ChiTietDonHang } from 'src/app/models/chitietdonhang';

@Component({
  selector: 'app-quanlydonhang-edit',
  templateUrl: './quanlydonhang-edit.component.html',
  styleUrls: ['./quanlydonhang-edit.component.sass']
})
export class QuanlydonhangEditComponent implements OnInit {

  api_url = environment.api_img;
    title = 'Chi tiết đơn hàng';
    readonly = true;
    expand = false;
    trangthais: TrangThai[] = [];
    subscriptions: Subscription[] = [];
    hoadonxuat: any = null;
    frm: FormGroup;
    dataSource;
    isLoading = false;
    chitiethoadonxuats: any[] = [];
    columnsToDisplay = [];
    sanphams: Sanpham[] = [];
    users: Taikhoan[] = [];
    // diadiems: DiaDiem[] = [];
    // thanhphos: DiaDiem[] = [];
    // quans: DiaDiem[] = [];
    // phuongs: DiaDiem[] = [];
    // thanhpho: DiaDiem;
    // quan: DiaDiem;
    // phuong: DiaDiem;
    isCancel = false;
    constructor(
        private datePipe: DatePipe,
        //private diadiemService: DiadiemService,
        private trangthaiService: TrangthaiService,
        private sanphamService: SanphamService,
        private userService: TaikhoanService,
        private chitiethoadonxuatService: ChitietdonhangService,
        private hoadonxuatService: QuanlysdonhangService,
        private _formBuilder: FormBuilder,
        private resultValidatorService: ResultValidatorService,
        private activateRouteService: ActivatedRoute,
        public dialog: MatDialog
    ) {}
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;
    ngOnInit() {
        this.hoadonxuatService.referById(
            this.activateRouteService.params['value'].id
        );
        //this.diadiemService.getAll();
        this.loadDislayColumn();
        this.createForm();
        this.loadData();
    }
    loadDislayColumn() {
        this.columnsToDisplay = this.expand
            ? [
                  'id',
                  'Hinh',
                  'idSanPham',
                  'DonGia',
                  'SoLuong',
                  'chietKhau',
                  'thanhTien',
                  'MaDotNhap',
                  'idHDX',
                  'created_at',
                  'updated_at'
              ]
            : ['id', 'Hinh', 'idSanPham', 'DonGia', 'SoLuong','chietKhau','thanhTien'];
    }

    getThanhPhos() {
        // this.thanhphos = this.diadiems
        //     .filter(data => {
        //         return data.idParent == null;
        //     })
        //     .slice();
    }
    getThanhPho() {
    //     if (this.quan) {
    //         this.thanhpho = this.diadiems
    //             .filter(data => {
    //                 return data.id === this.quan.idParent;
    //             })
    //             .slice()[0];
    //         this.quans = this.diadiems.filter(data => {
    //             return data.idParent === this.quan.idParent;
    //         });
    //     }
    }
    getQuan() {
        // if (this.phuong) {
        //     this.quan = this.diadiems
        //         .filter(data => {
        //             return data.id === this.phuong.idParent;
        //         })
        //         .slice()[0];
        //     this.phuongs = this.diadiems
        //         .filter(data => {
        //             return data.idParent === this.phuong.idParent;
        //         })
        //         .slice();
        // }
    }
    getPhuong() {
        // if (this.hoadonxuat) {
        //     this.phuong = this.diadiems
        //         .filter(data => {
        //             return data.id === this.hoadonxuat.idDiaDiem;
        //         })
        //         .slice()[0];
        // }
    }
    onChangeThanhPho(id: number) {
        // this.quans = this.diadiems
        //     .filter(data => {
        //         return data.idParent === id;
        //     })
        //     .slice();
    }
    onChangeQuan(id: number) {
        // this.phuongs = this.diadiems.filter(data => {
        //     return data.idParent === id;
        // });
    }
    onSave() {
        const formData = new FormData();
        for (const key in this.frm.value) {
            formData.append(key, this.frm.value[key]);
        }
        this.hoadonxuatService.update(formData);
        this.onChangeReadonly();
    }
    loadData() {
        this.subscriptions.push(
            this.hoadonxuatService.itemObs.subscribe(
                data => {
                    this.hoadonxuat = data;
                    this.createForm();
                },
                () => {}
            ),
            this.hoadonxuatService.detailObs.subscribe(data => {
                if (data) {
                    this.chitiethoadonxuats = data.slice();
                    this.dataSource = new MatTableDataSource<any>(
                        this.chitiethoadonxuats
                    );
                    this.dataSource.sort = this.sort;
                }
            }),
            this.trangthaiService.currentTrangThai.subscribe(
                data => {
                    this.trangthais = data;
                },
                () => {}
            ),
            // this.diadiemService.currentDiaDiem.subscribe(
            //     data => {
            //         this.diadiems = data;
            //         this.getPhuong();
            //         this.getQuan();
            //         this.getThanhPho();
            //         this.getThanhPhos();
            //     },
            //     () => {}
            // )
        );
    }
    onChangeReadonly() {
        this.readonly = !this.readonly;
        this.readonly
            ? // tslint:disable-next-line:ban-comma-operator
              (this.frm.controls['idTrangthai'].disable())
            : // tslint:disable-next-line:ban-comma-operator
              (this.frm.controls['idTrangthai'].enable());
    }
    createForm() {
        this.frm = this._formBuilder.group({
            id: [this.hoadonxuat ? this.hoadonxuat.id : ''],
            idUser: [this.hoadonxuat ? this.hoadonxuat.idTaiKhoan : ''],
            TongTien: [this.hoadonxuat ? this.hoadonxuat.tongTien.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') +' đ'  : ''],
            phiShip: [this.hoadonxuat ? this.hoadonxuat.phiShip.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') +' đ'  : ''],
            tongtientra: [this.hoadonxuat ? this.hoadonxuat.tongtientra.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') +' đ'  : ''],
            NguoiNhan: [this.hoadonxuat ? this.hoadonxuat.NguoiNhan : ''],
            DiaChi: [this.hoadonxuat ? this.hoadonxuat.DiaChi : ''],
            DienThoai: [this.hoadonxuat ? this.hoadonxuat.DienThoai : ''],
            idTrangthai: [
                {
                    value: this.hoadonxuat ? this.hoadonxuat.idTrangthai : '',
                    disabled: this.readonly
                }
            ],
            // idDiaDiem: [
            //     {
            //         value: this.hoadonxuat ? this.hoadonxuat.idDiaDiem : '',
            //         disabled: this.readonly
            //     },
            //     []
            // ],
            LiDo: [this.hoadonxuat ? this.hoadonxuat.LiDo : ''],
            updated_at: [this.hoadonxuat ? this.hoadonxuat.updated_at : '']
        });
    }
    onDelete(e: ChiTietDonHang) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: 'Bạn muốn xóa ?'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.chitiethoadonxuatService.delete(e);
                this.hoadonxuatService.referById(
                    this.activateRouteService.params['value'].id
                );
            }
        });
    }

    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => {
                e.unsubscribe();
            });
        }
    }

    onValidator(controlName: string, status?: boolean) {
        return this.resultValidatorService.getResult(
            controlName,
            this.frm,
            status
        );
    }
    onValidatorBorderColor(controlName: string) {
        return this.resultValidatorService.getBorderColor(
            controlName,
            this.frm
        );
    }
    onValidatorTextColor(controlName: string) {
        return this.resultValidatorService.getTextColor(controlName, this.frm);
    }
    onExpand() {
        this.expand = !this.expand;
        this.columnsToDisplay = this.expand
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
                  'created_at',
                  'updated_at'
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
                  'LiDo'
              ];
    }

}
