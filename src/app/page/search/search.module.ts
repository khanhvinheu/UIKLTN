import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { ShareModule } from 'src/app/share/share.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RouterModule, Routes } from '@angular/router';
import { BoxFilterComponent } from '../filter/box-filter/box-filter.component';


const routing: Routes = [{ path: '', component: SearchComponent }];
const Routing: ModuleWithProviders = RouterModule.forChild(routing);
@NgModule({
  declarations: [
    SearchComponent,
    BoxFilterComponent,    
],
imports: [ShareModule, Routing, SlickCarouselModule, RouterModule],
exports: [
  SearchComponent,
  BoxFilterComponent,
]
})
export class SearchModule { }
