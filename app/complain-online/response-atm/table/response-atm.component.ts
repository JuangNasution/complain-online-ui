import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { PagedApiResponse, PageRequest } from '../../../lib/model';
import { sortTableFn } from '../../../util';
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

  constructor(private responseatmservice: ResponseAtmService,
    private modalService: BsModalService) { }

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

  getMenu(pageNumber: number = 1) {
    this.loadingIndicator = true;
    this.page.page = pageNumber;
    let param: HttpParams = new HttpParams();
    param = this.page.requestParam;
    let searchTerm = '';
    // param = param.append('searchTerm', searchTerm ? searchTerm : '');
    param = param.append('category', 'ATM');


    this.responseatmservice
      .getTableRow(param)
      .pipe(finalize(() => this.loadingIndicator = false))
      .subscribe(data => this.data = data);
  }
}