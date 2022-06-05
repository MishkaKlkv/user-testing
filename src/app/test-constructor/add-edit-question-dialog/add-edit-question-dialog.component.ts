import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Question} from "../../shared/entities/Question";
import {Answer} from "../../shared/entities/Answer";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {QuestionCategory} from "../../shared/enums/QuestionCategory";

@Component({
  selector: 'app-add-edit-question-dialog',
  templateUrl: './add-edit-question-dialog.component.html',
  styleUrls: ['./add-edit-question-dialog.component.scss']
})
export class AddEditQuestionDialogComponent implements OnInit {

  isEdit: boolean = false;
  loading: boolean = true;
  form!: FormGroup;
  question!: Question;
  categories: QuestionCategory[] = QuestionCategory.values();
  isCorrectAnswerExist: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddEditQuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.isEdit = !!this.data.question.id;
    this.question = this.data.question;
    this.initForm();
    this.loading = false;
  }

  private initForm() {
    this.form = new FormGroup({
      category: new FormControl(this.question.category, [
        Validators.required
      ]),
      question: new FormControl(this.question.question, [
        Validators.required
      ]),
      answers: new FormArray([])
    });
    if (this.question.answers) {
      this.question.answers.forEach(answer => this.addAnswer(answer));
    } else {
      this.addAnswer();
      this.addAnswer();
    }
  }

  addAnswer(answer: Answer = new Answer()) {
    const group = new FormGroup({
      answer: new FormControl(answer.answer || '', Validators.required),
      isCorrect: new FormControl(answer.isCorrect || ''),
      note: new FormControl(answer.note || '')
    });
    if (this.isCorrectAnswerExist) {
      group.get('isCorrect')?.disable();
    }
    (this.form.get('answers') as FormArray).push(group);
  }

  close(): void {
    this.dialogRef.close();
  }

  save() {
    if (this.form.valid) {
      Object.assign(this.question, this.form.value);
      this.dialogRef.close(this.question);
    }
  }

  getControlErrors(controlName: string): ValidationErrors | null {
    const control = this.form.get(controlName);
    if (!control) {
      return null;
    } else {
      const invalidAndTouched = control.invalid && control.touched;
      return invalidAndTouched ? control.errors : null;
    }
  }

  deleteAnswer(idx: number) {
    const formArray = (this.form.get('answers') as FormArray);
    formArray.at(idx).get('isCorrect')?.value && this.disableOrEnableAllExceptCurrent(idx);
    formArray.removeAt(idx);
  }

  disableOrEnableAllExceptCurrent(idx: number) {
    const controls = (this.form.get('answers') as FormArray).controls;
    for (let i = 0; i < controls.length; i += 1) {
      const isCorrectControl = controls[i].get('isCorrect');
      if (isCorrectControl && i !== idx) {
        isCorrectControl.disabled ? isCorrectControl.enable() : isCorrectControl.disable();
      } else {
        this.isCorrectAnswerExist = isCorrectControl?.value;
      }
    }
  }

  get answers(): FormArray {
    return this.form.get('answers') as FormArray;
  }

}
