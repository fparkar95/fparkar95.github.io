import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColorSelectorComponent } from './components/color-selector/color-selector.component';
import { SpinnerOverlayComponent } from './components/spinner-overlay/spinner-overlay.component';
import { ColorCircleComponent } from './components/color-circle/color-circle.component';
import { HttpClientModule } from '@angular/common/http';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { KeyboardComponent } from './components/keyboard/keyboard.component'

@NgModule({
  declarations: [
    AppComponent,
    ColorSelectorComponent,
    SpinnerOverlayComponent,
    ColorCircleComponent,
    KeyboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ShareButtonsModule.withConfig({
      debug: true
    }),
    ShareIconsModule,
  ],
  providers: [],
  bootstrap: [AppComponent, ColorSelectorComponent]
})
export class AppModule { }
