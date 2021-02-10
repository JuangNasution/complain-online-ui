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
  href: string = "";
  category: string = "";
  isTable: boolean[] = [false, false, false];
  // registerForm: FormGroup;
  isFieldInvalid = isFieldInvalid;

  constructor(private responseatmservice: ResponseAtmService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private router:Router
  ) {
    this.registerForm = this.formBuilder.group({
      complainResponse: new FormControl(null, Validators.required),
      subject: new FormControl(null, Validators.required),
      complainDetail: new FormControl(null, Validators.required),
      noComplain: new FormControl(null, Validators.required),
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
    this.isTable[0] = true;
    if (this.router.url == '/complain-online/response-atm') {
      this.category = 'ATM';
    } else {
      this.category = "e-Channel";
    }
    this.getMenu();
  }

  getDetailData(data: ComplainList, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.dataDetail = data;
  }
  tabClickOnChange(tabMenu: number) {
    for (let i = 0; i <= this.isTable.length - 1; i++) {
      if (i == tabMenu) {
        this.isTable[i] = true;
      } else {
        this.isTable[i] = false;
      }
    }
  }
  onSubmit() {

    this.registerForm.markAllAsTouched();
    if (!this.registerForm.valid) {
      return;
    }

    this.responseatmservice.responseComplain(this.dataDetail.noComplain, normalizeFlag(this.registerForm))
    .subscribe(
      res => {
        if (res) {
          Swal.fire('Success!', 'Your Response has been Recorded', 'success').then(function () {
            location.reload();
        });
        }
      })
  }
  openModal(data: ComplainList, template: TemplateRef<any>) {
    this.registerForm.patchValue({
      "subject":data.subject,
      "complainDetail":data.complainDetail,
      "noComplain":data.noComplain,
    })
    this.modalRef = this.modalService.show(template);
    this.dataDetail = data;
  }

  getMenu(pageNumber: number = 0) {
    this.loadingIndicator = true;
    this.page.page = pageNumber;
    let param: HttpParams = new HttpParams();
    param = this.page.requestParam;
    param = param.append('category', this.category);


    this.responseatmservice
      .getTableRow(param)
      .pipe(finalize(() => this.loadingIndicator = false))
      .subscribe(data => this.data = data);
  }

}
