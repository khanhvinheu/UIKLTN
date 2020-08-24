import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NhasanxuatComponent } from './nhasanxuat.component';
import { NhasanxuatAddComponent } from './nhasanxuat-add/nhasanxuat-add.component';
import { NhacungcapListComponent } from '../nhacungcap/nhacungcap-list/nhacungcap-list.component';
import { NhasanxuatListComponent } from './nhasanxuat-list/nhasanxuat-list.component';
import { NhasanxuatEditComponent } from './nhasanxuat-edit/nhasanxuat-edit.component';
import { ShareModule } from 'src/app/share/share.module';

@NgModule({
  declarations: [
    NhasanxuatComponent,
    NhasanxuatAddComponent,
    NhasanxuatListComponent,    
    NhasanxuatEditComponent
  ],
  imports: [
    ShareModule
  ],
  entryComponents: [
    NhasanxuatAddComponent,
    NhasanxuatEditComponent
  ],
  exports: [
    NhasanxuatComponent,
    NhasanxuatAddComponent,
    NhasanxuatListComponent,  
    NhasanxuatEditComponent
  ]
})
export class NhasanxuatModule { }
