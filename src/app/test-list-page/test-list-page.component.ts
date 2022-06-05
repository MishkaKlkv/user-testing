import { Component, OnInit } from '@angular/core';
import {PageMode} from "../shared/enums/PageMode";

@Component({
  selector: 'app-test-list-page',
  templateUrl: './test-list-page.component.html',
  styleUrls: ['./test-list-page.component.scss']
})
export class TestListPageComponent implements OnInit {
  pageMode: PageMode = PageMode.COMPETITION;

  constructor() { }

  ngOnInit(): void {
  }

}
