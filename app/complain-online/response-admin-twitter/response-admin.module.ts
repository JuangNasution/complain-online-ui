import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CollapseModule, ModalModule } from 'ngx-bootstrap';
import { ComplainSharedModule } from "../shared/complain-shared.module";
import { TwitterDetailComponent } from './detail/twitter-detail.component';
import { ResponseAtmRoutingModule } from './response-admin-routing.module';
import { ResponseTwitterComponent } from './table/response-admin.component';
import { NgxPaginationModule } from 'ngx-pagination';


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
    NgxPaginationModule,
    // MatCardModule
  ]
})
export class ResponseAtmModule {}
