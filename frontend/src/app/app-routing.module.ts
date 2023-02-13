import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { IndexComponent } from './components/pages/index/index.component';
import { RedirectComponent } from './components/pages/redirect/redirect.component';
import { DashboardComponent } from './components/pages/userbackend/dashboard/dashboard.component';
import { SettingsComponent } from './components/pages/userbackend/settings/settings.component';
import { UrlstatsComponent } from './components/pages/userbackend/urlstats/urlstats.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: IndexComponent, title: "URL-Shortener"},
  {path: 'login', component: LoginComponent, title: "Login"},
  {path: 'register', component: RegisterComponent, title: "Register"},
  {path: 'dashboard', component: DashboardComponent, title: "Dashboard", canActivate: [AuthGuard]},
  {path: 'urlstats/:id', component: UrlstatsComponent, title: "Stats", canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, title: "Settings", canActivate: [AuthGuard]},
  {path: ':id', component: RedirectComponent, title: "Redirect..."},
  {path:'**', component: IndexComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
