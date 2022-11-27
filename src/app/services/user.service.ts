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
}
