import { Component, Input, OnInit } from '@angular/core';
import { ComplainList } from '../../model';
import { ComplainService } from '../../service';

@Component({
  selector: 'atm-detail',
  templateUrl: 'atm-detail.component.html'
})
export class AtmDetailComponent implements OnInit {
  complainList: ComplainList;
  @Input() dataDetail: ComplainList;
  @Input() isTwitter: boolean;
  isDetail: boolean = true;
  isResponse: boolean = true;



  constructor(private complainService: ComplainService) { }

  ngOnInit() {
    if (this.dataDetail.noComplain) {
        this.complainService
        .get(this.dataDetail.noComplain)
        .subscribe(data => {
          console.log(data)
          this.complainList = data;
        });
    }
  }
}
