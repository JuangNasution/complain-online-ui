import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { PagedApiResponse, PageRequest } from '../../../lib/model';
import { isFieldInvalid, normalizeFlag, sortTableFn } from '../../../util';
import { ComplainList, ComplainTwitter } from '../../model';
import { ComplainTwitterList } from '../../model/complain-list-twitter.model';
import { ResponseAtmService } from '../../service/atm-complain.service';

@Component({
  selector: 'twitter-datatable',
  templateUrl: './twitter-table.component.html'
})
export class TwitterTableComponent implements OnInit {

  ColumnMode = ColumnMode;
  expanded: boolean = false;
  data: PagedApiResponse<ComplainTwitterList>;
  loadingIndicator: boolean;
  page: PageRequest = new PageRequest();
  sortTableFn = sortTableFn;
  @Input() searchTerm: string;
  modalRef: BsModalRef;
  dataDetail: ComplainTwitterList;
  registerForm: FormGroup;
  responseComplain: string;
  href: string = "";
  category: string = "";
  isTable: boolean[] = [false, false, false];
  @Input() isApply: boolean[];
  // registerForm: FormGroup;
  isFieldInvalid = isFieldInvalid;

  constructor(private responseatmservice: ResponseAtmService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private router:Router
  ) {
    this.registerForm = this.formBuilder.group({
      complainResponse: new FormControl(null, Validators.required),
    });

  }

  get offset(): number {
    return !!(this.data && this.data.number) ? this.data.number : 0;
  }

  get rows(): Array<ComplainTwitterList> {
    return !!(this.data && this.data.content) ? this.data.content : [];
  }

  get totalElements(): number {
    return !!(this.data && this.data.totalElements) ? this.data.totalElements : 0;
  }

  ngOnInit() {
    this.getMenu();;
  }

  getDetailData(data: ComplainTwitterList, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.dataDetail = data;
  }

  onSubmit() {

    this.registerForm.markAllAsTouched();
    if (!this.registerForm.valid) {
      return;
    }

    this.responseatmservice.responseComplainTwt(this.dataDetail.noComplain, normalizeFlag(this.registerForm))
    .subscribe(
      res => {
        if (res) {
          Swal.fire('Success!', 'Your Response has been Recorded', 'success').then(function () {
            location.reload();
        });
        }
      })
  }
  openModal(data: ComplainTwitterList, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.dataDetail = data;
  }

  getMenu(pageNumber: number = 1) {
    this.loadingIndicator = true;
    this.page.page = pageNumber;
    let param: HttpParams = new HttpParams();
    param = this.page.requestParam;
    param = param.append('category', this.category);


    this.responseatmservice
      .getTableRowTwt(param)
      .pipe(finalize(() => this.loadingIndicator = false))
      .subscribe(data => this.data = data);
  }

}
