import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Role } from 'src/app/contracts/role/List_Role';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { RoleService } from 'src/app/services/common/models/role.service';

declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements AfterViewInit {
  constructor(spinner:NgxSpinnerService, 
    private roleService: RoleService, 
    private alertifyService:AlertifyService,
    private dialogService: DialogService){
    super(spinner)
  }

  displayedColumns: string[] = ['name', 'edit','delete'];
  dataSource: MatTableDataSource<List_Role> =null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  async getRoles() {
    this.showSpinner(SpinnerType.BallAtom);

    const allRoles:{datas: List_Role[], totalCount: number} =await this.roleService.getRoles(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5,
      ()=>this.hideSpinner(SpinnerType.BallAtom),
      (errorMessage:string)=>{
      this.alertifyService.message(errorMessage,{
        dismissOthers:true,
        messageType:MessageType.Error,
        position:Position.BottomRight
      });
    });
  
    this.dataSource =new MatTableDataSource<List_Role>(allRoles.datas);
    this.paginator.length=allRoles.totalCount;
  }

  async pageChanged(){
    await this.getRoles();
  }

  async ngAfterViewInit() {
    await this.getRoles();
  }
}
