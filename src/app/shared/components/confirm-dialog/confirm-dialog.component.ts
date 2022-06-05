import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public params: ConfirmDialogParams) { }

}

export class ConfirmDialogParams {
  title = 'Требуется подтверждение';
  message = '';
  okButtonCaption = 'OK';
  cancelButtonCaption = 'Отмена';

  static defaultDialog(message: string): ConfirmDialogParams {
    let newInstance: ConfirmDialogParams = new ConfirmDialogParams();
    newInstance.message = message;
    return newInstance;
  }

  static yesNoDialog(title = 'Требуется подтверждение', message: string): ConfirmDialogParams  {
    let newInstance: ConfirmDialogParams = new ConfirmDialogParams();
    newInstance.title = title;
    newInstance.message = message;
    newInstance.okButtonCaption = 'Да';
    newInstance.cancelButtonCaption = 'Нет';
    return newInstance;

  }

}
