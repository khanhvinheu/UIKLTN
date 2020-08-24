import { Component, OnInit } from '@angular/core';
import { DanhGia } from 'src/app/models/danhgia';
import { Rating } from 'src/app/models/rating';
import { Taikhoan } from 'src/app/models/taikhoan';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaikhoanService } from 'src/app/admin/service/taikhoan.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/admin/service/login.service';
import { ProductDetailService } from 'src/app/admin/service/product-detail.service';
import { environment } from 'src/app/environments/environment.prod';

@Component({
  selector: 'app-danhgia',
  templateUrl: './danhgia.component.html',
  styleUrls: ['./danhgia.component.sass']
})
export class DanhgiaComponent implements OnInit {

  api_url = environment.api_img;
    canRate = false;
    currentRate = 0;
    textShow = false;
    currentHinh: string;
    danhgias: DanhGia[] = [];
    ratings: Rating[] = [];
    users: Taikhoan[] = [];
    currentUser: Taikhoan;
    subscriptions: Subscription[] = [];
    frm: FormGroup;
    //chitietHDXs: ChiTietHoaDonXuat[] = [];
    //hoadonxuats: HoaDonXuat[] = [];
    constructor(
        private userService: TaikhoanService,
        private activatedRoute: ActivatedRoute,
        private _formBuilder: FormBuilder,
        private loginService: LoginService,
        private productdetailService: ProductDetailService
    ) {}

    ngOnInit() {
        this.loadData();
        this.createForm();
    }
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => {
                e.unsubscribe();
            });
        }
    }
    createForm() {
        this.frm = this._formBuilder.group({
            NoiDung: [
                '',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(50)
                ]
            ],
            Diem: [this.currentRate, [Validators.required]],
            idSanPham: [this.activatedRoute.params['value'].id],
            idTaikhoan: [this.currentUser ? this.currentUser.id : '']
        });
    }
    onSubmitForm() {
        this.productdetailService.createRating(this.frm.value);
    }
    loadData() {
        this.subscriptions.push(
            this.productdetailService.RatingDetailObs.subscribe(data => {
                if (data) {
                    this.ratings = data;
                }
            }),
            this.activatedRoute.params.subscribe(data => {
                if (this.currentUser) {
                    this.createForm();
                    this.productdetailService.checkBill(
                        this.currentUser ? this.currentUser.id : '',
                        this.activatedRoute.params['value'].id
                    );
                } else {
                    this.productdetailService.CanRateDetailSub.next(false);
                }
            }),
            this.loginService.currentUser.subscribe(data => {
                this.currentUser = data;
                if (this.currentUser) {
                    this.createForm();
                    this.productdetailService.checkBill(
                        this.currentUser.id,
                        this.activatedRoute.params['value'].id
                    );
                }
            }),
            this.productdetailService.CanRateDetailObs.subscribe(data => {
                this.canRate = data;
            }),
            this.userService.currentUser.subscribe(
                data => {
                    this.users = data;
                },
                err => {}
            )
        );
    }
    onDeleteDanhGia(e) {
        this.productdetailService.deleteRating(e);
    }
    duocxoa(item: DanhGia) {
        if (!this.currentUser) {
            return false;
        }
        return item.idTaikhoan === this.currentUser.id;
    }
    get_DiemTrungBinh(): number {
        if (this.ratings && this.ratings.length === 0) {
            return 0;
        }
        const w = this.ratings.reduce((tongdiem, item) => {
            return (tongdiem += item.Diem);
        }, 0);
        return w / this.ratings.length;
    }
    get_CountDanhGia() {
        return this.ratings.length;
    }
    get_TiLeDanhGia(number: number) {
        if (this.ratings.length === 0) {
            return 0;
        }
        const w = this.ratings.filter(e => {
            return e.Diem === number;
        }).length;
        return (w / this.ratings.length) * 100;
    }

}
