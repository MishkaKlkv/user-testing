import {NgModule, Provider} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TestPageComponent} from './test-page/test-page.component';
import {TestListPageComponent} from './test-list-page/test-list-page.component';
import {SharedModule} from "./shared/shared.module";
import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {AboutPageComponent} from './about-page/about-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./shared/auth.interceptor";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    TestPageComponent,
    TestListPageComponent,
    WelcomePageComponent,
    AboutPageComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule {
}
