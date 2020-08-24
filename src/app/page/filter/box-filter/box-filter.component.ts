import { Component, OnInit } from '@angular/core';
import { Sanpham } from 'src/app/models/sanpham';
import { Subscription } from 'rxjs';
import { DanhMuc } from 'src/app/models/danhmuc';
import { DanhmucService } from 'src/app/admin/service/danhmuc.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from 'src/app/admin/service/home-page.service';
import { FilterService } from 'src/app/admin/service/filter.service';
import { Nhacungcap } from 'src/app/models/nhacungcap';
import { NhacungcapService } from 'src/app/admin/service/nhacungcap.service';

@Component({
  selector: 'app-box-filter',
  templateUrl: './box-filter.component.html',
  styleUrls: ['./box-filter.component.sass']
})
export class BoxFilterComponent implements OnInit {

  iddanhmuc: number;
  array_filter: number[] = [];
  sanphams: Sanpham[] = [];
  sort1: any;
  array_filter_hang: number[] = [];
  sort_gia: number;
  subscriptions: Subscription[] = [];
  danhmucs: DanhMuc[] = [];
  checked = false;
  nhacungcaps: Nhacungcap[] = [];
  constructor(
      // private sanphamService: SanphamService,
      private danhmucService: DanhmucService,
      private activatedRoute: ActivatedRoute,
      private filterService: FilterService,
      private nhaccungcapService: NhacungcapService,
      private router: Router,
      private homePageService: HomePageService
  ) {}
  ngOnInit() {
      this.nhaccungcapService.getAll();
      this.loadData();
  }
  ngOnDestroy() {
      if (this.subscriptions) {
          this.subscriptions.forEach(e => {
              e.unsubscribe();
          });
      }
  }
  loadData() {
      this.subscriptions.push(
          // this.sanphamService.currentSanpham.subscribe(data => {
          //     this.sanphams = data.slice();
          // }),
          this.homePageService.ProductObs.subscribe(data => {
              this.sanphams = data.slice();
          }),
          this.danhmucService.itemsObs.subscribe(data => {
              this.danhmucs = data;
          }),
          this.nhaccungcapService.itemsObs.subscribe(data => {
              //this.nhacungcaps = data;
              this.nhacungcaps = data.filter(e => {                    
                return e.idQuyen == 2 && Number.parseInt(e.trangThai + '') == 1
            })           
              
          }),
          this.activatedRoute.queryParamMap.subscribe(data => {
              this.sort1 = data['params']['sortBy']
                  ? data['params']['sortBy']
                  : null;
              this.sort_gia = data['params']['price']
                  ? data['params']['price']
                  : null;
              this.array_filter_hang = [];
              if (typeof data['params']['nsx'] === 'object') {
                  data['params']['nsx'].forEach(e => {
                      this.array_filter_hang.push(e);
                  });
              }
              if (typeof data['params']['nsx'] === 'string') {
                  this.array_filter_hang.push(data['params']['nsx']);
              }
          })
      );
  }
  onKiemTra_Hang(item: Nhacungcap) {
      if (this.array_filter_hang.length === 0) {
          return false;
      }
      return this.array_filter_hang.filter(e => {
          return item.id === e;
      }).length > 0
          ? true
          : false;
  }
  getsubdanhmuc(id: number) {
      const mang = [];
      this.findChildDeQuy(id, mang);
      return mang;
  }
  findChildDeQuy(id: number, array: number[]) {
      array.push(Number.parseInt(id + ''));
      this.danhmucs.forEach(element => {
          if (element.danhMuccha === Number.parseInt(id + '')) {
              this.findChildDeQuy(element.id, array);
          }
      });
  }
  findDanhMuc(iddanhmuc: number) {
      if (iddanhmuc === 0) {
          return this.danhmucs.filter(e => {
              return e.danhMuccha == null;
          });
      } else {
          return this.danhmucs.filter(e => {
              return e.danhMuccha === iddanhmuc;
          });
      }
  }
  onChangeSort_param() {
      this.router.navigate(['/search'], {
          queryParams: { sortBy: this.sort1 },
          queryParamsHandling: 'merge'
      });
  }
  onCheck_param(event, id) {
      if (event.checked) {
          this.array_filter.push(id);
      } else {
          this.array_filter = this.array_filter.filter(e => {
              return e !== id;
          });
      }
      this.router.navigate(['/search'], {
          queryParams: { cat: this.array_filter },
          queryParamsHandling: 'merge'
      });
  }
  onCheckedHang_param(event, id) {
      if (event.checked) {
          
          this.array_filter_hang.push(id);
          this.router.navigate(['/search'], {
              queryParams: { nsx: this.array_filter_hang },
              queryParamsHandling: 'merge'
          });
      } else {
          this.array_filter_hang=[];
          this.array_filter_hang = this.array_filter_hang.filter(e => {
              return e !== id;
          });          
          this.router.navigate(['/search'], {
              queryParams: { nsx: this.array_filter_hang },
              queryParamsHandling: 'merge'
          });
      }
  }
  onChangeAll(event, data) {
      this.array_filter = [];
      if (event.checked) {
          data.forEach(e => {
              this.array_filter.push(e.id);
          });
      }
      this.router.navigate(['/search'], {
          queryParams: { cat: this.array_filter },
          queryParamsHandling: 'merge'
      });
  }
  onChangeSort_gia() {
      
      this.router.navigate(['/search'], {
          queryParams: { price: this.sort_gia },
          queryParamsHandling: 'merge'
      });
  } 

  // getbanggia(idsanpham: number): ChiTietHoaDonNhap {
  //     return this.sanphamService.getbanggia(idsanpham);
  // }
  // getTiLe(idsanpham: number): number {
  //     return this.sanphamService.getTiLe(idsanpham);
  // }
}
