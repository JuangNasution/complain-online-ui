import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComplainList } from '../../model';
import { ComplainService } from '../../service';

@Component({
  selector: 'complain-detail',
  templateUrl: 'complain-detail.component.html'
})
export class ComplainDetailComponent implements OnInit {
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
          console.table(this.complainList)
        });
    }
  }
}
