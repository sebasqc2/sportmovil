import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/inbox',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('../app/pages/home/home.module').then( m => m.HomePageModule)
  },  
  {
    path: 'home/:id',
    loadChildren: () => import('../app/pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'calendario',
    loadChildren: () => import('./pages/calendario/calendario.module').then( m => m.CalendarioPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
