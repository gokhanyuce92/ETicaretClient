import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: CustomToastrService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error=>{

      // switch(error.status){
      //   case HttpStatusCode.InternalServerError:
      //     alert('hata1');
      //     break;
      //   default:
      //     alert('hata2');
      //     break;
      // }
      this.toastrService.showMessage(error.message, error.name,{
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.BottomFullWidth
      });
      return of(error);
    }))
  }
}
