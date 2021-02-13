import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import Swal from 'sweetalert2';
import { ComplainTwitter, twitDummy } from '../../model';
import { ComplainService, TwitterComplainService } from '../../service';
import { HttpParams } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

@Component({

  templateUrl: './response-admin.component.html',
  styleUrls: ['response-admin.component.css']
})
export class ResponseTwitterComponent implements OnInit {

  // @Input() searchTerm: string;

  ColumnMode = ColumnMode;
  page: number = 1;
  itemPage: number = 6;
  itemTotal: number;
  totalRecord: number;

  // data: [];
  data1: ComplainTwitter[] = [];
  data: ComplainTwitter;
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

  loadMore() {

    this.page = this.page +1
    let param: HttpParams = new HttpParams();
    param = param.append('count', `${this.itemPage}`);
    param = param.append('page', `${this.page}`);

    // console.log(param)

    this.twitterComplainService
      .getTwitPage(param)
      .pipe(finalize(() => this.loadingIndicator = false))
      .subscribe(data => {
        console.table(data)
      });
  }

  getTwit() {
    this.loadingIndicator = true;
    let param: HttpParams = new HttpParams();
    param = param.append('count', `6`);
    param = param.append('page', `1`);
    // this.data = twitDummy;

    this.twitterComplainService
      .getTwit(param)
      .pipe(finalize(() => this.loadingIndicator = false))
      .subscribe(data => this.data = data);
  }
}

