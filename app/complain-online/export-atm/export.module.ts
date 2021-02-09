import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDatepickerModule, CollapseModule, ModalModule } from 'ngx-bootstrap';
import { TwitterDetailResponseComponent } from '../export-atm/twitter-detail/twitter-detail.component';
import { ComplainSharedModule } from "../shared/complain-shared.module";
import { ExporttDetailComponent } from './detail/export-detail.component';
import { ExportTableRoutingModule } from './export-routing.module';
import { ExportTableComponent } from "./table/export-table.component";
import { TwitterTableComponent } from './twitter-table/twitter-table.component';

@NgModule({
  declarations: [
    ExportTableComponent,
    ExporttDetailComponent,
    TwitterTableComponent,
    TwitterDetailResponseComponent
  ],
  imports: [
    CommonModule,
    ExportTableRoutingModule,
    ComplainSharedModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    BsDatepickerModule,
  ]
})
export class ExportModule {}
