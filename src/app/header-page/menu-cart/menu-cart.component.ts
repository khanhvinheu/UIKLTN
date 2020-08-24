import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment.prod';
import { Cart } from 'src/app/models/cart';
import { Subscription } from 'rxjs';
import { Sanpham } from 'src/app/models/sanpham';
import { CartService } from 'src/app/admin/service/cart.service';
import { HomePageService } from 'src/app/admin/service/home-page.service';

@Component({
  selector: 'app-menu-cart',
  templateUrl: './menu-cart.component.html',
  styleUrls: ['./menu-cart.component.sass']
})
export class MenuCartComponent implements OnInit {

  ngOnDestroy(): void {
    if (this.subscriptions) {
        this.subscriptions.forEach(e => e.unsubscribe());
    }
}
api_url = environment.api_img;
carts: Cart[] = [];
subscriptions: Subscription[] = [];
sanphams: Sanpham[] = [];
constructor(
    private cartService: CartService,
    private homePageService: HomePageService
) {}
ngOnInit() {
    this.homePageService.FetchProduct();
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
                this.carts = data;
            },
            err => {}
        )
    );
}
findSanPham(idsanpham: number) {
    if (this.sanphams) {
        return this.sanphams.filter(e => {
            return e.id === idsanpham;
        })[0];
    } else {
        return null;
    }
}
loadthanhtien() {
    if (this.sanphams) {
        const sumTotal = this.carts.reduce((total, item) => {
            const obj = this.findSanPham(item.idSanPham);
            return obj
                ? (total += obj.gia  * item.SoLuong) -(obj.gia  * item.SoLuong * obj.chietKhau)/100
                : 0;
        }, 0);
        if (this.cartService.totalSubject.value !== sumTotal) {
            this.cartService.totalSubject.next(sumTotal);
        }

        return sumTotal;
    } else {
        if (this.cartService.totalSubject.value !== 0) {
            this.cartService.totalSubject.next(0);
        }
        return 0;
    }
}


}
