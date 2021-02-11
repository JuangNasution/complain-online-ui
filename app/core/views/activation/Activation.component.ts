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

  public response: number;
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
    this.registerService.activation(
      this.route.snapshot.params.id
    )
      .subscribe(data => {
        if(data === 100){
          this.title = "Success.";
          this.body = "Your account has been activated..";
          this.icon = "fa fa-check";
        } else if (data === 102) {
          this.title = "Expired";
          this.body = "";
          this.icon = "fa fa-user-times";
        }else if(data === 104){
          this.title = "Activated";
          this.body = "Your Account already Activated.";
          this.icon = "fa user-os";
        }else if(data=== 103){
          this.on404();
        }else{
          this.on500();
        }
      });

      console.log(this.response)

  }

  on404() {
    this.router.navigateByUrl('');
  }

  on500() {
    this.router.navigateByUrl('');
  }

  onLogin() {
    this.router.navigateByUrl('\login');
  }

}
