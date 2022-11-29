import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './components/parts/header/header.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HeaderButtonComponent } from './components/parts/header/header-button/header-button.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/userbackend/dashboard/dashboard.component';
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    RedirectComponent,
    HeaderComponent,
    LoginComponent,
    HeaderButtonComponent,
    RegisterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
