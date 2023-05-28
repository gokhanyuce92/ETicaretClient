import { Component, Inject, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.css']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent>{
  constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState |string
    ){
    super(dialogRef)
  }

  @Output() options: Partial<FileUploadOptions>={
    controller: "products",
    action: "upload",
    explanation: "Ürün resmini seçin veya buraya sürükleyin..",
    isAdminPage: true,
    accept:".png, .jpg, .jpeg, .gif",
    queryString: `id=${this.data}`
  }
}

export enum SelectProductImageState {
  Close
}