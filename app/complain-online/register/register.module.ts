import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { RegisterComponent } from './form/register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({

  imports: [
    CommonModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    NgxMaskModule.forChild(),

  ],
  declarations: [RegisterComponent],

})
export class RegisterModule {}
