import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PageMode} from "../shared/enums/PageMode";

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit {

  pageMode: PageMode = PageMode.UNKNOWN;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pageMode = PageMode.findByName(params['mode']);
    });
  }

}
