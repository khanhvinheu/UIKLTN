import { OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

// import { DanhGia } from '../models/danhgia';
import { DanhMuc } from '../models/danhmuc';
import { DanhMucHinh } from '../models/danhmuchinh';
// import { DiaDiem } from '../models/diadiem';
// import { HoaDonNhap } from '../models/hoadonnhap';
// import { HoaDonXuat } from '../models/hoadonxuat';

// import { NhaSanXuat } from '../models/nhasanxuat';
import { Quyen } from '../models/quyen';
import { Sanpham } from '../models/sanpham';

// import { DataService } from '../services/data.service';
import { Nhacungcap } from '../models/nhacungcap';
import { Khuyenmai } from '../models/khuyenmai';
import { Taikhoan } from '../models/taikhoan';
import { Chitietkhuyenmai } from '../models/chitietkhuyenmai';
import { DataService } from '../admin/service/data.service';

export class MyHelper implements OnInit, OnDestroy {
    isLoading = false;
    subscriptions: Subscription[] = [];
    sanphams: Sanpham[] = [];
    users: Taikhoan[] = [];
    nhacungcaps: Nhacungcap[] = [];
    // nhasanxuats: NhaSanXuat[] = [];
    danhmucs: DanhMuc[] = [];
    khuyenmais: Khuyenmai[] = [];
    chitietkhuyenmais: Chitietkhuyenmai[] = [];
    danhmuchinhs: DanhMucHinh[] = [];
    quyens: Quyen[] = [];
    // danhgias: DanhGia[] = [];
    // hoadonnhaps: HoaDonNhap[] = [];
    // hoadonxuats: HoaDonXuat[] = [];
    // diadiems: DiaDiem[] = [];
    is_loading_subject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        true
    );
    is_loading_obs: Observable<boolean>;
    constructor(private dataService: DataService) {
        this.is_loading_obs = this.is_loading_subject.asObservable();
        this.dataService.isLoadedSubject.next(true);
        this.is_loading_subject.next(false);
    }
    ngOnInit(): void {}
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => e.unsubscribe());
        }
        this.isLoading = false;
    }
    // loaddata() {
    //     this.subscriptions.push(
    //         this.dataService.getAll().subscribe(
    //             data => {
    //                 if (data) {
    //                     // this.nhacungcapService.set_NCC_subject(data['nhacungcap'])
    //                     // this.nhasanxuatService.set_NSX_subject(data['nhasanxuat'])
    //                     // this.danhgiaService.danhgiaSubject.next(data['danhgia'])
    //                     // this.danhmucService.danhmucSubject.next(data['danhmuc'])
    //                     // this.danhmuchinhService.set_dmhinh_subject(data['danhmuchinh'])
    //                     // this.diadiemService.DiaDiemSubject.next(data['diadiem'])
    //                     // this.hoadonnhapService.HoaDonNhapSubject.next(data['hoadonnhap'])
    //                     // this.hoadonxuatService.HoaDonXuatSubject.next(data['hoadonxuat'])
    //                     // this.chitiethoadonnhapService.ChiTietHoaDonNhapSubject.next(data['chitiethoadonnhap'])
    //                     // this.chitiethoadonxuatService.ChiTietHoaDonXuatSubject.next(data['chitiethoadonxuat'])
    //                     // this.chitietkhuyenmaiService.chitietkhuyenmaiSubject.next(data['chitietkhuyenmai'])
    //                     // this.khuyenmaiService.khuyenmaiSubject.next(data['khuyenmai'])
    //                     // this.quyenService.quyenSubject.next(data['quyen'])
    //                     // this.trangthaiService.TrangThaiSubject.next(data['trangthai'])
    //                     // this.userService.userSubject.next(data['user'])
    //                     // this.sanphamService.set_sanpham_subject(data['sanpham'])
    //                     // this.passwordResetService.set_subject(data['password_reset'])
    //                     // this.dataService.isLoadedSubject.next(true)
    //                     // this.is_loading_subject.next(false)
    //                 }
    //             },
    //             err => {},
    //             () => {}
    //         )
    //     );
    // }
}
