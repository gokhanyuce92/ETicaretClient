import { Inject, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor(@Inject("baseSignalRUrl") private baseSignalRUrl: string) { }

  start(hubUrl: string) {
    hubUrl = this.baseSignalRUrl + hubUrl;

    const hubConnection: HubConnection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl)  
        .withAutomaticReconnect()
        .build();

      hubConnection.start()
        .then(() => { })
        .catch(error=>setTimeout(()=> this.start(hubUrl), 2000));

    
    hubConnection.onreconnected(connectionId=>console.log("Reconnected"));
    hubConnection.onreconnecting(error=> console.log("Reconnecting"));
    hubConnection.onclose(error=> console.log("Close reconnecting"));
    return hubConnection;
  };

  invoke(hubUrl: string, procedureName: string, message: any, successCallBack?:(value)=>void, errorCallBack?:(error)=>void) {
    this.start(hubUrl).invoke(procedureName,message)
      .then(successCallBack)
      .catch(errorCallBack);
  }

  on(hubUrl: string, procedureName: string, callBack: (...message)=>void) {
    this.start(hubUrl).on(procedureName,callBack);
  }

}
