import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alert',
  template: ''
})
export class AlertComponent {
  constructor(private snackBar: MatSnackBar) { }

  showMessage(message: string, action: string, duration: number = 2000) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }
}
