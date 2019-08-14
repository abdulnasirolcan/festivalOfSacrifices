import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { IgxExcelExporterService } from 'igniteui-angular';
// Form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';

// Routing
import { AppRoutingModule } from './app-routing.module';

// NGXS
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';

// State
import {
  AccountState,
  LoginState,
  CutterState,
  FestivalOfSacrificesState,
  StockTentState,
  VictimDeliveryState,
} from './core/state';

// Config
import { environment } from '../environments/environment';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';

import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { NgxSpinnerModule } from 'ngx-spinner';

// Guard
import { AuthGuard } from './core/guard/auth.guard';
import { ContourOutputState } from './core/state/contour-output.state';

@NgModule({
  declarations: [AppComponent, MainLayoutComponent],
  imports: [
    BrowserModule,
    AngularFireAuthModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(),
    NgxsModule.forRoot([
      LoginState,
      AccountState,
      CutterState,
      FestivalOfSacrificesState,
      ContourOutputState,
      StockTentState,
      VictimDeliveryState,
    ]),
    NgxsRouterPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      key: ['auth.token', 'auth.email'],
    }),
    NgxsFormPluginModule.forRoot(),
    // NgxsLoggerPluginModule.forRoot({ logger: console, collapsed: false }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production,
    }),
  ],
  providers: [AuthGuard, AngularFireDatabase, AngularFirestore, IgxExcelExporterService],
  bootstrap: [AppComponent],
})
export class AppModule {}
