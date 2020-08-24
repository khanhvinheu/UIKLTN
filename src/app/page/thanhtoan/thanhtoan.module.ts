import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ThanhtoanComponent } from './thanhtoan.component';
import { ShareModule } from 'src/app/share/share.module';
import { HoanthanhthanhtoanComponent } from './hoanthanhthanhtoan/hoanthanhthanhtoan.component';
import { DathangthanhcongComponent } from './dathangthanhcong/dathangthanhcong.component';
import { ReturnPaymentComponent } from './return-payment/return-payment.component';



const routing: Routes = [{ path: '', component: ThanhtoanComponent }];
const Routing: ModuleWithProviders = RouterModule.forChild(routing);
@NgModule({
  declarations: [
    ThanhtoanComponent,
    HoanthanhthanhtoanComponent,
    DathangthanhcongComponent,    
    ReturnPaymentComponent
    
],
imports: [Routing, ShareModule],
exports: [
    ThanhtoanComponent,
    HoanthanhthanhtoanComponent,
    DathangthanhcongComponent
]
})
export class ThanhtoanModule {}
