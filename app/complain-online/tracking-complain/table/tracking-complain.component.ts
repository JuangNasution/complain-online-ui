import { Component, OnInit, TemplateRef } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { PagedApiResponse, PageRequest } from '../../../lib/model';
import { sortTableFn } from '../../../util';
import { ComplainList } from '../../model';
import { ComplainService } from '../../service';

@Component({
  templateUrl: './tracking-complain.component.html'
})
export class MenuTableComponent implements OnInit {

  ColumnMode = ColumnMode;
  expanded: boolean = false;
  data: PagedApiResponse<ComplainList>;
  loadingIndicator: boolean;
  page: PageRequest = new PageRequest();
  sortTableFn = sortTableFn;
  modalRef: BsModalRef;
  dataDetail: ComplainList;

  constructor(private complainService: ComplainService,
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

  getMenu(pageNumber: number = 0) {
    this.loadingIndicator = true;
    this.page.page = pageNumber;

    this.complainService
      .getTableRows(this.page)
      .pipe(
        finalize(() => this.loadingIndicator = false)
      )
      .subscribe(data => this.data = data);
  }

  getDetailData(data: ComplainList, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.dataDetail = data;
  }
}
