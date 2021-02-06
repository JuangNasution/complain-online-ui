import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Complain Online'
    },
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: "register",
        loadChildren: () => import('./register/register.module').then(mod => mod.RegisterModule)
      },
      {
        path: "create",
        loadChildren: () => import('./create-complain/create-complain.module').then(mod => mod.CreateComplainModule)
      },
      {
        path: "track",
        loadChildren: () => import('./tracking-complain/tracking-complain.module').then(mod => mod.CreateComplainModule)
      },
      {
        path: "response-atm",
        loadChildren: () => import('./response-atm/response-atm.module').then(mod => mod.ResponseAtmModule)
      },
      {
        path: "export-atm",
        loadChildren: () => import('./export-atm/export.module').then(mod => mod.ExportModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComplainRoutingModule {}
