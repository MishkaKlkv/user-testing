import {ChangeDetectorRef, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {Test} from "../shared/entities/Test";
import {PageMode} from "../shared/enums/PageMode";
import {TestService} from "../shared/services/test.service";
import {AlertService} from "../shared/services/alert.service";
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-test-constructor',
  templateUrl: './test-constructor.component.html',
  styleUrls: ['./test-constructor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestConstructorComponent implements OnInit, OnDestroy {

  tests: Test[] = [];
  pageMode: PageMode = PageMode.VIEW_TEST;
  loading = false;
  $destroy: Subject<boolean> = new Subject<boolean>();

  constructor(public authService: AuthService,
              private router: Router,
              private testService: TestService,
              private alertService: AlertService,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.testService.findAllTests().subscribe(tests => {
      this.tests = tests;
      this.detectChanges();
    });
  }

  detectChanges() {
    this.changeDetectorRef.detectChanges();
  }

  deleteTest(id: string): void {
    const title = 'Внимание!';
    const message = 'Вы действительно хотите удалить тест?';
    this.alertService.yesNoConfirm(title, message, () => {
      this.testService.deleteTest(id)
        .pipe(takeUntil(this.$destroy))
        .subscribe(() => {
          this.tests = this.tests.filter(test => test.id !== id);
          this.detectChanges();
        });
    })
  }

  editTest(id: string) {

  }

  viewTest(id: string) {
    console.log(id);
  }

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.unsubscribe();
  }
}
