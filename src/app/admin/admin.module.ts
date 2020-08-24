import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DemoMaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DanhMucComponent } from './danh-muc/danh-muc.component';
import { DanhmucAddComponent } from './danh-muc/danhmuc-add/danhmuc-add.component';
import { DanhmucListComponent } from './danh-muc/danhmuc-list/danhmuc-list.component';
import { DanhmucEditComponent } from './danh-muc/danhmuc-edit/danhmuc-edit.component';
import { QuyenComponent } from './quyen/quyen.component';
import { QuyenCreateComponent } from './quyen/quyen-create/quyen-create.component';
import { QuyenEditComponent } from './quyen/quyen-edit/quyen-edit.component';
import { DanhmuchinhComponent } from './danhmuchinh/danhmuchinh.component';
import { DanhmuchinhCreateComponent } from './danhmuchinh/danhmuchinh-create/danhmuchinh-create.component';
import { DanhmuchinhEditComponent } from './danhmuchinh/danhmuchinh-edit/danhmuchinh-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PhuongthucthanhtoanComponent } from './phuongthucthanhtoan/phuongthucthanhtoan.component';
import { PtttCreateComponent } from './phuongthucthanhtoan/pttt-create/pttt-create.component';
import { PtttEditComponent } from './phuongthucthanhtoan/pttt-edit/pttt-edit.component';
import { KhuyenmaiComponent } from './khuyenmai/khuyenmai.component';
import { KhuyenmaiCreateComponent } from './khuyenmai/khuyenmai-create/khuyenmai-create.component';
import { KhuyenmaiEditComponent } from './khuyenmai/khuyenmai-edit/khuyenmai-edit.component';
import { ChitietkhuyenmaiComponent } from './chitietkhuyenmai/chitietkhuyenmai.component';
import { ChitietkhuyenmaiCreateComponent } from './chitietkhuyenmai/chitietkhuyenmai-create/chitietkhuyenmai-create.component';
import { ChitietkhuyenmaiEditComponent } from './chitietkhuyenmai/chitietkhuyenmai-edit/chitietkhuyenmai-edit.component';
import { SanphamComponent } from './sanpham/sanpham.component';
import { ImageAddComponent } from './sanpham/image-add/image-add.component';
import { SanphamAddComponent } from './sanpham/sanpham-add/sanpham-add.component';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CKEditorModule } from 'ng2-ckeditor';
import { ShareModule } from '../share/share.module';
import { SanphamEditComponent } from './sanpham/sanpham-edit/sanpham-edit.component';
import { NhacungcapModule } from './nhacungcap/nhacungcap.module';
import { TaikhoanModule } from './taikhoan/taikhoan.module';
import { TokenInterceptor } from '../auth/intercreptors/token.intercreptor';
import { MyHelper } from '../helper/MyHelper';
import { PageRoutingModule } from '../page/page-routing.module';
import { QuanlydonhangModule } from './quanlydonhang/quanlydonhang.module';
import { AddKhuyenmaiComponent } from './sanpham/add-khuyenmai/add-khuyenmai.component';
import { BaocaoModule } from './baocao/baocao.module';
import { ChartTopSanphamComponent } from './components/chart-top-sanpham/chart-top-sanpham.component';
import { ChartDoanhthuComponent } from './components/chart-doanhthu/chart-doanhthu.component';
import { FusionChartsModule } from 'angular-fusioncharts';
import { BaocaoService } from './service/baocao.service';
import { ConfirmDialogService } from './service/confirm-dialog.service';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import * as UmberTheme from 'fusioncharts/themes/fusioncharts.theme.umber';
import * as GammelTheme from 'fusioncharts/themes/fusioncharts.theme.gammel';
import { DanhgiaComponent } from './danhgia/danhgia.component';
import { NhaphangComponent } from './sanpham/nhaphang/nhaphang.component';
import { NhasanxuatModule } from './nhasanxuat/nhasanxuat.module';


// Add dependencies to FusionChartsModule
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme, UmberTheme, GammelTheme)
@NgModule({
  declarations: [ 
    
     DanhMucComponent,
     DanhmucAddComponent, 
     DanhmucListComponent, 
     DanhmucEditComponent, 
     QuyenComponent, 
     QuyenCreateComponent,
     QuyenEditComponent, 
     DanhmuchinhComponent,
     DanhmuchinhCreateComponent,
     DanhmuchinhEditComponent, 
     DashboardComponent, 
     PhuongthucthanhtoanComponent, 
     PtttCreateComponent, 
     PtttEditComponent, 
     KhuyenmaiComponent, 
     KhuyenmaiCreateComponent, 
     KhuyenmaiEditComponent, 
     ChitietkhuyenmaiComponent, 
     ChitietkhuyenmaiCreateComponent, 
     ChitietkhuyenmaiEditComponent, 
     SanphamComponent, 
     ImageAddComponent, 
     SanphamAddComponent,
     SanphamEditComponent,
     AddKhuyenmaiComponent,
     ChartTopSanphamComponent,
     ChartDoanhthuComponent,
     DanhgiaComponent,
     NhaphangComponent,
       
  
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DemoMaterialModule,
    FormsModule,    
    MatDialogModule,
    HttpClientModule,
    FormsModule,RouterModule,
    CommonModule,  
    ReactiveFormsModule,  
    CKEditorModule,
    ShareModule, 
    NhacungcapModule,
    TaikhoanModule ,    
    PageRoutingModule,
    HttpClientModule,
    QuanlydonhangModule,
    BaocaoModule,
    FusionChartsModule,
    NhasanxuatModule
  ],
  providers:[
    MyHelper,
    BaocaoService,
    ConfirmDialogService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],

  entryComponents: [
    DanhMucComponent,
     DanhmucAddComponent, 
     DanhmucListComponent, 
     DanhmucEditComponent, 
     QuyenComponent, 
     QuyenCreateComponent,
     QuyenEditComponent, 
     DanhmuchinhComponent,
     DanhmuchinhCreateComponent,
     DanhmuchinhEditComponent, 
     DashboardComponent, 
     PhuongthucthanhtoanComponent, 
     PtttCreateComponent, 
     PtttEditComponent, 
     KhuyenmaiComponent, 
     KhuyenmaiCreateComponent, 
     KhuyenmaiEditComponent, 
     ChitietkhuyenmaiComponent, 
     ChitietkhuyenmaiCreateComponent, 
     ChitietkhuyenmaiEditComponent, 
     SanphamComponent, 
     ImageAddComponent, 
     SanphamAddComponent,
     SanphamEditComponent,
     AddKhuyenmaiComponent,
     ChartTopSanphamComponent,
     ChartDoanhthuComponent,
     DanhgiaComponent,
     NhaphangComponent
  ],
   

})
export class AdminModule { }
