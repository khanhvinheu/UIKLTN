import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaikhoanListComponent } from './taikhoan-list/taikhoan-list.component';
import { TaikhoanTabComponent } from './taikhoan-tab/taikhoan-tab.component';
import { TaikhoanComponent } from './taikhoan.component';
import { ShareModule } from 'src/app/share/share.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/auth/intercreptors/token.intercreptor';



@NgModule({
  declarations: [TaikhoanComponent,TaikhoanListComponent, TaikhoanTabComponent],
  imports: [
    CommonModule,
    ShareModule
  ],
  exports: [
    TaikhoanComponent,TaikhoanListComponent, TaikhoanTabComponent
  ],
  providers: [
      
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
 ],
})
export class TaikhoanModule { }
