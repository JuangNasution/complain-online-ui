import { Component, forwardRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { PagedApiResponse, PageRequest } from '../../../lib/model';
import { Download, sortTableFn } from '../../../util';
import { TwitterTableComponent } from '../../export-atm/twitter-table/twitter-table.component';
import { ComplainList } from '../../model';
import { ComplainService } from '../../service';
import { ResponseAtmService } from '../../service/atm-complain.service';
export function dateFormat(date: Date): string {
  return `${date.getMonth() + 1}-${(date.getDate())}-${date.getFullYear()}`;
}
@Component({
  templateUrl: './export-table.component.html'
})
export class ExportTableComponent implements OnInit {

  isShowDetail: boolean = false;
  isFailed: boolean = false;
  form: FormGroup;
  ColumnMode = ColumnMode;
  maxDate: Date = new Date();
  expanded: boolean = false;
  data: PagedApiResponse<ComplainList>;
  loadingIndicator: boolean;
  page: PageRequest = new PageRequest();
  sortTableFn = sortTableFn;
  modalRef: BsModalRef;
  dataDetail: ComplainList;
  complainList: ComplainList;
  category: string;
  isTable: boolean[] = [false, false, false];
  isApply: boolean = false;
  @ViewChild(forwardRef(() =>TwitterTableComponent), { static: false })
  twitterTableComponent: TwitterTableComponent;

  constructor(private responseAtmService: ResponseAtmService,
    private fb: FormBuilder,
    private complainService: ComplainService,
    private router: Router,
    private modalService: BsModalService,) {
      this.form = this.fb.group({
        fromDate: new FormControl(new Date(), Validators.required),
        toDate: new FormControl(new Date(), Validators.required),
        category: 'atm'
      })
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
    this.getHistory();
    this.isTable[0] = true;
    if (this.router.url == '/complain-online/export-atm') {
      this.category = 'ATM';
    } else {
      this.category = "e-Channel";
    }
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
  getHistoryDetail(id: string) {
    this.isShowDetail = false;
    this.complainService.get(id)
      .pipe(finalize(() => this.isShowDetail = true))
      .subscribe(data => this.complainList = data);
  }

  getDetailData(data: ComplainList, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.dataDetail = data;
  }

  downloadMonitoring() {
      this.responseAtmService.downloadMonitoring(this.form,this.category)
        .subscribe(data => Download(data));

  }
  getHistory(pageNumber: number = 1) {
    this.loadingIndicator = true;
    this.page.page = pageNumber;

    this.responseAtmService.getHistoryMonitoring(this.form, this.category, this.page)
      .pipe(
        finalize(() => this.loadingIndicator = false)
      ).subscribe(data => this.data = data);
  }
  onSubmit() {
    this.form.markAllAsTouched();
    this.isFailed = false;
    if (this.form.value.toDate < this.form.value.fromDate) {
      this.isFailed = true;
      return;
    }

    if (!this.form.valid) {
      return;
    }
      this.getHistory();
      this.twitterTableComponent.getHistoryTwt();

  }
}
