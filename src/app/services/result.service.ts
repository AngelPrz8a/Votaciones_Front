import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http: HttpClient) { }

  c():Observable<Result[]>{
    //let all =  this.http.get<Result[]>(`${environment.url_apigateway}/result`)
    return this.http.get<Result[]>(`${environment.url_apigateway}/result`)
  }


  getAll():Observable<Result[]>{
    //let all =  this.http.get<Result[]>(`${environment.url_apigateway}/result`)
    return this.http.get<Result[]>(`${environment.url_apigateway}/result`)
  }

  get(id:string):Observable<Result>{
    return this.http.get<Result>(`${environment.url_apigateway}/result/${id}`)
  }

  create(request:Result){
    return this.http.post(`${environment.url_apigateway}/result`,request)
  }

  update(id:string,request:Result){
    return this.http.put(`${environment.url_apigateway}/result/${id}`,request)
  }

  delete(id:string){
    return this.http.delete<Result>(`${environment.url_apigateway}/result/${id}`,)
  }
}
