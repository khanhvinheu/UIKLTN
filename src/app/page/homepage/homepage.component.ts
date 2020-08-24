import { Component, OnInit } from '@angular/core';
import { DanhmucService } from 'src/app/admin/service/danhmuc.service';
import { DataService } from 'src/app/admin/service/data.service';
import { HomePageService } from 'src/app/admin/service/home-page.service';
import { environment } from 'src/app/environments/environment.prod';
import { DanhMuc } from 'src/app/models/danhmuc';
import { Sanpham } from 'src/app/models/sanpham';
import { Khuyenmai } from 'src/app/models/khuyenmai';
import { Chitietkhuyenmai } from 'src/app/models/chitietkhuyenmai';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass']
})
export class HomepageComponent implements OnInit {

  constructor(
    private danhmucService: DanhmucService,
    private dataService: DataService,
    private homepageService: HomePageService
) {}
api_url = environment.api_img;
ngOnDestroy(): void {
    if (this.subscriptions) {
        this.subscriptions.forEach((e, index) => {
            e.unsubscribe();
        });
    }
    this.dataService.setIsShow(false);
}
isActive1 = true;
isActive2 = false;
isActive3 = false;
danhmucs: DanhMuc[] = [];
myblocks: DanhMuc[] = [];
sanphams: Sanpham[] = [];
//chitietHDNs: ChiTietHoaDonNhap[] = [];
khuyenmais: Khuyenmai[] = [];
chitietkhuyenmais: Chitietkhuyenmai[] = [];
subscriptions: Subscription[] = [];
optionTab = 1;

ngOnInit() {
    //this.danhmucService.getAll();
    // this.homepageService.FetchProduct();
    //this.homepageService.GetTopSell();
    this.loadData();
}
loadData() {
    this.subscriptions.push(
        this.danhmucService.itemsObs.subscribe(
            data => {
                this.danhmucs = data;
                this.myblocks = this.danhmucs.slice(0, 4);
            },
            err => {}
        )
    );
    this.dataService.setIsShow(true);
}
onClickTab(number: number) {
    if (number === 1) {
        this.isActive1 = true;
        this.isActive2 = false;
        this.isActive3 = false;
    }
    if (number === 2) {
        this.isActive1 = false;
        this.isActive2 = true;
        this.isActive3 = false;
    }
    if (number === 3) {
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = true;
    }
    this.dataService.setIdTab(number);
}

}
