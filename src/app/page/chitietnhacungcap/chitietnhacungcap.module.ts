import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ChitietnhacungcapComponent } from './chitietnhacungcap.component';
import { LoadingModule } from '../loading/loading.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ShareModule } from 'src/app/share/share.module';

const routing: Routes = [{ path: '', component: ChitietnhacungcapComponent }];
const Routing: ModuleWithProviders = RouterModule.forChild(routing);
@NgModule({
  declarations: [
    ChitietnhacungcapComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    Routing,
    SlickCarouselModule,
    LoadingModule
  ],
  exports:[
    ChitietnhacungcapComponent
  ]
})
export class ChitietnhacungcapModule { }
