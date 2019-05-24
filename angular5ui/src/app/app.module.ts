import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard as AuthGuard } from './services/auth.guard.service';
import { DatabaseService } from './services/database.service';
import { DictionaryService } from './services/dictionary.service';
import { AuthService as AuthServ } from './services/auth.service.service';
import { ServiceComponent } from './service/service.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from '@progress/kendo-angular-dialog';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ServiceComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    InputsModule,
    DialogModule,
  ],
  exports:[
    FormsModule
  ],
  providers: [AuthGuard,AuthServ, DatabaseService, DictionaryService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
