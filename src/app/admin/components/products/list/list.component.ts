import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListProduct } from 'src/app/contracts/list-product';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements AfterViewInit {
  constructor(spinner:NgxSpinnerService, 
    private productService:ProductService, 
    private alertifyService:AlertifyService,
    private dialogService: DialogService){
    super(spinner)
  }

  displayedColumns: string[] = ['name', 'stock', 'price','createdDate','updatedDate','photos','edit','delete'];
  dataSource: MatTableDataSource<ListProduct> =null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  async getProducts() {
    this.showSpinner(SpinnerType.BallAtom);

    const allProducts:{totalCount:number; products:ListProduct[]} =await this.productService.list(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5,
      ()=>this.hideSpinner(SpinnerType.BallAtom),
      (errorMessage:string)=>{
      this.alertifyService.message(errorMessage,{
        dismissOthers:true,
        messageType:MessageType.Error,
        position:Position.BottomRight
      });
    });
  
    this.dataSource =new MatTableDataSource<ListProduct>(allProducts.products);
    this.paginator.length=allProducts.totalCount;
    // this.dataSource.paginator=this.paginator;
  }

  async pageChanged(){
    await this.getProducts();
  }

  async ngAfterViewInit() {
    await this.getProducts();
  }

  addProductImages(id: string) {
    this.dialogService.openDialog({
      componentType: SelectProductImageDialogComponent,
      data: id,
      options: {
        width: "1200px"
      }
    });
  }
  
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
