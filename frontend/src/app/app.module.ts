import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/pages/index/index.component';
import { RedirectComponent } from './components/pages/redirect/redirect.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './components/parts/header/header.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { HeaderButtonComponent } from './components/parts/header/header-button/header-button.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { DashboardComponent } from './components/pages/userbackend/dashboard/dashboard.component';
import { ShortenerComponent } from './components/parts/shortener/shortener.component';
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    RedirectComponent,
    HeaderComponent,
    LoginComponent,
    HeaderButtonComponent,
    RegisterComponent,
    DashboardComponent,
    ShortenerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
