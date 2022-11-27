import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { SecurityService } from './security.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private servicio:SecurityService, private http:HttpClient) { }

  perfil():Observable<User>{
    return this.http.get<User>(`${environment.url_apigateway}/user/${this.servicio.usuarioSesion._id}`)
  }


  getAll():Observable<User[]>{
    //let all =  this.http.get<Result[]>(`${environment.url_apigateway}/result`)
    return this.http.get<User[]>(`${environment.url_apigateway}/user`)
  }

  get(id:string):Observable<User>{
    return this.http.get<User>(`${environment.url_apigateway}/user/${id}`)
  }

  create(request:User){
    return this.http.post(`${environment.url_apigateway}/user`,request)
  }

  update(id:string,request:User){
    return this.http.put(`${environment.url_apigateway}/user/${id}`,request)
  }

  delete(id:string){
    return this.http.delete<User>(`${environment.url_apigateway}/user/${id}`,)
  }
}
