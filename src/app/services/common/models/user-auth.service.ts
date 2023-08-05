import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { SocialUser } from '@abacritt/angularx-social-login';
import { Observable, firstValueFrom } from 'rxjs';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) { }

  async login(usernameOrEmail: string, password: string, successCallback?: ()=>void) : Promise<void>{
    const observable: Observable<any | TokenResponse>= this.httpClientService.post<any | TokenResponse>({
      action:"login",
      controller:"auth"
    },{usernameOrEmail,password});

    const tokenResponse: TokenResponse =  await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse){
      localStorage.setItem("accessToken",tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken",tokenResponse.token.refreshToken);

      this.toastrService.showMessage("Kullanıcı girişi başarıyla sağlanmıstır","Giriş Başarılı",{
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      });
    }

    successCallback();
  }

  async googleLogin(user:SocialUser, callBackFunction?: ()=>void): Promise<any>{
    const observable:Observable<SocialUser | TokenResponse>= this.httpClientService.post<SocialUser | TokenResponse>({
      action:"google-login",
      controller:"auth"
    }, user);
    const tokenResponse : TokenResponse =  await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse){
      localStorage.setItem("accessToken",tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken",tokenResponse.token.refreshToken);

      this.toastrService.showMessage("Google üzerinden giriş yapıldı", "Giriş Başarılı",{
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      });
    }
    callBackFunction();
  }

  async refreshTokenLogin(refreshToken: string, callBackFunction?:()=>void): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post({
      action:"refreshtokenlogin",
      controller:"auth"
    },{refreshToken:refreshToken});

    const tokenResponse: TokenResponse= await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse){
      localStorage.setItem("accessToken",tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken",tokenResponse.token.refreshToken);
    }
    callBackFunction();
  }

  async passwordReset(email:string, callBackFunction?:()=>void) {
    const observable: Observable<any> = this.httpClientService.post({
      "controller": "auth",
      "action": "password-reset"
    },{email:email});

    await firstValueFrom(observable);
    callBackFunction();
  }

  async verifyResetToken(resetToken: string, userId: string, callBackFunction?: ()=> void): Promise<boolean> {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "auth",
      action: "verify-reset-token"
    },{
      resetToken: resetToken,
      userId: userId
    });

    const state: boolean= await firstValueFrom(observable);
    callBackFunction();
    return state;
  }

}
