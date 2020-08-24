import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { QuanlysdonhangService } from '../../service/quanlydonhang.service';
import { TaikhoanService } from '../../service/taikhoan.service';
import { TrangthaiService } from '../../service/trangthai.service';
import { DatePipe } from '@angular/common';
import { BaocaoService } from '../../service/baocao.service';
import { TrangThai } from 'src/app/models/trangthai';
import { Taikhoan } from 'src/app/models/taikhoan';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-baocao-donhang',
  templateUrl: './baocao-donhang.component.html',
  styleUrls: ['./baocao-donhang.component.sass']
})
export class BaocaoDonhangComponent implements OnInit {

  @Input() thugon: boolean;
  ngOnDestroy(): void {
      if (this.subscriptions) {
          this.subscriptions.forEach(e => {
              e.unsubscribe();
          });
      }
  }
  isLoading = false;
  tungay: Date;
  denngay: Date;
  subscriptions: Subscription[] = [];
  columnsToDisplay = [];
  expand = false;
  hoadonxuats: any[] = [];
  frmBaoCao1: FormGroup;
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  users: Taikhoan[] = [];
  //diadiems: DiaDiem[] = [];
  trangthais: TrangThai[] = [];
  total = 0;
  constructor(
      private baocaoService: BaocaoService,
      private datePipe: DatePipe,
      private trangthaiService: TrangthaiService,
     // private diadiemService: DiadiemService,
      private userService: TaikhoanService,
      private _formBuilder: FormBuilder,
      private hoadonxuatService: QuanlysdonhangService
  ) {}

  ngOnInit() {
      this.isLoading = true;
      this.loadData();
      this.createForm();
  }
  createForm() {
      const date = new Date();
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      this.frmBaoCao1 = this._formBuilder.group({
          NgayBD: [firstDay, [Validators.required]],
          NgayKT: [lastDay, [Validators.required]]
      });
      this.onBaoCao();
  }
  findUser(id: number) {
      return this.users.filter(data => {
          return data.id === id;
      })[0];
  }
  findDiaDiem(id: number) {
      // return this.diadiems.filter(data => {
      //     return data.id === id;
      // })[0];
  }

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
      const arrayHeader2 = [
          'id',
          'NguoiNhan',
          'DienThoai',
          'TongTien',
          'created_at'
      ];
      this.columnsToDisplay = this.expand ? arrayHeader1 : arrayHeader2;
  }
  loadData() {
      this.isLoading = true;
      this.loadDislayColumn();

      this.isLoading = false;
  }
  onBaoCao() {
      const formData = new FormData();
      formData.append(
          'NgayBD',
          this.datePipe.transform(
              this.frmBaoCao1.value['NgayBD'],
              'dd-MM-yyyy'
          )
      );
      formData.append(
          'NgayKT',
          this.datePipe.transform(
              this.frmBaoCao1.value['NgayKT'],
              'dd-MM-yyyy'
          )
      );
      this.isLoading = true;
      this.subscriptions.push(
          this.baocaoService
              .getbaocao_donhang(formData)
              .subscribe(
                  data => {
                      if (data) {
                          this.hoadonxuats = data;
                          this.dataSource = new MatTableDataSource<any>(
                              this.hoadonxuats
                          );
                          this.total = this.hoadonxuats.reduce(
                              (tong, item) => {
                                  return (tong += item.total);
                              },
                              0
                          );
                          this.dataSource.paginator = this.paginator;
                          this.dataSource.sort = this.sort;
                      }
                  },
                  () => {}
              )
              .add(() => (this.isLoading = false))
      );
  }

  getTotal() {
      return this.total;
  }

}
