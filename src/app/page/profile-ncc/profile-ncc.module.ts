import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileNccComponent } from './profile-ncc.component';
import { ShareModule } from 'src/app/share/share.module';
import { DialogService } from 'src/app/admin/service/dialog.service';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { LoadingModule } from '../loading/loading.module';
import { CKEditorModule } from 'ng2-ckeditor';


const routing: Routes = [{ path: '', component: ProfileNccComponent }];
const Routing: ModuleWithProviders = RouterModule.forChild(routing);
@NgModule({
  declarations: [ProfileNccComponent, ],
  imports: [
    CommonModule,ShareModule,Routing,LoadingModule,CKEditorModule
  ],
  providers: [DialogService]
})
export class ProfileNccModule { }
