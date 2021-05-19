import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',

})
export class ToastService {

  constructor(private _snackBar: MatSnackBar) { }


  snackBarMensaje(message: string, action: string, duration) {
    this._snackBar.open(message, action, {
      duration,
      panelClass: ['snackWar']
      //snackWarning snackSuccess snackPrimary snackDanger
    });
  }
  /**
   * 
   * @param message 
   * @param action 
   * @param duration 
   * @param className  posible clases personalizadas snackWarning snackSuccess snackInfo snackDanger
   */
  snackBarEditable(message: string, action: string, duration, className) {
    /*snackWarning
      snackSuccess
      snackInfo
      snackDanger*/
    this._snackBar.open(message, action, {
      duration,
      panelClass: [className]
      //snackWarning snackSuccess snackPrimary snackDanger
    });
  }

}
