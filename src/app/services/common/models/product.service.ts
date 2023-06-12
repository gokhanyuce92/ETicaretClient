
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateProduct } from 'src/app/contracts/create-product';
import { ListProduct } from 'src/app/contracts/list-product';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Product_Image } from 'src/app/contracts/list-product-image';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: CreateProduct, successCallback?:()=>void, errorCallBack?:(errorMessage:string)=>void){
    this.httpClientService.post({
      controller:"products"
    },product)
      .subscribe(result=>{
        successCallback();
      }, (errorResponse:HttpErrorResponse)=>{
        const _error: Array<{key:string, value:Array<string>}> = errorResponse.error;
        let message="";
        
        _error.forEach((v,index)=>{
          v.value.forEach((_v,_index)=>{
            message +=`${_v}<br/>`;
          });
        });
        errorCallBack(message);
      });
  }

  async list(page:number=0,size:number=5, successCallback?: ()=>void, errorCallBack?: (errorMessage:string)=>void) :Promise<{totalCount:number;products:ListProduct[]}> {
    const promiseData : Promise<{totalCount:number;products:ListProduct[]}> = this.httpClientService.get<{totalCount:number;products:ListProduct[]}>({
      controller:"products",
      queryString:`page=${page}&size=${size}`
    }).toPromise();

    promiseData
      .then(d=>successCallback())
      .catch((errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message));

    return await promiseData;
  }

  async delete(id: string){
      const deleteObservable: Observable<any>= this.httpClientService.delete<any>({
        controller: "products"
      }, id);

      await firstValueFrom(deleteObservable);
  }

  async readImages(id: string, successCallback?:()=>void): Promise<List_Product_Image[]> {
    const getObservable: Observable<List_Product_Image[]> = this.httpClientService.get<List_Product_Image[]>({
      action: "getProductImages",
      controller: "products"
    },id);

    const images: List_Product_Image[] = await firstValueFrom(getObservable);
    successCallback();
    return images;
  }

  async deleteImage(id: string, imageId:string, successCallback?:()=>void) {
    const deleteObservable = this.httpClientService.delete({
      action:"deleteproductimage",
      controller:"products",
      queryString: `imageId=${imageId}`
    },id);
    
    await firstValueFrom(deleteObservable);
    successCallback();
  }
}
 