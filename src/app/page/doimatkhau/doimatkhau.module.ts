import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoimatkhauComponent } from './doimatkhau.component';
import { ShareModule } from 'src/app/share/share.module';
import { Routes, RouterModule } from '@angular/router';

const routing: Routes = [{ path: '', component: DoimatkhauComponent }];
const Routing: ModuleWithProviders = RouterModule.forChild(routing);
@NgModule({
  declarations: [DoimatkhauComponent],
  imports: [CommonModule,ShareModule, Routing],
  entryComponents: [DoimatkhauComponent]
})
export class DoimatkhauModule { }
