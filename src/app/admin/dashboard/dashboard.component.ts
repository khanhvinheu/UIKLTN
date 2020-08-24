import { Component, OnInit } from '@angular/core';
import { TaikhoanService } from '../service/taikhoan.service';
import { DanhmucService } from '../service/danhmuc.service';
import { BaocaoService } from '../service/baocao.service';
import { Subscription } from 'rxjs';
import { QuanlysdonhangService } from '../service/quanlydonhang.service';
import { Quanlydonhang } from 'src/app/models/quanlydonhang';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  constructor(
    private userService: TaikhoanService,
    private hoadonxuatService: QuanlysdonhangService,
    private danhmucService: DanhmucService,
    private baocaoService: BaocaoService
) {}
subscriptions: Subscription[] = [];
hoadonxuats: Quanlydonhang[] = [];
total = 0;
countUser = 0;
countCat = 0;
countHDX = 0;
ngOnInit() {
    this.danhmucService.getAll();
    this.loadData();
}

getDoanhThu() {
    return this.total;
}
loadData() {
    this.subscriptions.push(
        this.baocaoService
            .getDoanhThuTheoThang(new Date())
            .subscribe(data => {
                if (data) {
                    this.total = data['total'];
                }
            }),
        this.userService.currentUser.subscribe(data => {
            this.countUser = data.length;
        }),
        this.danhmucService.itemsObs.subscribe(data => {
            this.countCat = data.length;
        }),
        this.hoadonxuatService.itemsObs.subscribe(data => {
            this.countHDX = data.length;
        })
    );
}
getCountUser() {
    return this.countUser;
}
getCountHDX() {
    return this.countHDX;
}
getCountDM() {
    return this.countCat;
}

}
