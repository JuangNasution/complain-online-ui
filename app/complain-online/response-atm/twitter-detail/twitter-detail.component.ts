import { Component, Input, OnInit } from '@angular/core';
import { ComplainTwitterList } from '../../model/complain-list-twitter.model';
import { ComplainService } from '../../service';

@Component({
  selector: 'twitter-response-detail',
  templateUrl: 'twitter-detail.component.html'
})
export class TwitterDetailResponseComponent implements OnInit {
  complainList: ComplainTwitterList;
  @Input() dataDetail: ComplainTwitterList;
  isDetail: boolean = true;
  isResponse: boolean = true;

  constructor(private complainService: ComplainService) { }

  ngOnInit() {
    if (this.dataDetail.noComplain) {
        this.complainService
        .getId(this.dataDetail.noComplain)
        .subscribe(data => {
          this.complainList = data;
        });
    }
  }
}
