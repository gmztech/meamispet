import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'd/home', pathMatch: 'full' },
  { path: ':client', loadChildren: () => import('src/app/pages/client/client.module').then(m => m.ClientModule) },
  { path: ':client/admin', loadChildren: () => import('src/app/pages/client-admin/client-admin.module').then(m => m.ClientAdminModule) },
  { path: 'd/home', loadChildren: () => import('src/app/pages/home/home.module').then(m => m.HomeModule) },
  // { path: 'd/setup', loadChildren: () => import('src/app/pages/setup/setup.module').then(m => m.SetupModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
