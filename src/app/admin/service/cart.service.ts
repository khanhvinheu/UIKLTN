import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ThongbaoService } from './thongbao.service';
import { Cart } from 'src/app/models/cart';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private counts = 0;
    private carts: Cart[] = [];
    private total = 0;
    public cartSubject: BehaviorSubject<Cart[]>;
    public currentCart: Observable<Cart[]>;
    public countSubject: BehaviorSubject<number>;
    public currentCount: Observable<number>;
    public totalSubject: BehaviorSubject<number>;
    public currentTotal: Observable<number>;
    public totalSub: BehaviorSubject<number>;
    public totalObs: Observable<number>;

    constructor(public thongbaoService: ThongbaoService) {
        this.cartSubject = new BehaviorSubject<Cart[]>(this.carts);
        this.currentCart = this.cartSubject.asObservable();
        this.countSubject = new BehaviorSubject<number>(this.counts);
        this.currentCount = this.countSubject.asObservable();
        this.totalSubject = new BehaviorSubject<number>(this.total);
        this.currentTotal = this.totalSubject.asObservable();
        this.totalSub = new BehaviorSubject<number>(0);
        this.totalObs = this.totalSub.asObservable();
        this.loadData();
    }
    getCurrentCount() {
        return this.countSubject.value;
    }
    getCurrentTotal() {
        return this.totalSubject.value;
    }
    loadAnother() {
        this.counts = 0;
        this.total = 0;
        this.carts.forEach(e => {
            this.counts = this.counts + Number.parseInt(e.SoLuong + '');
        });
        this.countSubject.next(this.counts);
        this.totalSubject.next(this.total);
    }
    loadData() {
        if (localStorage.getItem('cart')) {
            this.carts = JSON.parse(localStorage.getItem('cart')).slice();
            this.cartSubject.next(this.carts);
            this.loadAnother();
        }
    }
    updateCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        this.cartSubject.next(cart);
        this.counts = 0;
        cart.forEach(e => {
            this.counts = this.counts + Number.parseInt(e.SoLuong + '');
        });
        this.countSubject.next(this.counts);
    }
    updateItem(item) {
        const index = this.carts.findIndex(e => e.idSanPham === item.id);
        this.carts[index] = item.SoLuong;
        localStorage.setItem('cart', JSON.stringify(this.carts));
        this.cartSubject.next(this.carts);
        this.counts = 0;
        this.carts.forEach(e => {
            this.counts = this.counts + Number.parseInt(e.SoLuong + '');
        });
        this.countSubject.next(this.counts);
    }
    check_dieukien(cart: Cart) {
        if (cart.SoLuong > 0 && cart.SoLuong <= 10) {
            this.carts.push(cart);
        } else {
            cart.SoLuong = 10;
            this.carts.push(cart);
        }
    }
    addCart(cart: Cart) {
        if (localStorage.getItem('cart') == null) {
            this.check_dieukien(cart);
        } else {
            let index = -1;
            this.carts.forEach((e, i) => {
                if (e.idSanPham === cart.idSanPham) {
                    index = i;
                }
            });
            if (index === -1) {
                this.check_dieukien(cart);
            } else {
                if (
                    this.carts[index].SoLuong + cart.SoLuong > 0 &&
                    this.carts[index].SoLuong + cart.SoLuong <= 10                    
                ) {
                    this.carts[index].SoLuong = this.carts[index].SoLuong + cart.SoLuong;                                   
                }               
                else {
                    this.carts[index].SoLuong = 10;
                    this.thongbaoService.open(
                        'Sản phẩm đã hết! Vui lòng chọn sản phẩm khác ',
                        'bg-danger'
                    ) 
                }
            }
        }
        this.cartSubject.next(this.carts);
        localStorage.setItem('cart', JSON.stringify(this.carts));
        this.loadAnother();
    }
    removeCart(item: Cart) {
        this.carts = this.carts.filter(data => {
            return item.idSanPham !== data.idSanPham;
        });
        this.cartSubject.next(this.carts);
        localStorage.setItem('cart', JSON.stringify(this.carts));
        this.loadAnother();
    }
    clearCart() {
        this.carts = [];
        this.cartSubject.next(this.carts);
        localStorage.setItem('cart', JSON.stringify(this.carts));
        this.loadAnother();
    }
}
