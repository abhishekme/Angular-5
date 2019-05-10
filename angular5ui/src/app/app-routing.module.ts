import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard as AuthGuard } from './services/auth.guard.service';
import { AuthService as AuthServ } from './services/auth.service.service';

const routes: Routes = [
  { path: '**', redirectTo: '/Login', pathMatch: 'full' },
  { path: '***', redirectTo: '/Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  { path: 'Home', component: HomeComponent,  canActivate: [AuthGuard], pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
