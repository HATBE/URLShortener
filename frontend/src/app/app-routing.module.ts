import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { RedirectComponent } from './redirect/redirect.component';

const routes: Routes = [
  {path: '', component: IndexComponent, title: "URL-Shortener"},
  {path: 'u/:id', component: RedirectComponent, title: "Redirect..."}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
