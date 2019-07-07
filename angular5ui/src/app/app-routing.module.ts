import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard as AuthGuard } from './services/auth.guard.service';
import { AuthService as AuthServ } from './services/auth.service.service';
import { ServiceComponent } from './service/service.component';
import { UserComponent } from './user/user.component';
import { AppComponent } from './app.component';

//redirectTo: 'Login',
const routes: Routes = [
  //{ path: '', component: LoginComponent, canActivate: [AuthServ],pathMatch: 'full' },
  { path: '', component: LoginComponent, canActivate: [AuthServ]},
  { path: 'Login', component: LoginComponent, canActivate: [AuthServ]},
  // ----------------------- After Authenticate -----------------------
  { path: 'Home', component: HomeComponent, canActivate: [AuthGuard], pathMatch: 'full'  },
  { path: 'Service', component: ServiceComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'User', component: UserComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: '**', redirectTo: 'Home' },

/*{
  path: 'admin',
  component: AppComponent,
  children: [
    { path: 'Login', component: LoginComponent, canActivate: [AuthServ]},
    { path: 'Home', component: HomeComponent, canActivate: [AuthGuard], pathMatch: 'full'  },
    { path: 'Service', component: ServiceComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  ]
 }*/

];

@NgModule({  
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})  
export class AppRoutingModule { } 