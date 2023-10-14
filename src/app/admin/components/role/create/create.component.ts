import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { RoleService } from 'src/app/services/common/models/role.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private roleService: RoleService, private alertify: AlertifyService){
    super(spinner)
  }

  @Output() createdRole: EventEmitter<string> = new EventEmitter();
  
  create(name:HTMLInputElement){
    this.showSpinner(SpinnerType.BallAtom);

    this.roleService.create(name.value, ()=>{
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.message("Rol başarıyla eklenmiştir",{
        dismissOthers:true,
        messageType:MessageType.Success,
        position:Position.TopRight
      });
      this.createdRole.emit(name.value);
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