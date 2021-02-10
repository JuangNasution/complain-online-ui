import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constant } from '../../../environments/constant';
import { Register } from '../../core/model/register.model';
import { ComplainModule } from '../complain-online.module';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  readonly url = `${constant.comlainUrl}`

  constructor(private http: HttpClient) { }

  addData(data: any) : Observable<Register>{
    return this.http.post<Register>(`${this.url}/register`,data)
  }
  loginTemp(email: string, password: string){
    const user: Object = {
      email: email,
      password: password
    }
    return this.http.post(`${this.url}/login`, user, {'responseType': 'text'})
  }
  activation(token: string) {
    return this.http.put<any>(`${this.url}/activation/${token}`, "")
  }
}
