import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CreateComponent } from './create/create.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ListComponent } from './list/list.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DeleteDirective } from 'src/app/directives/admin/delete.directive';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';
import { DialogsModule } from 'src/app/dialogs/dialogs.module';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete.directive.module';

@NgModule({
  declarations: [
    ProductsComponent,
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {"path":"",component:ProductsComponent}
    ]),
    MatSidenavModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatTableModule,MatPaginatorModule, 
    DialogsModule,FileUploadModule,
    DeleteDirectiveModule
  ]
  // ,
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ProductsModule { }
