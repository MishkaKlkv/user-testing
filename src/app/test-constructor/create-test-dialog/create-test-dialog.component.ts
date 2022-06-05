import { Component, Inject, OnInit } from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Question} from "../../shared/entities/Question";
import {Test} from "../../shared/entities/Test";

@Component({
  selector: 'app-create-test-dialog',
  templateUrl: './create-test-dialog.component.html',
  styleUrls: ['./create-test-dialog.component.scss']
})
export class CreateTestDialogComponent implements OnInit {

  test: Test = new Test();
  form!: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateTestDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.test.questions = this.data.questions;
    this.initForm();
  }

  private initForm() {
    this.form = new FormGroup({
      name: new FormControl(this.test.name, [
        Validators.required
      ]),
      timeForCompetition: new FormControl(this.test.timeForCompetition, [
        Validators.required, Validators.max(90)
      ])
    });
  }

  // todo вынести в абстрактный класс
  getControlErrors(controlName: string): ValidationErrors | null {
    const control = this.form.get(controlName);
    if (!control) {
      return null;
    } else {
      const invalidAndTouched = control.invalid && control.touched;
      return invalidAndTouched ? control.errors : null;
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  save() {
    if (this.form.valid) {
      Object.assign(this.test, this.form.value);
      this.dialogRef.close(this.test);
    }
  }
}
