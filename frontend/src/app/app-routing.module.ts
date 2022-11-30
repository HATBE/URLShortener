import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { IndexComponent } from './components/pages/index/index.component';
import { RedirectComponent } from './components/pages/redirect/redirect.component';
import { DashboardComponent } from './components/pages/userbackend/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: IndexComponent, title: "URL-Shortener"},
  {path: 'login', component: LoginComponent, title: "Login"},
  {path: 'dashboard', component: DashboardComponent, title: "Dashboard"},
  {path: ':id', component: RedirectComponent, title: "Redirect..."},
  {path:'**', component: IndexComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
