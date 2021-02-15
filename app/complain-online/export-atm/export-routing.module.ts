import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ExportTableComponent } from "./table/export-table.component";

const routes: Routes = [
  {
    path: '',
    component: ExportTableComponent,
    data: {
      title: 'Export',
      editable: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExportTableRoutingModule {
}
