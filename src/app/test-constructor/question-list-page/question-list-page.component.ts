import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddEditQuestionDialogComponent} from "../add-edit-question-dialog/add-edit-question-dialog.component";
import {Question} from "../../shared/entities/Question";
import {TestService} from "../../shared/services/test.service";
import {of, Subject, takeUntil} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";
import {AlertService} from "../../shared/services/alert.service";
import {QuestionCategory} from "../../shared/enums/QuestionCategory";
import {CreateTestDialogComponent} from "../create-test-dialog/create-test-dialog.component";

@Component({
  selector: 'app-question-list-page',
  templateUrl: './question-list-page.component.html',
  styleUrls: ['./question-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionListPageComponent implements OnInit, OnDestroy {
  questions: Question[] = [];
  loading = false;
  questionsSelection = new SelectionModel<Question>(true, []);
  $destroy: Subject<boolean> = new Subject<boolean>();
  menuOpen = false;
  categories: QuestionCategory[] = QuestionCategory.values();
  selectedCategory: QuestionCategory = QuestionCategory.CARS;

  constructor(private dialog: MatDialog,
              private testService: TestService,
              private alertService: AlertService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions() {
    this.loading = true;
    this.testService.findAllQuestions()
      .pipe(takeUntil(this.$destroy))
      .subscribe(questions => {
        this.questions = questions;
        // toDo фильтровать через запрос к бд
        this.filterQuestions();
        this.loading = false;
        this.detectChanges();
      });
  }

  detectChanges() {
    this.changeDetectorRef.detectChanges();
  }

  addOrEditQuestion(id?: string, makeCopy?: boolean) {
    this.menuOpen = false;
    const $dialogData = id ? this.testService.findQuestionById(id) : of(new Question());
    $dialogData
      .pipe(takeUntil(this.$destroy))
      .subscribe(question => {
        if (makeCopy) {
          question.id = '';
          question.idUser = '';
        }
        const dialogRef = this.dialog.open(AddEditQuestionDialogComponent, {
          disableClose: true,
          autoFocus: false,
          width: '60%',
          data: {question}
        });

      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.testService.createOrUpdateQuestion(res)
            .pipe(takeUntil(this.$destroy))
            .subscribe(res => {
              this.loadQuestions();
          });
        }
      });
    })
  }

  deleteQuestion(id: string): void {
    const title = 'Внимание!';
    const message = 'Вы действительно хотите удалить вопрос?';
    this.alertService.yesNoConfirm(title, message, () => {
      this.testService.deleteQuestion(id)
        .pipe(takeUntil(this.$destroy))
        .subscribe(() => {
          this.questions = this.questions.filter(question => question.id !== id);
          this.detectChanges();
        });
    })
  }

  clearSelection(): void {
    this.questionsSelection.clear();
  }

  createTest(): void {
    const dialogRef = this.dialog.open(CreateTestDialogComponent, {
      disableClose: true,
      autoFocus: false,
      width: '60%',
      data: { questions: this.questionsSelection.selected }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.testService.createOrUpdateTest(res)
          .pipe(takeUntil(this.$destroy))
          .subscribe(res => {
            console.log(res);
          });
      }
    });
  }

  filterQuestions() {
    this.questions = this.questions.filter(question => question.category.name === this.selectedCategory.name)
  }

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.unsubscribe();
  }

}
