import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page.component';
import { AuthGuard } from '../helper/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { HomepageComponent } from './homepage/homepage.component';
import { GiohangComponent } from './giohang/giohang.component';
import { CartGuard } from '../helper/cart.guard';
import { ReturnPaymentComponent } from './thanhtoan/return-payment/return-payment.component';



const routes: Routes = [
  { 
    path: '',
    component: PageComponent,
    children: [  
      {
         path: '', component:HomepageComponent
      } , 
      {
           path: 'profile',
           loadChildren: () =>
               import('./profile/profile.module').then(
                   m => m.ProfileModule
                ),
           canActivate: [AuthGuard]
      },
      {
        path: 'profile-ncc',
        loadChildren: () =>
            import('./profile-ncc/profile-ncc.module').then(
                m => m.ProfileNccModule
             ),
        canActivate: [AuthGuard]
      },
      {
        path: 'chitietsanpham/:id',
        loadChildren: () =>
            import('./chitietsanpham/chitietsanpham.module').then(
                m => m.ChitietsanphamModule
            )
      }, 
      {
        path: 'chitietnhacungcap/:id',
        loadChildren: () =>
            import('./chitietnhacungcap/chitietnhacungcap.module').then(
                m => m.ChitietnhacungcapModule
            )
      },  
      {
        path: 'giohang',
        component: GiohangComponent
      }, 
      {
        path: 'reset_password/:token',
        loadChildren: () =>
            import('./doimatkhau/doimatkhau.module').then(
                m => m.DoimatkhauModule
            )
      }, 
      {
        path: 'search',
        loadChildren: () =>
            import('./search/search.module').then(m => m.SearchModule)
      },
      {
        path: 'thanhtoan',
        loadChildren: () =>
            import('./thanhtoan/thanhtoan.module').then(
                m => m.ThanhtoanModule
            ),
        canActivate: [CartGuard]
      },
      {
        path: 'return-pament', 
        component: ReturnPaymentComponent
      }
    ]
    
  }, 
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
