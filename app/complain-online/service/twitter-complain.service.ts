import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constant } from '../../../environments/constant';
import { BaseCrudTableService } from '../../lib/service';
import { ComplainModule } from '../complain-online.module';
import { ComplainTwitter } from '../model';

@Injectable({ providedIn: ComplainModule })
export class TwitterComplainService extends BaseCrudTableService<ComplainTwitter> {

  constructor(http: HttpClient) {
    super(http, `${constant.complainOnlineUrl}/complain/twitter`);
  }

  getTwit(param: HttpParams): Observable<ComplainTwitter> {
    return this.http.get<ComplainTwitter>(`${constant.complainOnlineUrl}/complain/twitter`,
    {
      params: param
    });
  }

  dropTwt(id: string) {
    return this.http.put(
      `${constant.complainOnlineUrl}/complain/drop-twitter/${id}`,"");
  }

  getTwitPage(param: HttpParams): Observable<ComplainTwitter>{
    // console.log(param)
    return this.http.get<ComplainTwitter>(`${constant.complainOnlineUrl}/complain/twitter`,
    {
      params: param
    });
  }
}
