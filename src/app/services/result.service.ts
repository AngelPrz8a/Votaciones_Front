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

  a():Observable<Result[]>{
    //let all =  this.http.get<Result[]>(`${environment.url_apigateway}/result`)
    let all =  this.http.get<Result[]>(`${environment.url_apigateway}/result`)
    console.log(all)
    return all
  }
}
