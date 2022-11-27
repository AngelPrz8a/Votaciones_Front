import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Match } from '../models/match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient) { }

  getAll():Observable<Match[]>{
    //let all =  this.http.get<Result[]>(`${environment.url_apigateway}/result`)
    return this.http.get<Match[]>(`${environment.url_apigateway}/match`)
  }

  get(id:string):Observable<Match>{
    return this.http.get<Match>(`${environment.url_apigateway}/match/${id}`)
  }

  create(request:Match){
    return this.http.post(`${environment.url_apigateway}/match`,request)
  }

  update(id:string,request:Match){
    return this.http.put(`${environment.url_apigateway}/match/${id}`,request)
  }

  delete(id:string){
    return this.http.delete<Match>(`${environment.url_apigateway}/match/${id}`,)
  }
}
