import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Quanlydonhang } from 'src/app/models/quanlydonhang';
import { DatePipe } from '@angular/common';
import { BaocaoService } from '../../service/baocao.service';
import { QuanlysdonhangService } from '../../service/quanlydonhang.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chart-doanhthu',
  templateUrl: './chart-doanhthu.component.html',
  styleUrls: ['./chart-doanhthu.component.sass']
})
export class ChartDoanhthuComponent implements OnInit {

    width = '100%';
    height = 400;
    type = 'msspline';
    dataFormat = 'json';
    dataSource;
    thugon = true;
    frmBaoCao1: FormGroup;
    isLoading = false;
    subscriptions: Subscription[] = [];
    hoadonxuats: Quanlydonhang[] = [];
    //hoadonnhaps: HoaDonNhap[] = [];
    data_label: any[] = [];
    month: number;
    year: number;
    lastday: number;
    buocnhay: number;
    donvichia = 1000000;
    dataChart = {
        chart: {
            subcaption: 'Tháng này',
            numdivlines: '3',
            showvalues: '0',
            anchorradius: '4',
            legenditemfontsize: '12',
            legenditemfontbold: '1',
            numbersuffix: 'tr',
            plottooltext: '<b>$dataValue</b> VND - $seriesName - $label',
            theme: 'gammel'
        },
        categories: [
            {
                category: []
            }
        ],
        dataset: [
            {
                seriesname: 'Doanh thu',
                color: '#3f51b5',
                data: []
            },
            {
                seriesname: 'Chi phí',
                color: '#dc3545',
                data: []
            },
            {
                seriesname: 'Lợi nhuận',
                color: '#28a745',
                data: []
            }
        ]
    };
    constructor(
        private hoadonxuatService: QuanlysdonhangService,
       
        private baocaoService: BaocaoService,
        private datePipe: DatePipe,
        private _formBuilder: FormBuilder
    ) {}
    onChangeThang() {
        this.updatedata();
    }
    updatedata() {
        this.lastday = new Date(this.year, this.month + 1, 0).getDate();

        this.loadLabel();

        this.dataChart.categories[0].category = this.data_label;
        this.dataChart.dataset[0].data = this.loadDataDoanhThu();
        this.dataChart.dataset[1].data = this.loadDataChiPhi();
        this.dataChart.dataset[2].data = this.loadDataLoiNhuan();
        this.dataChart.chart.subcaption = 'Tháng ' + (this.month + 1);
        this.dataSource = this.dataChart;
    }
    ngOnInit() {
        this.buocnhay = 1;
        const date = new Date();
        this.year = date.getFullYear();
        this.month = date.getMonth();
        this.loadData();
        this.updatedata();
    }
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => e.unsubscribe());
        }
    }
    loadLabel() {
        const data: any[] = [];
        for (
            let index = 1;
            index <= this.lastday;
            index = index + this.buocnhay
        ) {
            data.push({
                label: this.datePipe.transform(
                    new Date(this.year, this.month, index),
                    'dd/MM'
                )
            });
        }
        this.data_label = data;
    }
    loadDataDoanhThu() {
        const data: any[] = [];
        for (
            let index = 1;
            index <= this.lastday;
            index = index + this.buocnhay
        ) {
            data.push({
                value: this.getDoanhThu_by_day(
                    new Date(this.year, this.month, index)
                )
            });
        }
        return data;
    }
    loadDataChiPhi() {
        const data: any[] = [];
        for (
            let index = 1;
            index <= this.lastday;
            index = index + this.buocnhay
        ) {
            data.push({
                value: this.getChiPhi_by_day(
                    new Date(this.year, this.month, index)
                )
            });
        }
        return data;
    }
    loadDataLoiNhuan() {
        const data: any[] = [];
        for (
            let index = 1;
            index <= this.lastday;
            index = index + this.buocnhay
        ) {
            data.push({
                value: this.getLoiNhuan_by_day(
                    new Date(this.year, this.month, index)
                )
            });
        }
        return data;
    }
    sosanhngay(ngay1: string, ngay2: string) {
        return ngay1 === ngay2 ? true : false;
    }
    loadData() {
        const date = new Date();
        // var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        // var today = new Date(date.getFullYear(), date.getMonth(), date.getDate())
        // var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        this.subscriptions.push(
            this.hoadonxuatService.itemsObs.subscribe(data => {
                this.hoadonxuats = data.slice();
                this.updatedata();
            }),

            // this.hoadonnhapService.itemsObs.subscribe(data => {
            //     this.hoadonnhaps = data.slice();
            //     this.updatedata();
            // })
        );
    }
    getDoanhThu(hd: Quanlydonhang[]) {
        // return this.hoadonxuatService.getDoanhThus(hd);
        return 0;
    }
    getChiPhi(hd: Quanlydonhang[]) {
        // return this.hoadonxuatService.getChiPhis(hd);
        return 0;
    }
    getLoiNhuan(hd: Quanlydonhang[]) {
        // return this.getDoanhThu(hd) - this.getChiPhi(hd);
        return 0;
    }
    getDoanhThu_by_day(ngay: Date) {
        // let hd = this.hoadonxuats.filter(e => {
        //     return (
        //         this.sosanhngay(
        //             this.datePipe.transform(e.created_at, 'dd-MM-yyyy'),
        //             this.datePipe.transform(ngay, 'dd-MM-yyyy')
        //         ) && e.idTrangThai == 4
        //     );
        // });
        // return this.getDoanhThu(hd);
        return 0;
    }
    getChiPhi_by_day(ngay: Date) {
        // let hd = this.hoadonxuats.filter(e => {
        //     return (
        //         this.sosanhngay(
        //             this.datePipe.transform(e.created_at, 'dd-MM-yyyy'),
        //             this.datePipe.transform(ngay, 'dd-MM-yyyy')
        //         ) && e.idTrangThai == 4
        //     );
        // });
        // return this.getChiPhi(hd);
        return 0;
    }
    getLoiNhuan_by_day(ngay: Date) {
        // let hd = this.hoadonxuats.filter(e => {
        //     return (
        //         this.sosanhngay(
        //             this.datePipe.transform(e.created_at, 'dd-MM-yyyy'),
        //             this.datePipe.transform(ngay, 'dd-MM-yyyy')
        //         ) && e.idTrangThai == 4
        //     );
        // });
        // return this.getLoiNhuan(hd);
        return 0;
    }
    createForm() {
        const date = new Date();
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        this.frmBaoCao1 = this._formBuilder.group({
            NgayBD: [firstDay, [Validators.required]],
            NgayKT: [lastDay, [Validators.required]]
        });
        this.onBaoCao();
    }
    onBaoCao() {
        const formData = new FormData();
        formData.append(
            'NgayBD',
            this.datePipe.transform(
                this.frmBaoCao1.value['NgayBD'],
                'dd-MM-yyyy'
            )
        );
        formData.append(
            'NgayKT',
            this.datePipe.transform(
                this.frmBaoCao1.value['NgayKT'],
                'dd-MM-yyyy'
            )
        );
        this.isLoading = true;
        this.subscriptions.push(
            this.baocaoService
                .getbaocao_donhang(formData)
                .subscribe(
                    data => {
                        if (data) {
                            this.hoadonxuats = data.slice();
                        }
                    },
                    () => {}
                )
                .add(() => (this.isLoading = false))
        );
    }
}
