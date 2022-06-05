import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../material.module";
import {GradientLoaderComponent} from './components/gradient-loader/gradient-loader.component';
import {ConfirmDialogComponent} from "./components/confirm-dialog/confirm-dialog.component";


@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    GradientLoaderComponent,
    ConfirmDialogComponent
  ],
  declarations: [
    GradientLoaderComponent,
    ConfirmDialogComponent
  ]
})
export class SharedModule {
}
