import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { RegisterService } from '../../../complain-online/register/register.service';
import { isFieldInvalid, normalizeFlag } from '../../../util';


@Component({
  templateUrl: 'Activation.component.html',
  styleUrls: ['error.component.scss']
})
export class ActivationComponent implements OnInit {

  private response: number;
  public title: String ;
  public body: String ;
  public icon: String ;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private registerService: RegisterService,
    ) {

  }

  ngOnInit() {
    // console.log(this.route.snapshot.params.id);
    this.registerService.activation({
      "confirmationToken": this.route.snapshot.params.id,
    })
    .subscribe(data => this.response = data);

    if(this.response === 103){
      this.title = "Success.";
      this.body = "Your account has been activated..";
      this.icon = "fa fa-check";
    }else if(this.response === 102){
      this.title = "Wrong Url";
      this.body = "";
      this.icon = "fa fa-user-times";
    }else if(this.response === 101){
      this.title = "Activated";
      this.body = "Your Account Has Been Activated.";
      this.icon = "fa user-os";
    }else{
      this.title = "Something Wrong";
      this.body = "Contact Customer Service";
      this.icon = "fa fa-user-times";
    }
  }

  onGoHome() {
    this.router.navigateByUrl('\login');
  }

}
