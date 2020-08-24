import { Component, OnInit } from '@angular/core';
import { Sanpham } from 'src/app/models/sanpham';
import { Quanlydonhang } from 'src/app/models/quanlydonhang';
import { ChitietdonhangService } from '../../service/chitietdonhang.service';
import { QuanlysdonhangService } from '../../service/quanlydonhang.service';
import { SanphamService } from '../../service/sanpham.service';
import { ChiTietDonHang } from 'src/app/models/chitietdonhang';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chart-top-sanpham',
  templateUrl: './chart-top-sanpham.component.html',
  styleUrls: ['./chart-top-sanpham.component.sass']
})
export class ChartTopSanphamComponent implements OnInit {

  data_chart = {
    chart: {
        plottooltext: '$label : <b>$dataValue</b>',
        theme: 'fusion'
    },
    categories: [
        {
            category: []
        }
    ],
    dataset: [
        {
            seriesname: 'Thang',
            data: []
        }
    ]
};
width = '100%';
height = 500;
type = 'msbar2d';
dataFormat = 'json';
dataSource = this.data_chart;

isLoading = false;
subscriptions: Subscription[] = [];
hoadonxuats: Quanlydonhang[] = [];
//hoadonnhaps: Quanlydonhang[] = [];
chitietHDXS: ChiTietDonHang[] = [];
data_label: any[] = [];
month: number;
year: number;
lastday: number;
data_soluong;
sanphams: Sanpham[] = [];
constructor(
    private sanphamService: SanphamService,
    private hoadonxuatService: QuanlysdonhangService,
    private chitiethoadonxuatService: ChitietdonhangService
) {}

ngOnInit() {
    const date = new Date();
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.sanphamService.getAll();
    this.hoadonxuatService.getAll();
    this.chitiethoadonxuatService.getAll();
    this.loadData();
    this.updatedata();
}
ngOnDestroy(): void {
    if (this.subscriptions) {
        this.subscriptions.forEach(e => e.unsubscribe());
    }
}
loadData() {
    this.subscriptions.push(
        this.sanphamService.itemsObs.subscribe(data => {
            this.sanphams = data.slice();
            this.updatedata();
        }),
        this.hoadonxuatService.itemsObs.subscribe(data => {
            this.hoadonxuats = data.slice();
            this.updatedata();
        }),
        this.chitiethoadonxuatService.itemsObs.subscribe(data => {
            this.chitietHDXS = data.slice();
        })
    );
}
updatedata() {
    this.lastday = new Date(this.year, this.month + 1, 0).getDate();
    this.loadSoLuong();
    this.data_chart.dataset[0].seriesname = 'Tháng ' + (this.month + 1);
    this.data_chart.categories[0].category = this.data_label;
    this.data_chart.dataset[0].data = this.data_soluong;
    this.dataSource = this.data_chart;
}
loadSoLuong(): void {
    const firstday = new Date(this.year, this.month, 1);
    const lastday = new Date(this.year, this.month + 1, 0);
    const chitiethd = this.chitietHDXS.filter(e => {
        const date = new Date(this.getHDX(e.idDonHang).updated_at).getTime();
        return (
            date > firstday.getTime() &&
            date <= lastday.getTime() &&
            Number.parseInt(this.getHDX(e.idDonHang).idTrangthai + '') === 4
        );
    });
    class MyClassChart {
        idSanPham: number;
        SoLuong: number;
        constructor(id: number, soluong: number) {
            this.idSanPham = id;
            this.SoLuong = soluong;
        }
    }
    const new_array: MyClassChart[] = [];
    chitiethd.forEach(e => {
        let index = -1;
        new_array.forEach((a, i) => {
            if (
                Number.parseInt(a.idSanPham + '') ===
                Number.parseInt(e.idSanPham + '')
            ) {
                index = i;
            }
        });
        if (index === -1) {
            new_array.push(new MyClassChart(e.idSanPham, e.soLuong));
        } else {
            new_array[index].SoLuong += e.soLuong;
        }
    });
    new_array
        .sort((a, b) => {
            return b.SoLuong - a.SoLuong;
        })
        .slice(0, 10);
    this.data_label = [];
    this.data_soluong = [];
    new_array.forEach(e => {
        this.data_label.push({
            label: this.getSanPham(e.idSanPham)
                ? this.getSanPham(e.idSanPham).tenSanpham
                : ''
        });
        this.data_soluong.push({
            value: e.SoLuong
        });
    });
}
getHDX(idHDX: number): Quanlydonhang {
    return this.hoadonxuats.filter(e => {
        return e.id === idHDX;
    })[0];
}
getSanPham(idSanPham: number): Sanpham {
    return this.sanphams.filter(e => {
        return e.id === idSanPham;
    })[0];
}
onChangeThang() {
    this.updatedata();
}

}
