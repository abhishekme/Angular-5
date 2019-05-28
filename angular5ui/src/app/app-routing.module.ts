import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard as AuthGuard } from './services/auth.guard.service';
import { AuthService as AuthServ } from './services/auth.service.service';
import { ServiceComponent } from './service/service.component';

const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  //{ path: '*', redirectTo: 'Login'},
  { path: 'Login', component: LoginComponent, canActivate: [AuthServ]},
        // ------------- After Authenticate ------------------
        { path: 'Home', component: HomeComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always'  },
        { path: 'Service', component: ServiceComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})  
export class AppRoutingModule { } 