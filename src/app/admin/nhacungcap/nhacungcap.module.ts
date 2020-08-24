import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from 'src/app/share/share.module';
import { NhacungcapComponent } from './nhacungcap.component';
import { NhacungcapTabComponent } from './nhacungcap-tab/nhacungcap-tab.component';
import { NhacungcapListComponent } from './nhacungcap-list/nhacungcap-list.component';




@NgModule({
  declarations: [
    NhacungcapComponent,
    NhacungcapTabComponent,
    NhacungcapListComponent
  ],
  imports: [
    CommonModule, ShareModule
  ],
  exports: [
    NhacungcapComponent,
    NhacungcapTabComponent,
    NhacungcapListComponent
  ]
})
export class NhacungcapModule { }
