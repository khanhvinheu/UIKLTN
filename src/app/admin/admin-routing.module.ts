import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DanhMucComponent } from './danh-muc/danh-muc.component';
import { QuyenComponent } from './quyen/quyen.component';
import { DanhmuchinhComponent } from './danhmuchinh/danhmuchinh.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PhuongthucthanhtoanComponent } from './phuongthucthanhtoan/phuongthucthanhtoan.component';
import { KhuyenmaiComponent } from './khuyenmai/khuyenmai.component';
import { ChitietkhuyenmaiComponent } from './chitietkhuyenmai/chitietkhuyenmai.component';
import { SanphamComponent } from './sanpham/sanpham.component';
import { NhacungcapComponent } from './nhacungcap/nhacungcap.component';
import { TaikhoanComponent } from './taikhoan/taikhoan.component';
import { QuanlydonhangComponent } from './quanlydonhang/quanlydonhang.component';
import { QuanlydonhangListComponent } from './quanlydonhang/quanlydonhang-list/quanlydonhang-list.component';
import { QuanlydonhangEditComponent } from './quanlydonhang/quanlydonhang-edit/quanlydonhang-edit.component';
import { BaocaoComponent } from './baocao/baocao.component';
import { BaocaoListComponent } from './baocao/baocao-list/baocao-list.component';
import { DanhgiaComponent } from './danhgia/danhgia.component';
import { NhasanxuatComponent } from './nhasanxuat/nhasanxuat.component';
import { NhasanxuatListComponent } from './nhasanxuat/nhasanxuat-list/nhasanxuat-list.component';




const routes: Routes = [
  { 
    path: '',
    component: AdminComponent,
    children: [  
      // {
      //   path: '', redirectTo:'admin' 
      // } , 
      {
        path: "", redirectTo: "dashboard", pathMatch: "full",
        
      },  
      {
        path:"dashboard",component:DashboardComponent
      },
      {
        path: "baocao", component: BaocaoComponent,
        children: [
            { path: '', component: BaocaoListComponent },
        ]
      },
      
      {
        path:'danhmuc', component:DanhMucComponent
      },
      {
        path:'quyen', component:QuyenComponent
      },
      {
        path:'danhmuchinh', component:DanhmuchinhComponent
      },
      {
        path:'pttt' , component:PhuongthucthanhtoanComponent
      },
      {
        path:'khuyenmai', component:KhuyenmaiComponent
      },
      {
        path:'chitietkhuyenmai', component:ChitietkhuyenmaiComponent
      },
      {
        path:'sanpham', component:SanphamComponent
      },
      {
        path:'nhacungcap', component:NhacungcapComponent
      },
      {
        path:'taikhoan', component:TaikhoanComponent
      },
      {
        path: "quanlydonhang", component: QuanlydonhangComponent,
        children: [
            { path: '', component: QuanlydonhangListComponent },
            { path: ':id/edit', component: QuanlydonhangEditComponent },
        ]
      },
      {
        path: "danhgia", component: DanhgiaComponent        
      },
      {
        path: "nhasanxuat", component: NhasanxuatComponent,
        children: [
            { path: '', component: NhasanxuatListComponent },
        ]
    },
    ]
    
  }, 
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
