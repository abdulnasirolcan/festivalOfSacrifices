import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { AccountResolve, CutterResolve, FestivalOfSacrificesResolve } from './components/resolve';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () =>
      import(`./components/login/login.module`).then(
        m => m.LoginModule
      )
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import(`./components/dashboard/dashboard.module`).then(
            m => m.DashboardModule
          )
      },
      {
        path: 'account',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import(`./components/account/account.module`).then(
            m => m.AccountModule
          ),
          resolve: { AccountResolve }
      },
      {
        path: 'cutter',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import(`./components/cutter/cutter.module`).then(
            m => m.CutterModule
          ),
          resolve: { AccountResolve, CutterResolve }
      },
      {
        path: 'festival-of-sacrifices',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import(`./components/festivalOfSacrifices/festival-of-sacrifices.module`).then(
            m => m.FestivalOfSacrificesModule
          ),
          resolve: { FestivalOfSacrificesResolve }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
