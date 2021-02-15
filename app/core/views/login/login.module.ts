import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login.component";
import { CommonModule } from "@angular/common";
import { LoginRoutingModule } from "./login-routing.module";
import { ModalModule } from 'ngx-bootstrap/modal';
import { RegisterComponent } from "../../../complain-online/register/form/register.component";


import { NgxMaskModule, IConfig } from 'ngx-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    NgxMaskModule.forRoot(options),
  ],
  declarations: [LoginComponent, RegisterComponent]
})
export class LoginModule {
}
