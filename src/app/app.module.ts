import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UserDashboardComponent } from "../components/user-dashboard/user-dashboard";
import { HeaderComponent } from "../components/header/header";
import { ApiService } from "./api.service";

@NgModule({
  declarations: [
    AppComponent,
	UserDashboardComponent,
	HeaderComponent
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
