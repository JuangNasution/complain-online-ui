import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import Swal from 'sweetalert2';
import { PageRequest } from '../../../lib/model';
import { isFieldInvalid, sortTableFn } from '../../../util';
import { categories } from '../../create-complain/create-category.model';
import { ComplainTwitter, twitDummy } from '../../model';
import { ComplainService, TwitterComplainService } from '../../service';
import { finalize } from 'rxjs/operators';

@Component({

  templateUrl: './response-admin.component.html',
  styleUrls: ['response-admin.component.css']
})
export class ResponseTwitterComponent implements OnInit {

  // @Input() searchTerm: string;
  page: PageRequest = new PageRequest();
  sortTableFn = sortTableFn;

  ColumnMode = ColumnMode;

  data: ComplainTwitter;
  // data: ComplainTwitter[];
  dataDetail: ComplainTwitter;


  expanded: boolean = false;
  loadingIndicator: boolean;

  modalRef: BsModalRef;


  constructor(
    public location: Location,
    private complainService: ComplainService,
    private twitterComplainService: TwitterComplainService,
    private modalService: BsModalService
    ) {

    }

  ngOnInit() {
    this.getTwit();
  }
  modalSubmit(twit:ComplainTwitter, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.dataDetail = twit;
  }

  onSendTwit(){

  }
  dropTwt(id:string) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, drop it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.twitterComplainService.dropTwt(id)
        .subscribe(
          res => {
            if (res) {
              Swal.fire('Success!', 'Status Has Been Dropped', 'success').then(function () {
                location.reload();
            });
            }
          })
      }
    })

  }

  getTwit() {
    this.loadingIndicator = true;
    // this.data= twitDummy;

    this.twitterComplainService
      .getTwit()
      .pipe(finalize(() => this.loadingIndicator = false))
      .subscribe(data => this.data= data);
  }


  // async onSendTwit(twit:ComplainTwitter ){
  //   console.log(twit)
  //   var options = {};
  //   categories.map(item => {
  //     options[item.value] = item.name;
  //   })

  //   const { value: category } = await Swal.fire({
  //     title: 'Category Complain',
  //     input: 'select',
  //     inputOptions:options,
  //     inputPlaceholder: 'Select a Category',
  //     showCancelButton: true,
  //     inputValidator: result => !result && 'You need to select something!',
  //   })

  //   if (category) {
  //     this.complainService
  //     .add({
  //       cardId:33,
  //       category: category,
  //       complainDetail: twit.text,
  //       subject:"Twitter Complain"
  //     }).subscribe(() => this.location.back() );
  //     Swal.fire(`Complain send to <br> PIC ${category}`)
  //   }
  // }
}
