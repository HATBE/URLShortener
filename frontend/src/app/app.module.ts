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
import { HeaderComponent } from './components/shared/header/header.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { HeaderButtonComponent } from './components/shared/header/header-button/header-button.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { DashboardComponent } from './components/pages/userbackend/dashboard/dashboard.component';
import { ShortenerComponent } from './components/shared/shortener/shortener.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { StatsComponent } from './components/shared/stats/stats.component';
import { ViewUrlComponent } from './components/pages/userbackend/view-url/view-url.component';
import { SettingsComponent } from './components/pages/userbackend/settings/settings.component';
import { YourUrlsComponent } from './components/pages/userbackend/dashboard/your-urls/your-urls.component';
import { ChangePasswordComponent } from './components/pages/userbackend/settings/change-password/change-password.component';
import { AdminDashboardComponent } from './components/pages/admin/admin-dashboard/admin-dashboard.component';
import { UsersListComponent } from './components/pages/admin/admin-dashboard/users-list/users-list.component';
import { DangerSettingsComponent } from './components/pages/userbackend/settings/danger-settings/danger-settings.component';
import { UrlDetailComponent } from './components/pages/userbackend/view-url/url-detail/url-detail.component';
import { UrlAccessListComponent } from './components/pages/userbackend/view-url/url-access-list/url-access-list.component';
import { CreateUserComponent } from './components/pages/admin/admin-dashboard/create-user/create-user.component';
import { ViewUserComponent } from './components/pages/admin/view-user/view-user.component';
import { UserDetailComponent } from './components/pages/admin/view-user/user-detail/user-detail.component';
import { ResetPasswordComponent } from './components/pages/admin/view-user/reset-password/reset-password.component';
import { TableComponent } from './components/shared/table/table.component';
import { LoadingSpinnerComponent } from './components/shared/loading-spinner/loading-spinner.component';
import { ToastComponent } from './components/shared/toast/toast.component';
import { CopyToClipboardComponent } from './components/shared/copy-to-clipboard/copy-to-clipboard.component';
import { PaginationButtonComponent } from './components/shared/pagination/pagination-button/pagination-button.component';
import { PaginationInfoComponent } from './components/shared/pagination/pagination-info/pagination-info.component';

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
    ViewUrlComponent,
    SettingsComponent,
    YourUrlsComponent,
    ChangePasswordComponent,
    AdminDashboardComponent,
    UsersListComponent,
    DangerSettingsComponent,
    UrlDetailComponent,
    UrlAccessListComponent,
    CreateUserComponent,
    ViewUserComponent,
    UserDetailComponent,
    ResetPasswordComponent,
    TableComponent,
    LoadingSpinnerComponent,
    ToastComponent,
    CopyToClipboardComponent,
    PaginationButtonComponent,
    PaginationInfoComponent,
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
