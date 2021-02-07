import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CollapseModule, ModalModule } from 'ngx-bootstrap';
import { ComplainSharedModule } from "../shared/complain-shared.module";
import { AtmDetailComponent } from './detail/atm-detail.component';
import { ResponseAtmRoutingModule } from './response-atm-routing.module';
import { ResponseAtmComponent } from './table/response-atm.component';
import { TwitterDetailResponseComponent } from './twitter-detail/twitter-detail.component';
import { TwitterTableComponent } from './twitter-table/twitter-table.component';

@NgModule({
  declarations: [
    ResponseAtmComponent,
    AtmDetailComponent,
    TwitterTableComponent,
    TwitterDetailResponseComponent
  ],
  imports: [
    CommonModule,
    ResponseAtmRoutingModule,
    ComplainSharedModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot()
  ]
})
export class ResponseAtmModule {}
