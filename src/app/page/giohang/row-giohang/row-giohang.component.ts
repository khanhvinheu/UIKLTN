import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/app/environments/environment.prod';
import { Cart } from 'src/app/models/cart';
import { Subscription } from 'rxjs';
import { Sanpham } from 'src/app/models/sanpham';
import { CartService } from 'src/app/admin/service/cart.service';
import { HomePageService } from 'src/app/admin/service/home-page.service';

@Component({
  selector: 'app-row-giohang',
  templateUrl: './row-giohang.component.html',
  styleUrls: ['./row-giohang.component.sass']
})
export class RowGiohangComponent implements OnInit {

  ngOnDestroy(): void {
    if (this.subscriptions) {
        this.subscriptions.forEach(e => {
            e.unsubscribe();
        });
    }
}
api_url = environment.api_img;
@Input() item: Cart;
soluong: number;
carts: Cart[] = [];
subscriptions: Subscription[] = [];
sanphams: Sanpham[] = [];
constructor(
    private cartService: CartService,
    private homePageService: HomePageService
) {}

ngOnInit() {
    this.homePageService.FetchProduct();
    this.soluong = this.item.SoLuong;
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
        )
    );
}
onChangeInput() {
    if (
        this.item.SoLuong > 10 ||
        this.item.SoLuong < 0 ||
        this.item.SoLuong == null
    ) {
        this.item.SoLuong = 1;
    }
    this.cartService.updateItem(this.item);
}
onPlus() {
    if (this.item.SoLuong < 10) {
        this.item.SoLuong++;
        this.cartService.updateItem(this.item);
    }
}
onMinus() {
    if (this.item.SoLuong > 1) {
        this.item.SoLuong--;
        this.cartService.updateItem(this.item);
    }
}
onDeleteRow(e) {
    this.cartService.removeCart(e);
}
findSanPham(idsanpham: number) {
    if (this.sanphams) {
        return this.sanphams.filter(e => {
            return e.id === idsanpham;
        })[0];
    }
}

}
