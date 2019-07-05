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
import { ButtonsModule } from '@progress/kendo-angular-buttons';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { SidebarComponent } from './includes/sidebar/sidebar.component';
import { FooterComponent } from './includes/footer/footer.component';
import { HeaderComponent } from './includes/header/header.component';
import { LayoutComponent } from './includes/layout/layout.component';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { UserComponent } from './user/user.component';
import { DataFormComponent } from './user/data-form/data-form.component';

import { GridModule } from '@progress/kendo-angular-grid';
//import { AgGridModule } from 'ag-grid-angular';
import { UserFilterPipe } from './utilities/filter/user.pipe';

import { DataGrid } from './shared/datagrid/datagrid.component';
//import { DataGridUtil } from './shared/datagrid/datagrid.util';
import { Format } from './shared/datagrid/format';
import { OrderBy } from './shared/datagrid/orderby';
import { SearchComponent } from './shared/search.component';
//import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
//import { MatInputModule } from '@angular/material/input';
//import { MatMenuModule } from '@angular/material/menu';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { MatRadioModule } from '@angular/material/radio';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatStepperModule } from '@angular/material/stepper';
// //import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatTooltipModule } from '@angular/material/tooltip';
import {
  MatSnackBarModule, MatSidenavModule, MatProgressBarModule, MatListModule, MatCheckboxModule,
  MatTooltipModule
} from '@angular/material';

// import {
//   MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
//   MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule
// } from '@angular/material';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

@NgModule({
  declarations: [ 
    AppComponent,
    HomeComponent,
    LoginComponent,
    ServiceComponent,
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    UserComponent,
    DataFormComponent,
    UserFilterPipe,
    DataGrid,
   // DataGridUtil,
    Format,
    OrderBy,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GridModule,
    //AgGridModule.withComponents([]),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    InputsModule,
    DialogModule,
    ButtonsModule,
    ExcelExportModule,
    DropDownsModule,
    DateInputsModule,
    NotificationModule,

    MatSnackBarModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatListModule,
    MatCheckboxModule,
    MatTooltipModule,

    /*MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,*/

    SimpleNotificationsModule.forRoot(),
  ],
  exports:[
    FormsModule
  ],
  providers: [AuthGuard, AuthServ, DatabaseService, DictionaryService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
