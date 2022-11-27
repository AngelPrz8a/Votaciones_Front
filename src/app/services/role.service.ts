import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Role } from '../models/role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Role[]>{
    //let all =  this.http.get<Result[]>(`${environment.url_apigateway}/result`)
    return this.http.get<Role[]>(`${environment.url_apigateway}/role`)
  }
}
