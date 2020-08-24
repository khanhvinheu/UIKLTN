import { Component, OnInit } from '@angular/core';
import { Taikhoan } from 'src/app/models/taikhoan';
import { QuanlysdonhangService } from 'src/app/admin/service/quanlydonhang.service';
import { Subscription } from 'rxjs';
import { ChiTietDonHang } from 'src/app/models/chitietdonhang';
import { LoginService } from 'src/app/admin/service/login.service';
import { ProfileService } from 'src/app/admin/service/profile.service';
import { Quanlydonhang } from 'src/app/models/quanlydonhang';

@Component({
  selector: 'app-lichsumuahang',
  templateUrl: './lichsumuahang.component.html',
  styleUrls: ['./lichsumuahang.component.sass']
})
export class LichsumuahangComponent implements OnInit {

  ngOnDestroy(): void {
    if (this.subcriptions) {
        this.subcriptions.forEach(e => e.unsubscribe());
    }
}
currentUser: Taikhoan;
hoadonxuats: Quanlydonhang[] = [];
isLoading = true;
subcriptions: Subscription[] = [];
chitietHDXs: ChiTietDonHang[] = [];
columnsToDisplay = ['id', 'Hinh', 'idSanPham', 'DonGia', 'SoLuong'];
newTable: ChiTietDonHang[] = [];
orders = {};
constructor(
    private loginService: LoginService,
    private profileSevice: ProfileService
) {}

ngOnInit() {    
    this.loadData();
}
transformTable() {
    this.chitietHDXs.forEach(e => {
        let status = false;
        this.newTable.forEach(item => {
            if (item.idSanPham === e.idSanPham) {
                item.soLuong += e.soLuong;
                status = true;
            }
        });
        if (status === false) {
            const newitem: ChiTietDonHang = new ChiTietDonHang(
              e.id,
              e. soLuong,
              e. donGia,
              e. idDonHang,
              e. idSanPham,
              e. chietKhau,
              e. thanhTien,
              e. created_at,
              e. updated_at,
            );
            this.newTable.push(newitem);
        }
    });
}
loadData() {
    this.currentUser = this.loginService.currentUserValue;
    this.isLoading = true;
    this.subcriptions.push(
        this.profileSevice.ExportOrderObs.subscribe(data => {
            this.orders = this.groupBy(data, 'id');
        })
    );
}
groupBy(array, prop) {
    return array.reduce((groups, item) => {
        const val = item[prop];
        groups[val] = groups[val] || [];
        groups[val].push(item);
        return groups;
    }, {});
}

}
