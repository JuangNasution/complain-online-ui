import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { categories, CreateCategoryModel } from '../../create-complain/create-category.model';
import { ComplainList, ComplainTwitter } from '../../model';
import { ComplainService } from '../../service';

@Component({
  selector: 'twitter-detail',
  templateUrl: 'twitter-detail.component.html'
})
export class TwitterDetailComponent implements OnInit {
  complainTwitter: ComplainTwitter;
  @Input() dataDetail: ComplainTwitter;
  isDetail: boolean = true;
  isResponse: boolean = true;
  categories: CreateCategoryModel[];

  // @Input() dataDetail: SdnData;
  // @Input() component: string;
  // ofacDetail: SdnDetail;
  // consolidateDetail: ConsolidatedDetail;
  // passportData: Array<Other> = [];
  // isAddress: boolean = true;
  // isCitizenship: boolean = true;
  // isNationality: boolean = true;
  // isProgram: boolean = true;
  // isPassport: boolean = true;
  // isOtherInfo: boolean = true;
  // isOtherInfoSub: boolean = true;
  // isOtherInfoVessel: boolean = true;
  // isShow: boolean = true;

  constructor(
    private complainService: ComplainService,
    public location: Location,
  ) { }

  ngOnInit() {
    // if (this.dataDetail.noComplain) {
    //   // console.table(this.id);
    //   this.complainService
    //     .get(this.dataDetail.noComplain)
    //     .subscribe(data => {
    //       this.complainList = data;
    //     });
    // }
    this.complainTwitter = this.dataDetail;
    // console.log(this.dataDetail)
  }
}
