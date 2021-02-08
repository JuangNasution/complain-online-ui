import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { categories } from '../../create-complain/create-category.model';
import { ComplainTwitter } from '../../model';
import { ComplainService, TwitterComplainService } from '../../service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { isFieldInvalid } from '../../../util';

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
    }).subscribe(() => this.location.back() );
    // console.log(this.complainTwitterForm.value);
  }

}
