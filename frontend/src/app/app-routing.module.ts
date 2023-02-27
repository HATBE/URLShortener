import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/pages/admin/admin-dashboard/admin-dashboard.component';
import { ViewUserComponent } from './components/pages/admin/view-user/view-user.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { IndexComponent } from './components/pages/index/index.component';
import { RedirectComponent } from './components/pages/redirect/redirect.component';
import { DashboardComponent } from './components/pages/userbackend/dashboard/dashboard.component';
import { SettingsComponent } from './components/pages/userbackend/settings/settings.component';
import { ViewUrlComponent } from './components/pages/userbackend/view-url/view-url.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: IndexComponent, title: "URL-Shortener"},
  {path: 'login', component: LoginComponent, title: "Login"},
  {path: 'register', component: RegisterComponent, title: "Register"},
  {path: 'dashboard', component: DashboardComponent, title: "Dashboard", canActivate: [AuthGuard]},
  {path: 'view-url/:id', component: ViewUrlComponent, title: "View url", canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, title: "Settings", canActivate: [AuthGuard]},
  {path: 'admin/dashboard', component: AdminDashboardComponent, title: "Admin dashboard", canActivate: [AdminGuard]},
  {path: 'admin/view-user/:id', component: ViewUserComponent, title: "View user", canActivate: [AdminGuard]},
  {path: ':id', component: RedirectComponent, title: "Redirect..."},
  {path:'**', component: IndexComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
