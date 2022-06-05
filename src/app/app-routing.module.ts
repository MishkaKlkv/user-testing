import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";
import {TestListPageComponent} from "./test-list-page/test-list-page.component";
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {AboutPageComponent} from "./about-page/about-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {TestPageComponent} from "./test-page/test-page.component";
import {AuthGuard} from "./shared/services/auth.guard";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: WelcomePageComponent},
      {path: 'tests', component: TestListPageComponent},
      {path: 'tests/:mode/:id', component: TestPageComponent},
      {path: 'about', component: AboutPageComponent},
      {path: 'login', component: LoginPageComponent},

    ]
  },
  {
    path: 'constructor',
    loadChildren: () => import('./test-constructor/test-constructor.module').then(m =>
      m.TestConstructorModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
