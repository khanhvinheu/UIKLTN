import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { DanhMuc } from '../models/danhmuc';
import { DanhmucService } from '../admin/service/danhmuc.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingService } from '../admin/service/loading.service';
import { OtherService } from '../admin/service/other.service';
import { environment } from '../environments/environment.prod';
import { Sanpham } from '../models/sanpham';
import { Nhacungcap } from '../models/nhacungcap';
import { FilterService } from '../admin/service/filter.service';
import { NhacungcapService } from '../admin/service/nhacungcap.service';
import { HomePageService } from '../admin/service/home-page.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.sass']
})
export class PageComponent implements OnInit,OnDestroy {
  @ViewChild('MatExpansionPanel', { static: true })
    _matExpansionPanel: MatExpansionPanel;
    subscriptions: Subscription[] = [];
    opened = true;
    opened_filter = true;
    danhmucs: DanhMuc[] = [];
    loading = false;
    api_url = environment.api_img;

    iddanhmuc: number;
    array_filter: number[] = [];
    sanphams: Sanpham[] = [];
    sort1: any;
    array_filter_hang: number[] = [];
    sort_gia: number;
    checked = false;
    nhacungcaps: Nhacungcap[] = [];
    constructor(
        private otherService: OtherService,
        private danhmucService: DanhmucService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private loadingService: LoadingService,     
    
        private filterService: FilterService,
        private nhaccungcapService: NhacungcapService,     
        private homePageService: HomePageService
    ) {}
    ngOnInit() {
        this.nhaccungcapService.getAll();
        this.danhmucService.getAll();
        this.loadData();      
    }
    
    loadData() {
        this.subscriptions.push(
            this.otherService.showmenuObser.subscribe(data => {
                this.opened = !this.opened;
               
            }),
            this.otherService.show_filter_obser.subscribe(data => {
                this.opened_filter = !this.opened_filter;
              
            }),
            this.danhmucService.itemsObs.subscribe(
                data => {
                    this.danhmucs = data
                        .filter(e => {
                            return e.danhMuccha == null;
                        })
                        .slice(0, 8);
                },
                err => {}
            ),
            this.homePageService.ProductObs.subscribe(data => {
                this.sanphams = data.slice();
            }),            
            this.nhaccungcapService.itemsObs.subscribe(data => {
               // this.nhacungcaps = data;           
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
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => e.unsubscribe());
        }
    }
    getsub_danhmuc(id: number, sl: number) {
        let dm;
        this.danhmucService.itemsObs.subscribe(data => {
            dm = data
                .filter(e => {
                    return e.danhMuccha === id;
                })
                .slice(0, sl);
        });
        return dm;
    }
    onClickDanhMuc(e) {
        this.otherService.toggle_showmenu();
        this.router.navigate(['/search'], { queryParams: { cat: e.id } });
    }
    expandPanel(event): void {
        event.stopPropagation(); // Preventing event bubbling
    }    

    onDeactivate() {
        // var el = document.getElementById('my_content')
        // el.scrollTop = 0
        document.body.scrollTop = 0;
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
}

