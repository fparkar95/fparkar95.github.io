import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColorSelectorComponent } from './components/color-selector/color-selector.component';
import { SpinnerOverlayComponent } from './components/spinner-overlay/spinner-overlay.component';
import { HttpClientModule } from '@angular/common/http';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { ColorBallComponent } from './components/color-ball/color-ball.component';
import { LoginComponent } from './components/login/login.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component'
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { FormBuilder } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ColorSelectorComponent,
    SpinnerOverlayComponent,
    ColorBallComponent,
    LoginComponent,
    LeaderboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ShareButtonsModule.withConfig({
      debug: true
    }),
    ShareIconsModule,
    SocialLoginModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              "740001101368-k9kjj4eio9koito7mmo8p8v1pr0kh03e.apps.googleusercontent.com"
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },
    FormBuilder    
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
