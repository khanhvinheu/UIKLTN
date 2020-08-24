import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { PageComponent } from './page/page.component';
import { AdminGuard } from './helper/admin.guard';


const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./page/page.module').then(m => m.PageModule)    
  },
  {
    path:'home', 
    loadChildren: () => import('./page/page.module').then(m => m.PageModule)
  },
  { 
    path: 'admin', 
    canActivate: [AdminGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }, 
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
