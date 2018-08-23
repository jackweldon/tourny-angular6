import { AppErrorHandler } from './shared/app-error-handler';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountModule } from './account/account.module';
import { HomeComponent } from './components/home/home.component';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from './material/material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APIInterceptor } from './shared/services/APIInterceptor';
import { HttpClientModule } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AccountModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'tournament', loadChildren: "./tournament/tournament.module#TournamentModule" },
      { path: '', component: HomeComponent },
    ], { enableTracing: true }
  )
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    },
    MatIconRegistry
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(public matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  } 
}