import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BsModalRef } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { PagedApiResponse, PageRequest } from '../../../lib/model';
import { Download, sortTableFn } from '../../../util';
import { ComplainList } from '../../model';
import { ComplainService } from '../../service';
import { ResponseAtmService } from '../../service/atm-complain.service';
import { ExportDetailComponent } from '../search/export-search.component';

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
  @ViewChild(ExportDetailComponent, { static: false })
  exportDetailComponent: ExportDetailComponent;

  constructor(private responseAtmService: ResponseAtmService,
    private fb: FormBuilder,
    private complainService: ComplainService,
    private router: Router) {
      this.form = this.fb.group({
        fromDate: new FormControl(new Date(), Validators.required),
        toDate: new FormControl(new Date(), Validators.required),
        category: 'atm'
      })
     }
  ngOnInit() {
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

  downloadMonitoring(isDownloaded: boolean) {
    if (isDownloaded) {
      this.responseAtmService.downloadMonitoring(this.form,this.category)
        .subscribe(data => Download(data));
    }
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
    this.exportDetailComponent.getHistory();
  }
}
