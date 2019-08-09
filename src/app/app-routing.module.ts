import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import {
  AccountResolve,
  CutterResolve,
  FestivalOfSacrificesResolve,
  ContourOutputResolve,
  StockTentResolve,
  VictimDeliveryResolve,
  DashboardResolve,
} from './components/resolve';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import(`./components/login/login.module`).then(m => m.LoginModule),
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import(`./components/dashboard/dashboard.module`).then(m => m.DashboardModule),
        resolve: { DashboardResolve },
      },
      {
        path: 'account',
        canActivate: [AuthGuard],
        loadChildren: () => import(`./components/account/account.module`).then(m => m.AccountModule),
        resolve: { AccountResolve },
      },
      {
        path: 'cutter',
        canActivate: [AuthGuard],
        loadChildren: () => import(`./components/cutter/cutter.module`).then(m => m.CutterModule),
        resolve: { CutterResolve },
      },
      {
        path: 'contour-output',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import(`./components/contour-output/contour-output.module`).then(m => m.ContourOutputModule),
        resolve: { ContourOutputResolve },
      },
      {
        path: 'stock-tent',
        canActivate: [AuthGuard],
        loadChildren: () => import(`./components/stock-tent/stock-tent.module`).then(m => m.StockTentModule),
        resolve: { StockTentResolve },
      },
      {
        path: 'victim-delivery',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import(`./components/victim-delivery/victim-delivery.module`).then(m => m.VictimDeliveryModule),
        resolve: { VictimDeliveryResolve },
      },
      {
        path: 'festival-of-sacrifices',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import(`./components/festivalOfSacrifices/festival-of-sacrifices.module`).then(
            m => m.FestivalOfSacrificesModule,
          ),
        resolve: { FestivalOfSacrificesResolve },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
