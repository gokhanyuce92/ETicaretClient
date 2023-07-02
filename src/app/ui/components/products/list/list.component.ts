import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseUrl } from 'src/app/contracts/base-url';
import { ListProduct } from 'src/app/contracts/list-product';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private fileService: FileService){}

  currentPageIndex: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number = 12;
  pageList: number[]=[];
  baseUrl: BaseUrl;
  products: ListProduct[];

  async ngOnInit() {
    this.baseUrl =await this.fileService.getBaseStorageUrl();

    this.activatedRoute.params.subscribe(async params=>{
      this.currentPageIndex=parseInt(params["pageIndex"] ?? 1);
      
      const data: {totalProductCount:number,products:ListProduct[]} =await this.productService.list(this.currentPageIndex-1,this.pageSize,
        ()=>{
        },errorMessage=>{

        });
      this.products = data.products;
      
      this.products = this.products.map<ListProduct>(p=>{
        const listProduct: ListProduct = {
          id: p.id,
          createdDate: p.createdDate,
          imagePath: p.productImageFiles.length ? p.productImageFiles.find(p=>p.showcase).path : "",
          name: p.name,
          price: p.price,
          stock: p.stock,
          updatedDate: p.updatedDate,
          productImageFiles: p.productImageFiles
        };
        return listProduct;
      });

      this.totalProductCount = data.totalProductCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);

      this.pageList=[];
      if(this.currentPageIndex -3 <= 0){
        for(let i=1; i<=7; i++){
          this.pageList.push(i);
        }
      }
      else if(this.currentPageIndex+3 >= this.totalPageCount){
        for(let i=this.totalPageCount-6; i<=this.totalPageCount; i++){
          this.pageList.push(i);
        }
      }
      else{
        for(let i=this.currentPageIndex-3; i<=this.currentPageIndex+3; i++){
          this.pageList.push(i);
        }
      }
    });
  }
}