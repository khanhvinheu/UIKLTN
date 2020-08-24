import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaocaoListComponent } from './baocao-list/baocao-list.component';
import { BaocaoKhachhangComponent } from './baocao-khachhang/baocao-khachhang.component';
import { BaocaoSanphamComponent } from './baocao-sanpham/baocao-sanpham.component';
import { DoanhthuComponent } from './doanhthu/doanhthu.component';
import { BaocaoComponent } from './baocao.component';
import { ShareModule } from 'src/app/share/share.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { BaocaoDonhangComponent } from './baocao-donhang/baocao-donhang.component';



@NgModule({
  declarations: [
    BaocaoListComponent,
    BaocaoKhachhangComponent,
    BaocaoDonhangComponent,
    BaocaoSanphamComponent,
    DoanhthuComponent,
    BaocaoComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    CKEditorModule
  ],
  exports: [
    BaocaoListComponent,
    BaocaoKhachhangComponent,
    BaocaoDonhangComponent,
    BaocaoSanphamComponent,
    DoanhthuComponent,
    BaocaoComponent
  ]
})
export class BaocaoModule { }
