import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-constructor-layout',
  templateUrl: './constructor-layout.component.html',
  styleUrls: ['./constructor-layout.component.scss']
})
export class ConstructorLayoutComponent implements OnInit {

  constructor(public authService: AuthService,
              private router: Router,
              private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Конструктор тестов');
  }

  logout(event: Event) {
    //ToDo зачем это?
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['login'])
  }

}
