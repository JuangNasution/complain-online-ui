import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { isFieldInvalid } from '../../../util';
import { categories } from '../../create-complain/create-category.model';
import { ComplainTwitter } from '../../model';
import { ComplainService, TwitterComplainService } from '../../service';

@Component({
  selector: 'twitter-detail',
  templateUrl: 'twitter-detail.component.html'
})
export class TwitterDetailComponent implements OnInit {
  @Input() dataDetail: ComplainTwitter;
  complainTwitter: ComplainTwitter;
  categories= categories;
  isDetail: boolean = true;
  isResponse: boolean = true;
  subject:String;
  category:String;

  complainTwitterForm: FormGroup;
  isFieldInvalid = isFieldInvalid;

  constructor(
    private complainService: ComplainService,
    public location: Location,
    private formBuilder: FormBuilder,
    private twitterComplainService: TwitterComplainService,
  ){
    this.complainTwitterForm = formBuilder.group({
      username: new FormControl('',Validators.required),
      complainDetail: new FormControl('',Validators.required),
      subject: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    })
   }

  ngOnInit() {
    this.complainTwitter = this.dataDetail;

    this.complainTwitterForm.patchValue({
      "username":this.complainTwitter.user,
      "complainDetail":this.complainTwitter.text,
    })

    // console.log(this.dataDetail)
  }

  onSubmit() {

    this.complainTwitterForm.markAllAsTouched();
    if (!this.complainTwitterForm.valid) {
      return;
    }

    this.twitterComplainService.add({
      "idStatus" : this.complainTwitter.id,
      "username" : this.complainTwitter.user,
      "subject" : this.subject,
      "category" : this.category,
      "complainDetail" : this.complainTwitter.text,
    }).subscribe(
      res => {
        if (res) {
          Swal.fire('Success!', 'Status sent to PIC', 'success').then(function () {
            location.reload();
        });
        }
      })
  }



}
