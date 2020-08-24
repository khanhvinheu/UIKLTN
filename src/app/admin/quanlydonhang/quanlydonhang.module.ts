import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from 'src/app/share/share.module';
import { QuanlydonhangComponent } from './quanlydonhang.component';
import { QuanlydonhangTabComponent } from './quanlydonhang-tab/quanlydonhang-tab.component';
import { QuanlydonhangListComponent } from './quanlydonhang-list/quanlydonhang-list.component';
import { QuanlydonhangEditComponent } from './quanlydonhang-edit/quanlydonhang-edit.component';



@NgModule({
  declarations: [
    QuanlydonhangComponent,
    QuanlydonhangTabComponent,
    QuanlydonhangListComponent,
    QuanlydonhangEditComponent
  ],
  imports: [
    CommonModule,
    ShareModule
  ],
  entryComponents: [
    QuanlydonhangEditComponent
  ],
  exports: [
   QuanlydonhangComponent, 
   QuanlydonhangTabComponent,
   QuanlydonhangListComponent,
   QuanlydonhangEditComponent
  ]
})
export class QuanlydonhangModule { }
