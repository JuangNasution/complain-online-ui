import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { constant } from "../../../environments/constant";
import { PagedApiResponse, PageRequest } from "../../lib/model";
import { BaseCrudTableService } from "../../lib/service";
import { ComplainModule } from "../complain-online.module";
import { dateFormat } from "../export-atm/table/export-table.component";
import { ComplainList } from "../model";

@Injectable({providedIn: ComplainModule})
export class ResponseAtmService extends BaseCrudTableService<ComplainList>{

  constructor(http: HttpClient) {
    super(http, `${constant.complainOnlineUrl}/complain/response`);
  }

  getTableRow(param: HttpParams): Observable<PagedApiResponse<ComplainList>> {

    return this.http.get<PagedApiResponse<ComplainList>>(
      `${constant.complainOnlineUrl}/complain/response`,
      {
        params: param
      }
    );
  }
  responseComplain(id: String, data: any) {

    return this.http.put<ComplainList>(
      `${constant.complainOnlineUrl}/complain/${id}`, data);
  }
  downloadMonitoring(data: FormGroup): Observable<HttpResponse<Blob>> {
    let httpParam = new HttpParams();
    httpParam = httpParam.append('fromDate', dateFormat(data.value.fromDate));
    httpParam = httpParam.append('toDate', dateFormat(data.value.toDate));
    httpParam = httpParam.append('category', 'ATM');

    const httpOptions: Object = {
      observe: 'response',
      responseType: 'blob' as 'json',
      params: httpParam
    };

    return this.http.get<HttpResponse<Blob>>(
      `${constant.complainOnlineUrl}/complain/report?`, httpOptions);
  }

  getHistoryMonitoring(data: FormGroup, page: PageRequest):
  Observable<PagedApiResponse<ComplainList>> {

  let httpParam = new HttpParams();
  httpParam = page.requestParam;
  httpParam = httpParam.append('fromDate', dateFormat(data.value.fromDate));
  httpParam = httpParam.append('toDate', dateFormat(data.value.toDate));
  httpParam = httpParam.append('category', 'ATM');

  return this.http.get<PagedApiResponse<ComplainList>>(
    `${constant.complainOnlineUrl}/complain/export`, { params: httpParam });
}
}
