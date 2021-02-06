import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDatepickerModule, CollapseModule, ModalModule } from 'ngx-bootstrap';
import { ComplainSharedModule } from "../shared/complain-shared.module";
import { ExportDetailComponent } from './search/export-search.component';
import { ExportTableRoutingModule } from './export-routing.module';
import { ExportTableComponent } from "./table/export-table.component";
import { ExporttDetailComponent } from './detail/export-detail.component';

@NgModule({
  declarations: [
    ExportTableComponent,
    ExportDetailComponent,
    ExporttDetailComponent
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
