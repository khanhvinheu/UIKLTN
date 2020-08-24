import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Cart } from 'src/app/models/cart';
import { Subscription } from 'rxjs';
import { Sanpham } from 'src/app/models/sanpham';
import { Khuyenmai } from 'src/app/models/khuyenmai';
import { Chitietkhuyenmai } from 'src/app/models/chitietkhuyenmai';
import { Nhacungcap } from 'src/app/models/nhacungcap';
import { Taikhoan } from 'src/app/models/taikhoan';
import { CartService } from 'src/app/admin/service/cart.service';
import { LoginService } from 'src/app/admin/service/login.service';
import { HomePageService } from 'src/app/admin/service/home-page.service';
import { ThanhtoanService } from 'src/app/admin/service/thanhtoan.service';
import { environment } from 'src/app/environments/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hoanthanhthanhtoan',
  templateUrl: './hoanthanhthanhtoan.component.html',
  styleUrls: ['./hoanthanhthanhtoan.component.sass']
})
export class HoanthanhthanhtoanComponent implements OnInit {

  public api_url = environment.api_img;
  date:any;
  ngOnDestroy(): void {
      if (this.subscriptions) {
          this.subscriptions.forEach(e => e.unsubscribe());
      }
  }
  phuongthucs: string[] = ['COD', 'Thanh toán Online', 'Visa'];
  @Input() frm1;
  @Input() frm2;
  @Output() myClick = new EventEmitter<boolean>();
  currentUser: Taikhoan;
  carts: Cart[] = [];
  subscriptions: Subscription[] = [];
  sanphams: Sanpham[] = [];
  khuyenmais: Khuyenmai[] = [];
  chitietkhuyenmais: Chitietkhuyenmai[] = [];
  nhasanxuats: Nhacungcap[] = [];
  sumTien;
  //chitietHDNs: ChiTietHoaDonNhap[] = [];
  //chitietHDXs: ChiTietHoaDonXuat[] = [];
  private tongtien = 0;
  constructor(
      private cartService: CartService,
      //private diadiemService: DiadiemService,
      private loginService: LoginService,
      private homePageService: HomePageService,
      private thanhtoanService: ThanhtoanService,
      private router: Router
     // private hoadonxuatService: HoadonxuatService,
     // private chitietHDXService: ChitiethoadonxuatService
  ) {}

  ngOnInit() {
      this.loadData();
  }
  loadData() {
      this.subscriptions.push(
          this.homePageService.ProductObs.subscribe(
              data => {
                  this.sanphams = data;
              },
              err => {}
          ),
          this.cartService.currentCart.subscribe(
              data => {
                  this.carts = data;
              },
              err => {}
          ),
          this.loginService.currentUser.subscribe(data => {
              this.currentUser = data;
          })
      );
  }
  findSanPham(idsanpham: number) {
      if (this.sanphams) {
          return this.sanphams.filter(e => {
              return e.id === idsanpham;
          })[0];
      }
           
  }
  loadthanhtien() {
      if (this.sanphams) {
          const sumTotal = this.carts.reduce((total, item) => {
              const obj = this.findSanPham(item.idSanPham);
              return obj
                  ? (total += obj.gia * item.SoLuong)-(obj.gia * item.SoLuong * obj.chietKhau / 100)
                  : 0;
          }, 0);
          this.sumTien=sumTotal;
          return sumTotal;
      } else {
          return 0;
      }
  }
  getDiaChi() {
      // if (this.frm1.idDiaDiem) {
      //     return this.diadiemService.getDiaChi(this.frm1.idDiaDiem);
      // }
      // return null;
  }
  onSubmitThanhToan() {
      if (this.carts) {
          const formData = new FormData();
          formData.append('cart', JSON.stringify(this.carts));
          formData.append('NguoiNhan', this.frm1.NguoiNhan);
          formData.append('DiaChi', this.frm1.DiaChi);
          formData.append('DienThoai', this.frm1.DienThoai);
          formData.append(
              'idTaiKhoan',
              this.currentUser ? this.currentUser.id + '' : ''
          );
          formData.append('idDiaDiem', this.frm1.idDiaDiem);
          formData.append('idTrangthai', '1');
          formData.append('idPhuongthucTT','1');
          formData.append('phiShip','15000');
          this.date=new Date().toISOString();
          formData.append('ngayDat',this.date) ;
          this.thanhtoanService
              .submitOrder(formData)
              .toPromise()
              .then(res => {
                  if (res) {
                      this.cartService.totalSub.next(this.sumTien);
                      this.cartService.clearCart();
                      this.myClick.emit(res['order'].id);
                  }
              });
      }
  }

  onSubmitPayment() {
    if (this.carts) {
        const formData = new FormData();

        formData.append('cart', JSON.stringify(this.carts));
          formData.append('NguoiNhan', this.frm1.NguoiNhan);
          formData.append('DiaChi', this.frm1.DiaChi);
          formData.append('DienThoai', this.frm1.DienThoai);
          formData.append(
              'idTaiKhoan',
              this.currentUser ? this.currentUser.id + '' : ''
          );
          formData.append('idDiaDiem', this.frm1.idDiaDiem);
          formData.append('idTrangthai', '6');
          formData.append('idPhuongthucTT','3');
          formData.append('phiShip','15000');
          this.date=new Date().toISOString();
          formData.append('ngayDat',this.date) ;
          this.thanhtoanService
              .submitOrder(formData)
              .toPromise()
              .then(res => {
                  if (res) {
                      //this.cartService.totalSub.next(res['total'][0]['sum']);
                        this.cartService.clearCart();
                      //this.myClick.emit(res['order'].id);
                        this.router.navigateByUrl('');
                        formData.append('amount', this.sumTien +15000);
                        formData.append('bank_code',"NCB");                                
                        this.thanhtoanService.submitOrderPaymnent(formData);
                  }
              });
       
    }
}

}
