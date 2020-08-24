import { Component, OnInit, ViewChild } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { MatTableDataSource } from '@angular/material/table';
import { Sanpham } from 'src/app/models/sanpham';
import { HomePageService } from 'src/app/admin/service/home-page.service';
import { OtherService } from 'src/app/admin/service/other.service';
import { FilterService } from 'src/app/admin/service/filter.service';
import { ActivatedRoute } from '@angular/router';
import { DanhmucService } from 'src/app/admin/service/danhmuc.service';
import { CartService } from 'src/app/admin/service/cart.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Chitietkhuyenmai } from 'src/app/models/chitietkhuyenmai';
import { Khuyenmai } from 'src/app/models/khuyenmai';
import { DanhMuc } from 'src/app/models/danhmuc';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/app/environments/environment.prod';
import { ThongbaoService } from 'src/app/admin/service/thongbao.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  api_url = environment.api_img;
  show_filter = false;
  cleanAccents(str: string) {
      if (str === '' || str === undefined) {
          return str;
      }
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
      // Combining Diacritical Marks
      str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // huyền, sắc, hỏi, ngã, nặng
      str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // mũ â (ê), mũ ă, mũ ơ (ư)
      str = str.replace(' ', '');
      str = str.replace('%20', '');
      str = str.trim().toLowerCase();
      return str;
  }
  keyword = '';
  sortby = '';
  cat: string[] = [];
  my_array: number[] = [];
  nsx: any[] = [];
  hangsanxuat: any []=[];
  price: number;
  dataSource;
  isShow = false;
  subscriptions: Subscription[] = [];
  sanphamall: Sanpham[] = [];
  products: Sanpham[] = [];
  productall: Sanpham[] = [];
  sanphams: Sanpham[] = [];
  danhmucs: DanhMuc[] = [];
  //chitietHDNs: ChiTietHoaDonNhap[] = [];
  //chitietHDXs: ChiTietHoaDonXuat[] = [];
  khuyenmais: Khuyenmai[] = [];
  chitietkhuyenmais: Chitietkhuyenmai[] = [];
  obs: Observable<any>;
  spSubject: BehaviorSubject<Sanpham[]>;
  constructor(
      private cartService: CartService,
      private danhmucService: DanhmucService,
      private activatedRoute: ActivatedRoute,
      private filterService: FilterService,
      private otherService: OtherService,
      private homepageService: HomePageService,
      private thongbaoService: ThongbaoService
  ) {}

  ngOnInit() {
      this.keyword = this.activatedRoute.queryParamMap.source['value'][
          'keyword'
      ];
      this.loadData();
  }
  toggleMenu() {
      this.otherService.toggle_showfilter();
  }
  getBreadcrum() {
      if (this.activatedRoute.url['value'][0]) {
          return this.activatedRoute.url['value'][0].path;
      }
  }
  // applyFilter() {
  //     return this.sanphamall.filter(e => {
  //         return this.cleanAccents(e.TenSanPham).includes(this.cleanAccents(this.keyword))
  //     })
  // }
  findChildDeQuy_danhmuc(id: number, array: number[]) {
      array.push(Number.parseInt(id + ''));
      this.danhmucs.forEach(element => {
          if (element.danhMuccha === Number.parseInt(id + '')) {
              this.findChildDeQuy_danhmuc(element.id, array);
          }
      });
  }
  private myFilter(items: Sanpham[]) {
      if (this.my_array.length !== 0) {
          items = items.filter(e => {
              return (
                  this.my_array.filter(i => {
                      return (
                          Number.parseInt(e.idDanhMuc + '') ===
                          Number.parseInt(i + '')
                      );
                  }).length > 0
              );
          });
      }

      if (
          typeof this.nsx !== 'undefined' &&
          this.nsx !== [] &&
          this.nsx !== undefined
      ) {
          if (this.nsx.length > 0) {
              items = items.filter(e => {
                  return (
                      this.nsx.filter(i => {
                          return (
                              Number.parseInt(i + '') ===
                              Number.parseInt(e.idNhacungcap + '')
                          );
                      }).length > 0
                  );
              });
          }
      }
      if (
        typeof this.hangsanxuat !== 'undefined' &&
        this.hangsanxuat !== [] &&
        this.hangsanxuat !== undefined
    ) {
        if (this.hangsanxuat.length > 0) {
            items = items.filter(e => {
                return (
                    this.hangsanxuat.filter(i => {
                        return (
                            Number.parseInt(i + '') ===
                            Number.parseInt(e.idNSX + '')
                        );
                    }).length > 0
                );
            });
        }
    }
      if (this.keyword !== '' && this.keyword !== undefined) {
          items = items.filter(e => {
              return this.cleanAccents(
                  e.tenSanpham.trim().toLowerCase()
              ).includes(this.cleanAccents(this.keyword));
          });
      }
      if (this.sortby !== '') {
          if (this.sortby === '1') {
              items = items.sort((a, b) => {
                  if (
                      a.tenSanpham.toLowerCase() < b.tenSanpham.toLowerCase()
                  ) {
                      return -1;
                  }
                  if (
                      a.tenSanpham.toLowerCase() > b.tenSanpham.toLowerCase()
                  ) {
                      return 1;
                  }
                  return 0;
              });
          }
          if (this.sortby === '2') {
              items = items.sort((a, b) => {
                  if (
                      a.tenSanpham.toLowerCase() < b.tenSanpham.toLowerCase()
                  ) {
                      return 1;
                  }
                  if (
                      a.tenSanpham.toLowerCase() > b.tenSanpham.toLowerCase()
                  ) {
                      return -1;
                  }
                  return 0;
              });
          }
          if (this.sortby === '3') {
              items = items.sort((a, b) => {
                  return a.id - b.id;
              });
          }
          if (this.sortby === '4') {
              items = items.sort((a, b) => {
                  return b.id - a.id;
              });
          }
      }
      if (this.price !== undefined) {
          if (this.price === 1) {
              items = items.filter(e => {
                  //return e.price * (1 - e.rate) < 1000000;
                  return e.gia<1000000;
              });
          }
          if (this.price === 2) {
              items = items.filter(e => {
                  return (
                      //e.price * (1 - e.rate) > 1000000 &&
                     // e.price * (1 - e.rate) < 3000000
                     e.gia >= 1000000 && e.gia < 3000000
                  );
              });
          }
          if (this.price === 3) {
              items = items.filter(e => {
                  //return e.price * (1 - e.rate) > 3000000;
                  return e.gia >= 3000000;
              });
          }
      }
      return items;
  }
  // private myFilter(items: Sanpham[]) {
  //     if (this.my_array.length !== 0) {
  //         items = items.filter(e => {
  //             return (
  //                 this.my_array.filter(i => {
  //                     return (
  //                         Number.parseInt(e.idDanhMuc + '') ===
  //                         Number.parseInt(i + '')
  //                     );
  //                 }).length > 0
  //             );
  //         });
  //     }

  //     if (
  //         typeof this.nsx !== 'undefined' &&
  //         this.nsx !== [] &&
  //         this.nsx !== undefined
  //     ) {
  //         if (this.nsx.length > 0) {
  //             items = items.filter(e => {
  //                 return (
  //                     this.nsx.filter(i => {
  //                         return (
  //                             Number.parseInt(i + '') ===
  //                             Number.parseInt(e.idNSX + '')
  //                         );
  //                     }).length > 0
  //                 );
  //             });
  //         }
  //     }

  //     if (this.keyword !== '' && this.keyword !== undefined) {
  //         items = items.filter(e => {
  //             return this.cleanAccents(
  //                 e.TenSanPham.trim().toLowerCase()
  //             ).includes(this.cleanAccents(this.keyword));
  //         });
  //     }

  //     if (this.sortby !== '') {
  //         if (this.sortby === '1') {
  //             items = items.sort((a, b) => {
  //                 if (
  //                     a.TenSanPham.toLowerCase() < b.TenSanPham.toLowerCase()
  //                 ) {
  //                     return -1;
  //                 }
  //                 if (
  //                     a.TenSanPham.toLowerCase() > b.TenSanPham.toLowerCase()
  //                 ) {
  //                     return 1;
  //                 }
  //                 return 0;
  //             });
  //         }
  //         if (this.sortby === '2') {
  //             items = items.sort((a, b) => {
  //                 if (
  //                     a.TenSanPham.toLowerCase() < b.TenSanPham.toLowerCase()
  //                 ) {
  //                     return 1;
  //                 }
  //                 if (
  //                     a.TenSanPham.toLowerCase() > b.TenSanPham.toLowerCase()
  //                 ) {
  //                     return -1;
  //                 }
  //                 return 0;
  //             });
  //         }
  //         if (this.sortby === '3') {
  //             items = items.sort((a, b) => {
  //                 return a.id - b.id;
  //             });
  //         }
  //         if (this.sortby === '4') {
  //             items = items.sort((a, b) => {
  //                 return b.id - a.id;
  //             });
  //         }
  //     }
  //     if (this.price !== undefined) {
  //         if (this.price === 1) {
  //             items = items.filter(e => {
  //                 return (
  //                     this.getbanggia(e.id) &&
  //                     this.getbanggia(e.id).GiaBan * this.getTiLe(e.id) <
  //                         1000000
  //                 );
  //             });
  //         }
  //         if (this.price === 2) {
  //             items = items.filter(e => {
  //                 return (
  //                     this.getbanggia(e.id) &&
  //                     this.getbanggia(e.id).GiaBan * this.getTiLe(e.id) >
  //                         1000000 &&
  //                     this.getbanggia(e.id) &&
  //                     this.getbanggia(e.id).GiaBan * this.getTiLe(e.id) <
  //                         3000000
  //                 );
  //             });
  //         }
  //         if (this.price === 3) {
  //             items = items.filter(e => {
  //                 return (
  //                     this.getbanggia(e.id) &&
  //                     this.getbanggia(e.id).GiaBan * this.getTiLe(e.id) >
  //                         3000000
  //                 );
  //             });
  //         }
  //     }
  //     return items;
  // }
  ngOnDestroy() {
      if (this.subscriptions) {
          this.subscriptions.forEach(e => {
              e.unsubscribe();
          });
      }
  }
  loadData() {
      this.isShow = false;
      this.subscriptions.push(
          this.homepageService.ProductObs.subscribe(data => {
              this.productall = data.slice();
              this.load_array();
              this.products = this.myFilter(this.productall.slice());
              this.dataSource = new MatTableDataSource<Sanpham>(
                  this.products
              );
              this.dataSource.paginator = this.paginator;
              this.obs = this.dataSource.connect();
              if (this.obs['value'].length > 0) {
                  this.isShow = true;
              }
          }),
          this.danhmucService.itemsObs.subscribe(data => {
              this.danhmucs = data;
          }),
          // this.filterService.currentFilter.subscribe(data => {
          //     this.sanphams = data;
          // }),
          this.activatedRoute.queryParamMap.subscribe(data => {
              this.cat = [];
              this.nsx = [];
              if (typeof data['params']['keyword'] === 'string') {
                  this.keyword = data['params']['keyword'];
              }
              if (typeof data['params']['sortBy'] === 'string') {
                  this.sortby = data['params']['sortBy'];
              }
              if (typeof data['params']['cat'] === 'string') {
                  this.cat.push(data['params']['cat']);
              } else {
                  if (typeof data['params']['cat'] === 'object') {
                      data['params']['cat'].map(e => {
                          this.cat.push(e);
                      });
                  }
              }
              if (typeof data['params']['nsx'] === 'string') {
                  this.nsx.push(data['params']['nsx']);
              } else {
                  if (typeof data['params']['nsx'] === 'object') {
                      data['params']['nsx'].map(e => {
                          this.nsx.push(e);
                      });
                  }
              }
              if (typeof data['params']['hangsanxuat'] === 'string') {
                this.hangsanxuat.push(data['params']['hangsanxuat']);
                } else {
                    if (typeof data['params']['hangsanxuat'] === 'object') {
                        data['params']['hangsanxuat'].map(e => {
                            this.hangsanxuat.push(e);
                        });
                    }
                }

              if (typeof data['params']['price'] === 'string') {
                  this.price = Number.parseInt(data['params']['price']);
              }
             
              this.load_array();
              this.products = this.myFilter(this.productall.slice());
              this.dataSource.data = this.products;
          })
      );
  }
  load_array() {
      if (this.cat !== undefined) {
          this.my_array = [];
          this.cat.forEach(e => {
              this.findChildDeQuy_danhmuc(Number.parseInt(e), this.my_array);
          });
      }
  }
  onAddCart(sp) {
    if(sp.soLuong>0){
        this.cartService.addCart(new Cart(sp.id, 1));
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
    //   this.cartService.addCart(new Cart(sp.id, 1));
  }

}
