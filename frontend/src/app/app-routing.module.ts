import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { RedirectComponent } from './components/redirect/redirect.component';

const routes: Routes = [
  {path: '', component: IndexComponent, title: "URL-Shortener"},
  {path: 'login', component: LoginComponent, title: "Login"},
  {path: ':id', component: RedirectComponent, title: "Redirect..."},
  {path:'**', component: IndexComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
