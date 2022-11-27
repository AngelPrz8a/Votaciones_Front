import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Candidate } from '../models/candidate';
import { Observable } from 'rxjs-compat';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http: HttpClient) { }

  getAll():Observable<Candidate[]>{
    //let all =  this.http.get<Result[]>(`${environment.url_apigateway}/result`)
    return this.http.get<Candidate[]>(`${environment.url_apigateway}/candidate`)
  }

  get(id:string):Observable<Candidate>{
    return this.http.get<Candidate>(`${environment.url_apigateway}/candidate/${id}`)
  }

  create(request:Candidate){
    return this.http.post(`${environment.url_apigateway}/candidate`,request)
  }

  update(id:string,request:Candidate){
    return this.http.put(`${environment.url_apigateway}/candidate/${id}`,request)
  }

  delete(id:string){
    return this.http.delete<Candidate>(`${environment.url_apigateway}/candidate/${id}`,)
  }
}
