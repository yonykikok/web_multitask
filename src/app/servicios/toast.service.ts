import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private _snackBar: MatSnackBar) {}

  snackBarMensaje(message: string, action: string, duration) {
    this._snackBar.open(message, action, {
      duration,
    });
  }

}
