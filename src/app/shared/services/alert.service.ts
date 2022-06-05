import {Injectable} from "@angular/core";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ConfirmDialogComponent, ConfirmDialogParams} from "../components/confirm-dialog/confirm-dialog.component";

@Injectable()
export class AlertService {

  constructor(private dialog: MatDialog) {
  }

  // alert(params: AlertDialogParams) {
  //   this.dialog.open(AlertDialogComponent, <MatDialogConfig> {
  //     width: '500px',
  //     data: params,
  //     disableClose: true
  //   });
  // }
  //
  // alertInfo(message: string): void {
  //   this.alert(new AlertDialogParams(AlertDialogType.INFO, message));
  // }
  //
  // alertSuccess(message: string): void {
  //   this.alert(new AlertDialogParams(AlertDialogType.SUCCESS, message));
  // }
  //
  // alertWarning(message: string): void {
  //   this.alert(new AlertDialogParams(AlertDialogType.WARNING, message));
  // }
  //
  // alertError(message: string): void {
  //   this.alert(new AlertDialogParams(AlertDialogType.ERROR, message));
  // }

  defaultConfirm(message: string, okCallback: () => void, cancelCallback?: () => void) {
    this.confirm(ConfirmDialogParams.defaultDialog(message), okCallback, cancelCallback);
  }

  yesNoConfirm(title: string, message: string, okCallback: () => void, cancelCallback?: () => void) {
    this.confirm(ConfirmDialogParams.yesNoDialog(title, message), okCallback, cancelCallback);
  }

  confirm(params: ConfirmDialogParams, okCallback: () => void, cancelCallback?: () => void) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, <MatDialogConfig>{
      width: '500px',
      data: params,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((userDecision: boolean) => {
      if (userDecision && okCallback) {
        okCallback();
      } else if (cancelCallback) {
        cancelCallback();
      }
    });
  }

}
