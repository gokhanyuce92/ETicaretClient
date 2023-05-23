import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListProduct } from 'src/app/contracts/list-product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements AfterViewInit {
  constructor(spinner:NgxSpinnerService, private productService:ProductService, private alertifyService:AlertifyService){
    super(spinner)
  }

  displayedColumns: string[] = ['name', 'stock', 'price','createdDate','updatedDate','edit','delete'];
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

  // delete(id:string, event){
  //   const img: HTMLImageElement = event.srcElement;
  //   $(img.parentElement.parentElement).fadeOut(1000);
  // }

  async ngAfterViewInit() {
    await this.getProducts();
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
