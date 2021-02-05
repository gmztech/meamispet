import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientAdminComponent } from './client-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ ClientAdminComponent ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ ],
  exports: [ ClientAdminComponent ]
})
export class ClientAdminSharedModule { }
