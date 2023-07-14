import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { BaseUrl } from 'src/app/contracts/base-url';
import { Create_Basket_Item } from 'src/app/contracts/basket/create-basket-item';
import { ListProduct } from 'src/app/contracts/list-product';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, 
    private fileService: FileService, spinner: NgxSpinnerService, private basketService: BasketService, private customToastrService: CustomToastrService){
      super(spinner);
    }

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

  async addToBasket(product: ListProduct){
    this.showSpinner(SpinnerType.BallAtom);
    let _basketItem: Create_Basket_Item = new Create_Basket_Item();
    _basketItem.productId= product.id;
    _basketItem.quantity = 1;

    await this.basketService.add(_basketItem);
    this.hideSpinner(SpinnerType.BallAtom);

    this.customToastrService.showMessage("Ürün sepete eklenmiştir.","Sepete Eklendi",{
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight
    });
  }


}