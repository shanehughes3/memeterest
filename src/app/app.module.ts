import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AddMemeComponent } from "../components/add-meme/add-meme";
import { HeaderComponent } from "../components/header/header";
import { MemeDisplayComponent } from "../components/meme-display/meme-display";
import { ApiService } from "./api.service";

@NgModule({
  declarations: [
    AppComponent,
	AddMemeComponent,
	HeaderComponent,
	MemeDisplayComponent
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
