import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { PagedApiResponse, PageRequest } from '../../../lib/model';
import { sortTableFn } from '../../../util';
import { ComplainList } from '../../model';
import { ResponseAtmService } from '../../service/atm-complain.service';

@Component({
  selector: 'export-complain-detail',
  templateUrl: 'export-search.component.html'
})
export class ExportDetailComponent implements OnInit {
  complainList: ComplainList;
  @Input() dataDetail: ComplainList;
  isDetail: boolean = true;
  isResponse: boolean = true;
  data: PagedApiResponse<ComplainList>;
  page: PageRequest = new PageRequest();
  ColumnMode = ColumnMode;
  sortTableFn = sortTableFn;
  loadingIndicator: boolean = false;
  expanded: boolean = false;
  title: string = '';
  id: number;
  modalRef: BsModalRef;

  category: string = "";
  @Input() form: FormGroup;
  @Output() historyDetail = new EventEmitter();
  @Output() downloadAction = new EventEmitter();


  constructor(private responseAtmResponse: ResponseAtmService,
    private modalService: BsModalService,
    private router: Router) { }
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
    if (this.router.url == '/complain-online/export-atm') {
      this.category = 'ATM';
    } else {
      this.category = "e-Channel";
    }
    this.getHistory();
  }
  getHistory(pageNumber: number = 1) {
    this.loadingIndicator = true;
    this.page.page = pageNumber;

    this.responseAtmResponse.getHistoryMonitoring(this.form, this.category, this.page)
      .pipe(
        finalize(() => this.loadingIndicator = false)
      ).subscribe(data => this.data = data);
  }

  goDetail(id: string) {
    this.historyDetail.emit(id);
  }

  downloadMonitoring() {
    this.downloadAction.emit(true);
  }
  getDetailData(data: ComplainList, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.dataDetail = data;
  }
}
