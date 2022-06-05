import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {User} from "../shared/entities/User";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  authForm: FormGroup = new FormGroup({});
  submitted = false;
  message = '';
  $destroy: Subject<boolean> = new Subject<boolean>();

  constructor(public authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Пожалуйста, введите данные'
      } else if (params['authFailed']) {
        this.message = 'Сессия истекла. Введите данные заного'
      }
    });

    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });

    // const user: User = {email: "admin@gmail.com", password: "P@ssw0rd"};
    // this.authService.login(user).subscribe(res => console.log(res));
  }

  submit() {
    if (this.authForm.invalid) {
      return;
    }

    this.submitted = true;

    const user: User = {...this.authForm.value};
    this.authService.login(user)
      .pipe(takeUntil(this.$destroy))
      .subscribe({
        next: () => {
          this.authForm.reset()
          this.router.navigate(['/constructor/active-tests'])
          this.submitted = false;
        },
        error: () => this.submitted = false
      });
  }

  ngOnDestroy(): void {

  }
}
