import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('../../home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('../../folder/folder.module').then(m => m.FolderPageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplitPaneLayoutPageRoutingModule { }
