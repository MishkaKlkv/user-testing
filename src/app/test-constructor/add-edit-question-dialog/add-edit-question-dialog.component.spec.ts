import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditQuestionDialogComponent } from './add-edit-question-dialog.component';

describe('AddEditQuestionDialogComponent', () => {
  let component: AddEditQuestionDialogComponent;
  let fixture: ComponentFixture<AddEditQuestionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditQuestionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
