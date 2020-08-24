import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/app/environments/environment.prod';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-chitietdonhang',
  templateUrl: './chitietdonhang.component.html',
  styleUrls: ['./chitietdonhang.component.sass']
})
export class ChitietdonhangComponent implements OnInit {

  api_url = environment.api_img;
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => e.unsubscribe());
        }
    }
    dataSource;
    subscriptions: Subscription[] = [];
    columnsToDisplay = ['Hinh', 'idSanPham', 'DonGia', 'SoLuong'];
    newTable = [];
    @Input() orderDetails: [];
    constructor() {}
    ngOnInit() {
        this.loadData();       
    }
    transformTable() {
        this.orderDetails.forEach(e => {
            const newitem = {
                id: e['id'],
                Hinh: e['hinhAnh'],
                SoLuong: e['soLuong'],
                DonGia: e['donGia'],
                TenSanPham: e['tenSanpham'],
                thanhTien: e['thanhTien'],
                chietKhau: e['chietKhau']
            };
            this.newTable.push(newitem);      
        });
    }
    loadData() {
        this.transformTable();
        this.dataSource = new MatTableDataSource<any>(this.newTable);
    }

}
