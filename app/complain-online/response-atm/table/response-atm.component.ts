import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { PagedApiResponse, PageRequest } from '../../../lib/model';
import { isFieldInvalid, normalizeFlag, sortTableFn } from '../../../util';
import { ComplainList } from '../../model';
import { ResponseAtmService } from '../../service/atm-complain.service';

@Component({

  templateUrl: './response-atm.component.html'
})
export class ResponseAtmComponent implements OnInit {

  ColumnMode = ColumnMode;
  expanded: boolean = false;
  data: PagedApiResponse<ComplainList>;
  loadingIndicator: boolean;
  page: PageRequest = new PageRequest();
  sortTableFn = sortTableFn;
  @Input() searchTerm: string;
  modalRef: BsModalRef;
  dataDetail: ComplainList;
  registerForm: FormGroup;
  responseComplain: string;
  // registerForm: FormGroup;
  isFieldInvalid = isFieldInvalid;

  constructor(private responseatmservice: ResponseAtmService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
  ) {
    this.registerForm = this.formBuilder.group({
      responseComplain: new FormControl(null, Validators.required)
    });
  }

  get offset(): number {
    return !!(this.data && this.data.number) ? this.data.number : 0;
  }

  get rows(): Array<ComplainList> {
    return !!(this.data && this.data.content) ? this.data.content : [];
  }

  get totalElements(): number {
    return !!(this.data && this.data.totalElements) ? this.data.totalElements : 0;
  }

  ngOnInit() {
    this.getMenu();
  }
  getDetailData(data: ComplainList, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.dataDetail = data;
  }
  onSubmit() {

    this.registerForm.markAllAsTouched();
    console.log(normalizeFlag(this.registerForm.get('responseComplain')));
    if (!this.registerForm.valid) {
      return;
    }

    // this.responseatmservice.responseComplain(this.dataDetail.noComplain, normalizeFlag(this.registerForm.get('responseComplain')))
    // .subscribe(
    //   res => {
    //     if (res) {
    //       Swal.fire('Success!', 'Your Response has been Recorded', 'success').then(function () {
    //         location.reload();
    //     });
    //     }
    //   })
  }
  openModal(data: ComplainList, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.dataDetail = data;
  }

  getMenu(pageNumber: number = 1) {
    this.loadingIndicator = true;
    this.page.page = pageNumber;
    let param: HttpParams = new HttpParams();
    param = this.page.requestParam;
    param = param.append('category', 'ATM');


    this.responseatmservice
      .getTableRow(param)
      .pipe(finalize(() => this.loadingIndicator = false))
      .subscribe(data => this.data = data);
  }
}
