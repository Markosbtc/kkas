import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ResultComponent } from './events/result/result.component'; //
import { SplitPaneLayoutPage } from './layout/split-pane-layout/split-pane-layout';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: SplitPaneLayoutPage,
    children: [{
      path: '',
      loadChildren: () => import('./layout/split-pane-layout/split-pane-layout.module').then(m => m.SplitPaneLayoutPageModule)
    }]
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterPageModule)
  },
  //FIXME: delete this: --
  {
    path: 'res',
    component: ResultComponent
  },
  //--

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
