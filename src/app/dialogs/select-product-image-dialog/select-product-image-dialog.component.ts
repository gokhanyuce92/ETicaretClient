import { Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { List_Product_Image } from 'src/app/contracts/list-product-image';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';

declare var $:any;

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.css']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit{
  constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState |string,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private dialogService: DialogService
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

  images: List_Product_Image[];

  async getImages(){
    this.spinner.show(SpinnerType.BallAtom);
    this.images = await this.productService.readImages(this.data as string,()=>{
      this.spinner.hide(SpinnerType.BallAtom);
    });
  }

  async ngOnInit(): Promise<void> {
    this.getImages();
  }

  async deleteImage(imageId: string, event:any) {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed:async ()=>{
        this.spinner.show(SpinnerType.BallAtom);
        await this.productService.deleteImage(this.data as string, imageId,()=>{
          this.spinner.hide(SpinnerType.BallAtom);
          var card=$(event.srcElement).parent().parent();
          card.fadeOut(500);
        });
      }
    })
  }
  async showcase(imageId: string){
    this.spinner.show(SpinnerType.BallAtom);
    await this.productService.changeShowcaseImage(imageId,this.data as string,()=>{
      this.spinner.hide(SpinnerType.BallAtom);
    });
  }
}

export enum SelectProductImageState {
  Close
}