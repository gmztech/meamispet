import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ClientAdminSharedModule } from 'src/app/components/client-admin/client-admin.shared.nodule';

@NgModule({
  declarations: [ ClientComponent ],
  imports: [
    CommonModule,
    HttpClientModule,
    ClientAdminSharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ClientComponent,
      }
    ])
  ],
  providers: [ ]
})
export class ClientModule { }
