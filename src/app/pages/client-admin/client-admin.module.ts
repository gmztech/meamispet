import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ClientAdminTemplateComponent } from './client-admin-template.component';
import { ClientAdminSharedModule } from 'src/app/components/client-admin/client-admin.shared.nodule';

@NgModule({
  declarations: [ClientAdminTemplateComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ClientAdminSharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ClientAdminTemplateComponent,
      }
    ])
  ],
  providers: [ ]
})
export class ClientAdminModule { }
