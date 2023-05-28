import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/create-product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private productService: ProductService, private alertify: AlertifyService){
    super(spinner)
  }

  @Output() createdProduct: EventEmitter<CreateProduct> = new EventEmitter();
  
  create(name:HTMLInputElement, stock:HTMLInputElement, price:HTMLInputElement){
    this.showSpinner(SpinnerType.BallAtom);

    const create_product: CreateProduct = new CreateProduct();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);

    this.productService.create(create_product, ()=>{
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.message("Ürün başarıyla eklenmiştir",{
        dismissOthers:true,
        messageType:MessageType.Success,
        position:Position.TopRight
      });
      this.createdProduct.emit(create_product);
    } , (err) => {
      this.alertify.message(err,{
        dismissOthers:true,
        messageType:MessageType.Error,
        position:Position.BottomRight
      });
    });
  }

  ngOnInit(): void {
    
  }
}
