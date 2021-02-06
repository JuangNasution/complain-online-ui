import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComplainList } from '../../model';
import { ComplainService } from '../../service';

@Component({
  selector: 'export-detail',
  templateUrl: 'export-detail.component.html'
})
export class ExporttDetailComponent implements OnInit {
  complainList: ComplainList;
  @Input() dataDetail: ComplainList;
  isDetail: boolean = true;
  isResponse: boolean = true;


  constructor(private complainService: ComplainService) { }

  ngOnInit() {
    if (this.dataDetail.noComplain) {
      // console.table(this.id);
      this.complainService
        .get(this.dataDetail.noComplain)
        .subscribe(data => {
          this.complainList = data;
        });
    }
  }
}
