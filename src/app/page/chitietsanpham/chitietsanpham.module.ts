import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChitietsanphamComponent } from './chitietsanpham.component';
import { ShareModule } from 'src/app/share/share.module';
import { Routes, RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { LoadingModule } from '../loading/loading.module';
import { DanhgiaComponent } from './danhgia/danhgia.component';
import { SanphamlienquanComponent } from '../component/sanphamlienquan/sanphamlienquan.component';


const routing: Routes = [{ path: '', component: ChitietsanphamComponent }];
const Routing: ModuleWithProviders = RouterModule.forChild(routing);
@NgModule({
  declarations: [
    ChitietsanphamComponent,
    DanhgiaComponent,    
    SanphamlienquanComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    Routing,
    SlickCarouselModule,
    LoadingModule,
    
  ],
  exports:[
    ChitietsanphamComponent,
    SanphamlienquanComponent
  ]
})
export class ChitietsanphamModule { }
