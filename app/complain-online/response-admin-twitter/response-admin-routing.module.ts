import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ResponseTwitterComponent } from "./table/response-admin.component";

const routes: Routes = [
  {
    path: '',
    component: ResponseTwitterComponent,
    data: {
      title: 'Response',
      editable: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResponseAtmRoutingModule {
}
