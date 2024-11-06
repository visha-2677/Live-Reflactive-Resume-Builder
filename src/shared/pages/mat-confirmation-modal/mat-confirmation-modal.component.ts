import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-mat-confirmation-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './mat-confirmation-modal.component.html',
  styleUrl: './mat-confirmation-modal.component.scss'
})
export class MatConfirmationModalComponent {
  public dialogTitle: any;
  public content: any;
  public btn1Content:any;
  public btn2Content:any;

  constructor(public dialogRef: MatDialogRef<MatConfirmationModalComponent>) { 
    console.log(this.btn1Content)
  }


  
  onAddClick(): void {
    // Close dialog and send back 'add' as the result
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    // Close dialog and send back 'no' as the result
    this.dialogRef.close(false);
  }

}
