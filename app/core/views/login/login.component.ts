import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
  @ViewChild(RegisterComponent, { static: false }) register: RegisterComponent
  isDevelopment = !environment.production;
  userLogin = {
    username: '',
    password: '',
    rememberMe: false,
  };
  confirmationToken: string;
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
      confirmationToken: new FormControl(null, Validators.required)
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

    // this.registerService.activation(normalizeFlag(this.registerForm))
    //   .subscribe(
    //     res => {
    //       if (res == 'Wrong Token') {
    //         Swal.fire('Failed!', res.toString(), 'error')
    //       }else if (res == 'Your Account Already Activated') {
    //         Swal.fire('Failed!', res.toString() , 'error').then(function () {
    //           location.reload();
    //       });
    //       } else {
    //         Swal.fire('Congratulations!', res.toString() , 'success').then(function () {
    //           location.reload();
    //       });
    //       }
    //     }
    //   )
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

  }
  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.authService.logout();
    }
  }
}
