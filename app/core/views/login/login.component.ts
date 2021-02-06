import { HttpErrorResponse } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { RegisterComponent } from '../../../complain-online/register/form/register.component';
import { RegisterService } from '../../../complain-online/register/register.service';
import { isFieldInvalid, normalizeFlag } from '../../../util';
import { AuthService } from '../../services';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})

export class LoginComponent implements OnInit {
  // @ViewChild('template', {static: false}) template: ModalDirective;
  @ViewChild(RegisterComponent, {static: false}) register: RegisterComponent
  isDevelopment = !environment.production;
  userLogin = {
    username: '',
    password: '',
    rememberMe: false,
  };
  token: string;
  modalRef: BsModalRef;
  wrongPassword: boolean = false;
  registerForm: FormGroup;
  // registerForm: FormGroup;
  isFieldInvalid = isFieldInvalid;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private modalService: BsModalService,
    private registerService: RegisterService
    // private formBuilder: FormBuilder,
    // private registerService: RegisterService
  ) {
    this.registerForm = this.formBuilder.group({
      token: new FormControl(null, Validators.required)
    });

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSubmit() {
    this.registerForm.markAllAsTouched();
    if (!this.registerForm.valid) {
      return;
    }

    this.registerService.activation(normalizeFlag(this.registerForm.get('token')))
      .subscribe(
        res => {
          if (res == 'Wrong Token') {
            Swal.fire('Failed!', res, 'error')
          }else if (res == 'Your Account Already Activated') {
            Swal.fire('Failed!', res , 'error')
          } else {
            Swal.fire('Congratulations!', res , 'success')
          }
        }
      )
  }
  onLogin(loginForm: NgForm) {
    this.wrongPassword = false;
    if (!loginForm.form.valid) {
      return;
    }
    this.authService.login(this.userLogin.username, this.userLogin.password)
    .subscribe(
      _ => this.router.navigateByUrl('/dashboard'),
      (error: HttpErrorResponse) => {
        let errorResponse = error as HttpErrorResponse;
        if (errorResponse.status === 401 || errorResponse.status === 400) {
          this.wrongPassword = true;
        }
      }
    );
    // this.registerService.loginTemp(this.userLogin.username, this.userLogin.password)
    //   .subscribe(
    //     res => {
    //       if (res == 'email not found') {
    //         Swal.fire('Failed!', res, 'error')
    //       }else if (res == 'wrong password') {
    //         Swal.fire('Failed!', res , 'error')
    //       } else if (res == 'account not activated yet') {
    //         Swal.fire('Failed!', res , 'error')
    //       } else {
    //         this.authService.login(this.userLogin.username, this.userLogin.password)
    //         .subscribe(
    //           _ => this.router.navigateByUrl('/dashboard'),
    //           (error: HttpErrorResponse) => {
    //             let errorResponse = error as HttpErrorResponse;
    //             if (errorResponse.status === 401 || errorResponse.status === 400) {
    //               this.wrongPassword = true;
    //             }
    //           }
    //         );
    //       }
    //   }
    // )
  }
  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.authService.logout();
    }
  }
}
