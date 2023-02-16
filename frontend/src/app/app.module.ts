import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountUpModule } from 'ngx-countup';

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
import { FooterComponent } from './components/parts/footer/footer.component';
import { StatsComponent } from './components/parts/stats/stats.component';
import { UrlstatsComponent } from './components/pages/userbackend/urlstats/urlstats.component';
import { SettingsComponent } from './components/pages/userbackend/settings/settings.component';
import { YourUrlsComponent } from './components/pages/userbackend/dashboard/your-urls/your-urls.component';
import { ChangePasswordComponent } from './components/pages/userbackend/settings/change-password/change-password.component';
import { AdminDashboardComponent } from './components/pages/admin/admin-dashboard/admin-dashboard.component';
import { UsersListComponent } from './components/pages/admin/admin-dashboard/users-list/users-list.component';
import { DangerSettingsComponent } from './components/pages/userbackend/settings/danger-settings/danger-settings.component';
import { UrlDetailComponent } from './components/pages/userbackend/urlstats/url-detail/url-detail.component';
import { UrlAccessListComponent } from './components/pages/userbackend/urlstats/url-access-list/url-access-list.component';
import { UrlChartComponent } from './components/pages/userbackend/urlstats/url-chart/url-chart.component';
import { CreateUserComponent } from './components/pages/admin/admin-dashboard/create-user/create-user.component';
import { ViewUserComponent } from './components/pages/admin/view-user/view-user.component';

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
    ShortenerComponent,
    FooterComponent,
    StatsComponent,
    UrlstatsComponent,
    SettingsComponent,
    YourUrlsComponent,
    ChangePasswordComponent,
    AdminDashboardComponent,
    UsersListComponent,
    DangerSettingsComponent,
    UrlDetailComponent,
    UrlAccessListComponent,
    UrlChartComponent,
    CreateUserComponent,
    ViewUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    CountUpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
