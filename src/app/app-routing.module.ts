import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/commonservice/auth.guard';
// import { AuthguardGuardGuard } from './commonservice/authguard-guard.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/super-login',
    pathMatch: 'full'
  },
  {
    path: 'super-login',
    loadChildren: () => import('./superlogin/superlogin.module').then(m => m.SuperloginModule)
  },
  {
    path: 'b2c',
    //canActivate: [AuthGuard],
    loadChildren: () => import('./b2c/b2c.module').then(m => m.B2cModule)
  },

  {
    path: 'Adminlogin',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
