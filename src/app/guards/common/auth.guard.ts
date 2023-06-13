import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { _isAuthenticated } from 'src/app/services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';


export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const toastrService: CustomToastrService = inject(CustomToastrService);

  if(!_isAuthenticated){
    router.navigate(["login"], {queryParams: {returnUrl: state.url}});
    toastrService.showMessage("Oturum açmalısınız!","Yetkisiz Erişim",{
      messageType:ToastrMessageType.Warning,
      position:ToastrPosition.TopRight
    });
  }

  return true;
};
