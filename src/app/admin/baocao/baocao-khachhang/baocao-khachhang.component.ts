import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { BaocaoService } from '../../service/baocao.service';
import { DatePipe } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-baocao-khachhang',
  templateUrl: './baocao-khachhang.component.html',
  styleUrls: ['./baocao-khachhang.component.sass']
})
export class BaocaoKhachhangComponent implements OnInit {

  years = [];
  quaters = [
      {
          id: 'Cả năm',
          ngaybd: '1',
          ngaykt: '12'
      },
      {
          id: 1,
          ngaybd: '1',
          ngaykt: '3'
      },
      {
          id: 2,
          ngaybd: '4',
          ngaykt: '6'
      },
      {
          id: 3,
          ngaybd: '7',
          ngaykt: '9'
      },
      {
          id: 4,
          ngaybd: '10',
          ngaykt: '12'
      }
  ];
  tieuchis = [
      {
          id: 1,
          ten: 'Theo số lượt mua'
      },
      {
          id: 2,
          ten: 'Theo tổng giá trị đơn hàng'
      }
  ];
  isLoading = false;
  subscriptions: Subscription[] = [];
  columnsToDisplay = [];
  expand = false;
  khachhangs: any[];
  frm: FormGroup;
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(
      private datePipe: DatePipe,
      private baocaoService: BaocaoService,
      private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
      this.isLoading = true;
      this.loadData();
      this.createForm();
  }
  ngOnDestroy(): void {
      if (this.subscriptions) {
          this.subscriptions.forEach(e => {
              e.unsubscribe();
          });
      }
  }

  createForm() {
      this.frm = this._formBuilder.group({
          tieuchi: ['', Validators.required],
          year: ['', [Validators.required]],
          quater: ['', [Validators.required]]
      });
  }
  loadDislayColumn() {
      this.columnsToDisplay = ['id', 'Ten', 'SoLuotMua', 'TongGiaTri'];
  }
  loadData() {
      for (let i = 2000; i < 2030; i++) {
          this.years.push(i);
      }
      this.isLoading = true;
      this.loadDislayColumn();

      this.isLoading = false;
  }
  // getTongTien_by_khachhang(idKhachHang: number) {
  //     if (this.frm.value.year == 0) {
  //         return this.hoadonxuatService.getTongTien_by_khachhang_all(idKhachHang)
  //     } else {
  //         let ngaybd = new Date(this.frm.value.year, this.frm.value.quater.ngaybd, 1)
  //         let ngaykt = new Date(this.frm.value.year, this.frm.value.quater.ngaybd + 1, 0)
  //         return this.hoadonxuatService.getTongTien_by_khachhang(idKhachHang, ngaybd, ngaykt)
  //     }

  // }
  onBaoCao_luotmua() {
      const formData = new FormData();
      if (this.frm.value.year === 0) {
          formData.append('NgayBD', null);
          formData.append('NgayKT', null);
      } else {
          const ngaybd = new Date(
              this.frm.value.year,
              Number.parseInt(this.frm.value.quater.ngaybd) - 1,
              1
          );
          const ngaykt = new Date(
              this.frm.value.year,
              Number.parseInt(this.frm.value.quater.ngaykt),
              0
          );
          formData.append(
              'NgayBD',
              this.datePipe.transform(ngaybd, 'dd-MM-yyyy')
          );
          formData.append(
              'NgayKT',
              this.datePipe.transform(ngaykt, 'dd-MM-yyyy')
          );
      }
      this.isLoading = true;
      this.subscriptions.push(
          this.baocaoService
              .getbaocao_luotmua(formData)
              .subscribe(
                  data => {
                      if (data) {
                          this.khachhangs = data;
                          this.dataSource = new MatTableDataSource<any>(
                              this.khachhangs
                          );
                          this.dataSource.paginator = this.paginator;
                          this.dataSource.sort = this.sort;
                      }
                  },
                  err => {}
              )
              .add(() => {
                  this.isLoading = false;
              })
      );
  }
  onBaoCao_giatridonhang() {
      const formData = new FormData();
      if (this.frm.value.year === 0) {
          formData.append('NgayBD', null);
          formData.append('NgayKT', null);
      } else {
          const ngaybd = new Date(
              this.frm.value.year,
              Number.parseInt(this.frm.value.quater.ngaybd) - 1,
              1
          );
          const ngaykt = new Date(
              this.frm.value.year,
              Number.parseInt(this.frm.value.quater.ngaykt),
              0
          );
          formData.append(
              'NgayBD',
              this.datePipe.transform(ngaybd, 'dd-MM-yyyy')
          );
          formData.append(
              'NgayKT',
              this.datePipe.transform(ngaykt, 'dd-MM-yyyy')
          );
      }
      this.isLoading = true;
      this.subscriptions.push(
          this.baocaoService
              .getbaocao_giatridonhang(formData)
              .subscribe(
                  data => {
                      if (data) {
                          this.khachhangs = data;
                          this.dataSource = new MatTableDataSource<any>(
                              this.khachhangs
                          );
                          this.dataSource.paginator = this.paginator;
                          this.dataSource.sort = this.sort;
                      }
                  },
                  err => {
                      console.log(err);
                  }
              )
              .add(() => {
                  this.isLoading = false;
              })
      );
  }
  onSubmit() {
      if (this.frm.value.tieuchi.id === 1) {
          this.onBaoCao_luotmua();
      }
      if (this.frm.value.tieuchi.id === 2) {
          this.onBaoCao_giatridonhang();
      }
  }

}
