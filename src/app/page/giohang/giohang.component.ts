import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { Subscription } from 'rxjs';
import { Sanpham } from 'src/app/models/sanpham';
import { Khuyenmai } from 'src/app/models/khuyenmai';
import { Chitietkhuyenmai } from 'src/app/models/chitietkhuyenmai';
import { CartService } from 'src/app/admin/service/cart.service';
import { HomePageService } from 'src/app/admin/service/home-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-giohang',
  templateUrl: './giohang.component.html',
  styleUrls: ['./giohang.component.sass']
})
export class GiohangComponent implements OnInit {

  ngOnDestroy(): void {
    if (this.subscriptions) {
        this.subscriptions.forEach(e => e.unsubscribe());
    }
}
counts = 0;
carts: Cart[] = [];
subscriptions: Subscription[] = [];
sanphams: Sanpham[] = [];
khuyenmais: Khuyenmai[] = [];
chitietkhuyenmais: Chitietkhuyenmai[] = [];
//nhasanxuats: NhaSanXuat[] = [];
//chitietHDNs: ChiTietHoaDonNhap[] = [];
//chitietHDXs: ChiTietHoaDonXuat[] = [];
constructor(
    private cartService: CartService,
    private homePageService: HomePageService,
    private router: Router
) {}

ngOnInit() {
    this.loadData();
}
loadData() {
    this.subscriptions.push(
        this.homePageService.ProductObs.subscribe(
            data => {
                this.sanphams = data.slice();
            },
            err => {}
        ),
        this.cartService.currentCart.subscribe(
            data => {
                this.carts = data.slice();
            },
            err => {}
        ),
        this.cartService.currentCount.subscribe(data => {
            this.counts = data;
        })
    );
}
loadthanhtien() {
    if (this.sanphams.length > 0) {
        const sumTotal = this.carts.reduce((total, item) => {
            const obj = this.findSanPham(item.idSanPham);
            return obj
                ? (total += obj.gia * item.SoLuong) -(obj.gia * item.SoLuong * obj.chietKhau/100)
                : 0;
        }, 0);
        return sumTotal;
    } else {
        return 0;
    }
}
findSanPham(idsanpham: number) {
    if (this.sanphams) {
        return this.sanphams.filter(e => {
            return e.id === idsanpham;
        })[0];
    }
}
onRemoveCart() {
    this.cartService.clearCart();
}
handleOrder() {
    let error = false;
    this.carts.forEach((item, index) => {
        const i = this.sanphams.findIndex(e => e.id === item.idSanPham);
        if (item.SoLuong > this.sanphams[i].soLuong) {
            if (
                confirm(
                    'sanpham ' +
                        this.sanphams[i].tenSanpham +
                        ' chi con' +
                        this.sanphams[i].soLuong +
                        '! Bạn vẫn muốn mua sản phẩm này ?'
                )
            ) {
                this.carts[index].SoLuong = this.sanphams[i].soLuong;
            } else {
                error = true;
            }
        }
    });
    this.cartService.updateCart(this.carts);
    if (error) {
        return false;
    } else {
        this.router.navigateByUrl('/thanhtoan');
    }
}

}
