import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Table } from '../models/table';
import { Observable } from 'rxjs-compat';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient) { }

  getAll():Observable<Table[]>{
    //let all =  this.http.get<Result[]>(`${environment.url_apigateway}/result`)
    return this.http.get<Table[]>(`${environment.url_apigateway}/table`)
  }

  get(id:string):Observable<Table>{
    return this.http.get<Table>(`${environment.url_apigateway}/table/${id}`)
  }

  create(request:Table){
    return this.http.post(`${environment.url_apigateway}/table`,request)
  }

  update(id:string,request:Table){
    return this.http.put(`${environment.url_apigateway}/table/${id}`,request)
  }

  delete(id:string){
    return this.http.delete<Table>(`${environment.url_apigateway}/table/${id}`,)
  }
}
