import { Component, OnInit, ViewChild } from '@angular/core';
import { DanhgiaComponent } from './danhgia/danhgia.component';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailService } from 'src/app/admin/service/product-detail.service';
import { LoginService } from 'src/app/admin/service/login.service';
import { Subscription } from 'rxjs';
import { DanhMucHinh } from 'src/app/models/danhmuchinh';
import { Sanpham } from 'src/app/models/sanpham';
import { Taikhoan } from 'src/app/models/taikhoan';
import { environment } from 'src/app/environments/environment.prod';
import { debounceTime } from 'rxjs/operators';
import { CartService } from 'src/app/admin/service/cart.service';
import { Cart } from 'src/app/models/cart';
import { ThongbaoService } from 'src/app/admin/service/thongbao.service';

@Component({
  selector: 'app-chitietsanpham',
  templateUrl: './chitietsanpham.component.html',
  styleUrls: ['./chitietsanpham.component.sass']
})
export class ChitietsanphamComponent implements OnInit {
  textShow = false;
  api_url = environment.api_img;
  soluong = 1;
  currentUser: Taikhoan = null;
  currentHinh = '';
  product: Sanpham;
  hinhs: DanhMucHinh[] = [];
  subscriptions: Subscription[] = [];
  slideConfig = {
      infinite: false,
      vertical: true,
      verticalSwiping: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      swipe: true,
      touchMove: true,
      nextArrow: '.next',
      prevArrow: '.prev',
      responsive: [
          {
              breakpoint: 768,
              settings: {
                  vertical: false,
                  verticalSwiping: false,
                  slidesToShow: 4,
                  dot: true
              }
          }
      ]
  };
  @ViewChild(DanhgiaComponent, { static: true })
  danhgia_com: DanhgiaComponent;
  constructor(
      private activatedRoute: ActivatedRoute,
      private cartService: CartService,
      private productdetailService: ProductDetailService,
      private loginService: LoginService,
      private thongbaoService: ThongbaoService
  ) {}
  ngOnInit() {
      this.loadData();
  }
  ngOnDestroy(): void {
      if (this.subscriptions) {
          this.subscriptions.forEach(e => {
              e.unsubscribe();
          });
      }
  }
  onPlus() {
      if (this.soluong < 10) {
          this.soluong++;
      }
  }
  onMinus() {
      if (this.soluong > 1) {
          this.soluong--;
      }
  }
  loadData() {
      this.subscriptions.push(
          this.productdetailService.ProductDetailObs.subscribe(data => {
              if (data) {
                  this.product = data;
                  this.currentHinh = this.product.hinhAnh;
              }
          }),
          this.loginService.currentUser.subscribe(data => {
              this.currentUser = data;
              if (this.currentUser) {
                  this.productdetailService.checkBill(
                      this.currentUser.id,
                      this.activatedRoute.params['value'].id
                  );
              }
          }),
          this.activatedRoute.params.subscribe(data => {
              this.productdetailService.FetchProduct(
                  this.activatedRoute.params['value'].id
              );
              if (this.currentUser) {
                  this.productdetailService.checkBill(
                      this.currentUser.id,
                      this.activatedRoute.params['value'].id
                  );
              }
              document.body.scrollTop = 0;
          }),
          this.productdetailService.ImageDetailObs.subscribe(data => {
              if (data) {
                  this.hinhs = data;
              }
          }),
          this.loginService.currentUser.subscribe(data => {})
      );
  }
  onChangeHinh(e) {
      debounceTime(400);
      this.currentHinh = e.hinhAnh;
  }
  onAddCart(sp: Sanpham) {
      if(sp.soLuong>0){
          this.cartService.addCart(new Cart(sp.id, this.soluong));
          this.thongbaoService.open(
            'Đã thêm sản phẩm vào giỏ hàng thành công',
            'bg-success'
        )
      }
      else{
        this.thongbaoService.open(
            'Sản phẩm đã hết! Vui lòng chọn sản phẩm khác',
            'bg-danger'
        )
      }
  }

}
