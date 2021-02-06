import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComplainSharedModule } from "../shared/complain-shared.module";
import { ResponseAtmRoutingModule } from './response-admin-routing.module';
import { ResponseTwitterComponent } from './table/response-admin.component';
import { TwitterDetailComponent } from './detail/twitter-detail.component'
import { CollapseModule, ModalModule } from 'ngx-bootstrap';
import { MatCardModule } from '@angular/material/card';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [
    ResponseTwitterComponent,
    TwitterDetailComponent
  ],
  imports: [
    CommonModule,
    ResponseAtmRoutingModule,
    ComplainSharedModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    SweetAlert2Module.forRoot(),
    // MatCardModule
  ]
})
export class ResponseAtmModule {}
