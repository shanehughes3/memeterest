import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from "../components/login/login";
import { UserDashboardComponent } from "../components/user-dashboard/user-dashboard";
import { ApiService } from "./api.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
	UserDashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
