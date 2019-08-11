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
    loadChildren: './components/login/login.module#LoginModule',
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: './components/dashboard/dashboard.module#DashboardModule',
        resolve: { DashboardResolve },
      },
      {
        path: 'account',
        canActivate: [AuthGuard],
        loadChildren: './components/account/account.module#AccountModule',

        resolve: { AccountResolve },
      },
      {
        path: 'cutter',
        canActivate: [AuthGuard],
        loadChildren: './components/cutter/cutter.module#CutterModule',

        resolve: { CutterResolve },
      },
      {
        path: 'contour-output',
        canActivate: [AuthGuard],
        loadChildren: './components/contour-output/contour-output.module#ContourOutputModule',
        resolve: { ContourOutputResolve },
      },
      {
        path: 'stock-tent',
        canActivate: [AuthGuard],
        loadChildren: './components/stock-tent/stock-tent.module#StockTentModule',
        resolve: { StockTentResolve },
      },
      {
        path: 'victim-delivery',
        canActivate: [AuthGuard],
        loadChildren: './components/victim-delivery/victim-delivery.module#VictimDeliveryModule',
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
