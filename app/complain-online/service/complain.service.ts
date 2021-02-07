import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constant } from '../../../environments/constant';
import { BaseCrudTableService } from '../../lib/service';
import { ComplainModule } from '../complain-online.module';
import { ComplainList } from '../model';
import { ComplainTwitterList } from '../model/complain-list-twitter.model';

@Injectable({ providedIn: ComplainModule })
export class ComplainService extends BaseCrudTableService<ComplainList> {

  constructor(http: HttpClient) {
    super(http, `${constant.complainOnlineUrl}/complain`);
  }

  getId(id: any): Observable<ComplainTwitterList> {
    return this.http.get<ComplainTwitterList>(`${constant.complainOnlineUrl}/complain/twitter/${id}`);
  }

  // getTableRowsCard(page: PageRequest): Observable<PagedApiResponse<ComplainList>> {
  //   return this.http.get<PagedApiResponse<ComplainList>>(
  //     `${this.url}`,
  //     {
  //       params: page.requestParam
  //     }
  //   );
  // }
}
