import { Component, OnInit } from '@angular/core';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { Sanpham } from '../models/sanpham';
import { Subscription } from 'rxjs';
import { DanhMuc } from '../models/danhmuc';
import { Taikhoan } from '../models/taikhoan';
import { DataService } from '../admin/service/data.service';
import { DanhmucService } from '../admin/service/danhmuc.service';
import { LoginService } from '../admin/service/login.service';
import { DialogService } from '../admin/service/dialog.service';
import { CartService } from '../admin/service/cart.service';
import { HomePageService } from '../admin/service/home-page.service';
import { environment } from '../environments/environment.prod';
import { NhacungcapService } from '../admin/service/nhacungcap.service';
import { Nhacungcap } from '../models/nhacungcap';
import { OtherService } from '../admin/service/other.service';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.sass']
})
export class HeaderPageComponent implements OnInit { 
  api_url = environment.api_img;
  ngOnDestroy(): void {
      if (this.subscriptions) {
          this.subscriptions.forEach(e => e.unsubscribe());
      }
  }
  //  keyword: string = this.activatedRoute.queryParams.source['value']['keyword']
  input_tim: string;
  opened: boolean;
  dataSourceSanPham: Sanpham[] = [];
  sanphams: Sanpham[] = [];
  isShow = false;
  showmenu = true;
  subscriptions: Subscription[] = [];
  countCarts = 0;
  danhmucs: DanhMuc[] = [];
  isloaded = false;
  currentUser: Taikhoan;
  nhacungcap:Nhacungcap[];
  trangThaincc;
  constructor(
      private cartService: CartService,
      private dataService: DataService,
      private danhmucService: DanhmucService,
      private activatedRoute: ActivatedRoute,
      private loginService: LoginService,
      private homePageService: HomePageService,
      private dialogService: DialogService,
      private router: Router, 
      private nhacungcapService:NhacungcapService,
      private otherService: OtherService
  ) {
      if (this.activatedRoute.snapshot.children[0].routeConfig.path === '') {
          this.showmenu = true;
      }
  }

  ngOnInit() {        
      this.loadData(); 

            
  }
  onClickDanhMuc(e) {
      this.router.navigate(['/search'], { queryParams: { cat: e.id } });
  }
  loadData() {
      this.subscriptions.push(
          this.cartService.currentCount.subscribe(
              data => {
                  this.countCarts = data;
              },
              err => {}
          ),
          this.dataService.currentIsLoaded.subscribe(
              data => {
                  this.isloaded = data;
              },
              err => {}
          ),
          this.danhmucService.itemsObs.subscribe(
              data => {
                  this.danhmucs = data
                      .filter(e => {
                          return e.danhMuccha == null;
                      })
                      .slice(0, 8);
              },
              err => {}
          ),
          this.dataService.getIsShow().subscribe(
              data => {
                  this.isShow = data;
              },
              err => {}
          ),
          this.loginService.currentUser.subscribe(
              data => {
                  this.currentUser = data;
              },
              err => {}  
          ),
          this.homePageService.ProductObs.subscribe(data => {
              this.sanphams = data.slice();
              this.dataSourceSanPham = this.sanphams;
          }),
          this.activatedRoute.queryParamMap.subscribe(data => {
              this.input_tim = data['params']['keyword'];
          }),
          this.nhacungcapService.itemsObs.subscribe(data=>{
            //this.nhacungcap=data;
            if (data && data.length > 0) {
              //this.is_loading = false;
              this.nhacungcap = data.slice();                
            }
          })  
          
      );
  }
  applyFilterAdd(filterValue: string) {
      debounceTime(300);
      this.dataSourceSanPham = this.sanphams
          .filter(e => {
              return this.cleanAccents(
                  e.tenSanpham.trim()
                      .toLowerCase()
                      .replace(' ', '')
              ).includes(
                  this.cleanAccents(
                      filterValue
                          .trim()
                          .toLowerCase()
                          .replace(' ', '')
                  )
              );
          })
          .slice();
  }
  public cleanAccents(str: string) {
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
      str = str.replace(/đ/g, 'd');
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
      str = str.replace(/Đ/g, 'D');
      str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // huyền, sắc, hỏi, ngã, nặng
      str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // mũ â (ê), mũ ă, mũ ơ (ư)
      return str;
  }
  getsub_danhmuc(id: number, sl: number) {
      let dm;
      this.danhmucService.itemsObs.subscribe(data => {
          dm = data
              .filter(e => {
                  return e.danhMuccha === id;
              })
              .slice(0, sl);
      });
      return dm;
  }
  onHoverDanhMuc() {}
  onLogout() {
      this.loginService.logout();
  }
  onDangNhap() {
       this.dialogService.showDangNhap();
  }
  onDangKy() {
       this.dialogService.showDangKy();
  }
  onSearch() {
      const navigationExtras: NavigationExtras = {
          queryParams: { keyword: this.input_tim }
      };
      this.router.navigate(['search'], navigationExtras);
  }
  onShowMenu() {
       this.otherService.toggle_showmenu();
  }
  onDknhacungcap(){
      this.dialogService.showDangkynhacungcap();
  }

}
