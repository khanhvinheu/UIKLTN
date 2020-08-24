import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaocaoService } from '../../service/baocao.service';
import { DatePipe } from '@angular/common';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Sanpham } from 'src/app/models/sanpham';

@Component({
  selector: 'app-baocao-sanpham',
  templateUrl: './baocao-sanpham.component.html',
  styleUrls: ['./baocao-sanpham.component.sass']
})
export class BaocaoSanphamComponent implements OnInit {

  @Input() thugon: boolean
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
          ten: 'Top 10 sản phẩm bán chạy'
      },
      {
          id: 2,
          ten: 'tieu chi 2'
      },
      {
          id: 3,
          ten: 'tieu chi 3'
      }
  ];
  isLoading = false
  subscriptions: Subscription[] = [];
  columnsToDisplay = []
  expand = false
  sanphams: any[]
  frm: FormGroup
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true, }) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor (
      private datePipe: DatePipe,
      private baocaoService: BaocaoService,
      private _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
      this.isLoading = true
      this.loadData()
      this.createForm()
      this.onBaoCao()
  }
  createForm() {
      this.frm = this._formBuilder.group({
          tieuchi: ['',
              Validators.required],
          year: ['', [
              Validators.required,
          ]],
          quater: ['', [
              Validators.required,
          ]]
      })
  }
  loadDislayColumn() {
      this.columnsToDisplay = ['id', 'TenSanPham', 'SoLuong']
  }
  loadData() {
      for (let i = 2000; i < 2030; i++) {
          this.years.push(i)
      }
      this.isLoading = true
      this.loadDislayColumn()
      this.subscriptions.push(
      )
      this.isLoading = false
  }
  onBaoCao() {
      if (this.frm.value.year == 0) {
          var formData = new FormData();
          formData.append('NgayBD', null);
          formData.append('NgayKT', null);
      } else {
          let ngaybd = new Date(this.frm.value.year, Number.parseInt(this.frm.value.quater.ngaybd) - 1, 1)
          let ngaykt = new Date(this.frm.value.year, Number.parseInt(this.frm.value.quater.ngaykt), 0)
          var formData = new FormData();
          formData.append('NgayBD', this.datePipe.transform(ngaybd, "dd-MM-yyyy"));
          formData.append('NgayKT', this.datePipe.transform(ngaykt, "dd-MM-yyyy"));
      }
      this.isLoading = true
      this.subscriptions.push(this.baocaoService.getbaocao_topsanpham(formData).subscribe(data => {
          if (data) {
              this.sanphams = data.slice(0, 10)
              this.dataSource = new MatTableDataSource<Sanpham>(this.sanphams);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;

          }
      }, err => { console.log(err) }).add(() => {
          this.isLoading = false
      }))
  }
  onSubmit() {
      console.log(this.frm.value)
      if (this.frm.value.tieuchi.id == 1) {
          this.onBaoCao()
      }
  }
  ngOnDestroy(): void {
      if (this.subscriptions) {
          this.subscriptions.forEach(e => {
              e.unsubscribe()
          })
      }
  }

}
