import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { LoginService } from '../admin/service/login.service';
import { TaikhoanService } from '../admin/service/taikhoan.service';
import { Taikhoan } from '../models/taikhoan';
import { Subscription } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { QuanlysdonhangService } from '../admin/service/quanlydonhang.service';
import { Quanlydonhang } from '../models/quanlydonhang';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.sass']
})
export class HeaderAdminComponent implements OnInit {
  api_url = environment.api_img;
  subscriptions: Subscription[] = [];
  currentUser: Taikhoan;
  hoadonxuats: Quanlydonhang[] = [];
  count = 0;
  mobileQuery: MediaQueryList;
  menu=[];
  fillerNav = [      
      { name: 'Bảng điều khiển', link: 'dashboard' ,quyen:2},
      // { name: 'Phân quyền', link: 'phanquyen' },
      { name: 'Báo cáo', link: 'baocao' ,quyen:2},
      { name: 'Tài Khoản', link: 'taikhoan' ,quyen:1},
      { name: 'Nhà Cung Cấp', link: 'nhacungcap' ,quyen:1},
      { name: 'Nhà Sản Xuất', link: 'nhasanxuat', quyen:1 },
      { name: 'Danh Mục', link: 'danhmuc' ,quyen:1},
      { name: 'Danh mục hình', link: 'danhmuchinh' ,quyen:2},
      { name: 'Sản phẩm', link: 'sanpham' ,quyen:2},
      { name: 'Khuyến mãi', link: 'khuyenmai' ,quyen:1},
      { name: 'Chi tiết khuyến mãi', link: 'chitietkhuyenmai' ,quyen:2},
      { name: 'Quyền', link: 'quyen' ,quyen:1},
      { name: 'Đánh giá', link: 'danhgia',quyen: 1},
      // { name: 'Hóa đơn nhập', link: 'hoadonnhap' },
      { name: 'Quản lý đơn hàng', link: 'quanlydonhang' ,quyen:2},
      // { name: 'Địa điểm', link: 'login' ,quyen:2},
      // { name: 'Trạng Thái', link: 'trangthai' },
      { name: 'Phương thức thanh toán', link: 'pttt',quyen:1},
  ];
  _mobileQueryListener: () => void;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private loginService: LoginService,
    private router: Router, 
    private hoadonxuatService: QuanlysdonhangService,
    private taikhoanService: TaikhoanService 
   
  ) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
      this.taikhoanService.getAll();
    
  }
  ngOnInit(): void {
    this.subscriptions.push(
      this.loginService.currentUser.subscribe(data => {
          this.currentUser = data;
      }),
      this.hoadonxuatService.itemsObs.subscribe(data => {
          this.hoadonxuats = data;
          this.count = this.hoadonxuats.filter(
              e => e.idTrangthai === 1
          ).length;
      })
    );
    if(JSON.parse(localStorage.getItem('currentUser'))['idQuyen']==1){
      this.menu=this.fillerNav.filter(e=>e.quyen==1 || e.quyen==2 );
    }
    else{
      this.menu=this.fillerNav.filter(e=>e.quyen==2 );
    }
  }
  ngOnDestroy(): void {
    
  }
  onLogout() {
      this.loginService.logout();
      this.router.navigate(['/']);
  }
  getCountDH() {
       return this.count;
  }

}
