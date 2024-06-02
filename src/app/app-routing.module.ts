import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataFetchComponent } from './data-fetch/data-fetch.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },  // Default route
  { path: 'home', component: AppComponent },
  { path: 'data', component: DataFetchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
