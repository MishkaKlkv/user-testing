import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {Test} from "../shared/entities/Test";
import {PageMode} from "../shared/enums/PageMode";

@Component({
  selector: 'app-test-constructor',
  templateUrl: './test-constructor.component.html',
  styleUrls: ['./test-constructor.component.scss']
})
export class TestConstructorComponent implements OnInit {

  tests: Test[] = [{id: '123', name: 'Тест 1', timeForCompetition: 45}];
  pageMode: PageMode = PageMode.VIEW_TEST;
  loading = false;

  constructor(public authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  deleteTest(id: string) {

  }

  editTest(id: string) {

  }

  viewTest(id: string) {
    console.log(id);
  }
}
