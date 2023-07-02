import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor() { }

  private _connection: HubConnection;
  get connection(): HubConnection {
    return this._connection;
  }

  start(hubUrl: string) {
    if(!this._connection || this._connection?.state==HubConnectionState.Disconnected){
      const hubConnection: HubConnection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl)  
        .withAutomaticReconnect()
        .build();

      hubConnection.start()
        .then(() => { })
        .catch(error=>setTimeout(()=> this.start(hubUrl), 2000));

      this._connection=hubConnection;
    }
    
    this._connection.onreconnected(connectionId=>console.log("Reconnected"));
    this._connection.onreconnecting(error=> console.log("Reconnecting"));
    this._connection.onclose(error=> console.log("Close reconnecting"));
  };

  invoke(procedureName: string, message: any, successCallBack?:(value)=>void, errorCallBack?:(error)=>void) {
    this.connection.invoke(procedureName,message)
      .then(successCallBack)
      .catch(errorCallBack);
  }

  on(procedureName: string, callBack: (...message)=>void) {
    this.connection.on(procedureName,callBack);
  }

}
