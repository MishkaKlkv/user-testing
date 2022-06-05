import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {AddEditQuestionDialogComponent} from './add-edit-question-dialog/add-edit-question-dialog.component';
import {DeleteDialogComponent} from './delete-dialog/delete-dialog.component';
import {QuestionListPageComponent} from './question-list-page/question-list-page.component';
import {TestConstructorComponent} from "./test-constructor.component";
import {AuthGuard} from "../shared/services/auth.guard";
import { ConstructorLayoutComponent } from './constructor-layout/constructor-layout.component';
import {TestPageComponent} from "../test-page/test-page.component";
import {AlertService} from "../shared/services/alert.service";

@NgModule({
  declarations: [
    AddEditQuestionDialogComponent,
    DeleteDialogComponent,
    QuestionListPageComponent,
    TestConstructorComponent,
    ConstructorLayoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: ConstructorLayoutComponent, children: [
          {path: '', redirectTo: '/login', pathMatch: 'full'},
          {path: 'active-tests', component: TestConstructorComponent, canActivate: [AuthGuard]},
          {path: 'active-tests/:mode/:id', component: TestPageComponent, canActivate: [AuthGuard]},
          {path: 'questions', component: QuestionListPageComponent, canActivate: [AuthGuard]}
        ]
      }
    ])
  ],
  exports: [RouterModule],
  providers: [AuthGuard, AlertService]
})
export class TestConstructorModule {
}
