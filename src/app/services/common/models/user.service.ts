import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/entities/user';
import { Create_User } from 'src/app/contracts/user/create-user';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService) { }

  async create(user: User): Promise<Create_User>{
    const observable: Observable<Create_User | User>= this.httpClientService.post<Create_User | User>({
      controller:"users"
    },user);
    
    return await firstValueFrom(observable) as Create_User;
  }

  async login(usernameOrEmail: string, password: string, successCallback?: ()=>void) : Promise<void>{
    const observable: Observable<any>= this.httpClientService.post({
      controller:"users",
      action:"login"
    },{usernameOrEmail,password});

    await firstValueFrom(observable);
    successCallback();
  }
}
