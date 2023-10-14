import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: CustomToastrService, private userAuthService: UserAuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error=>{

      switch(error.status){
        case HttpStatusCode.Unauthorized:
          // this.toastrService.showMessage("Yetkisiz işleme izin verilmiyor. Tekrar login olunuz", "Hata",{
          //   messageType: ToastrMessageType.Warning,
          //   position: ToastrPosition.BottomFullWidth
          // });

          this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken")).then(data=>{
          }).catch((err) => {
            this.toastrService.showMessage("Bu işlemi yapmaya yetkiniz bulunmamaktadır!", "Yetkisiz İşlem!",{
              messageType: ToastrMessageType.Warning,
              position: ToastrPosition.BottomFullWidth
            });
          })
          break;
        default:
          this.toastrService.showMessage(error.message, error.name,{
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          });
          break;
      }
      return of(error);
    }))
  }
}
