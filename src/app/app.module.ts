import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NgxSyncScrollModule} from 'ngx-syncscroll';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxSyncScrollModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
