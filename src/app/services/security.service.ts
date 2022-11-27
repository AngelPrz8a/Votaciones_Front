import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs-compat';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  elUsuario = new BehaviorSubject<User>(new User)

  constructor(private http:HttpClient,private router:Router) {
    this.verificarSesion();
   }


   public get usuarioSesion():User{
    return this.elUsuario.value;
   }

   setUsuario(user:User){
      this.elUsuario.next(user);
   } 

   getUsuario(){
    return this.elUsuario.asObservable();
   }


   login(request:User):Observable<User>{
    return this.http.post(`${environment.url_apigateway}/login`,request);
   }

   guardarDatosSesion(datos:any){
      let sesionActual = localStorage.getItem("sesion")
      let data: User = {
        _id:datos._id,
        token:datos.token,
      }
      localStorage.setItem("sesion",JSON.stringify(data))
      this.setUsuario(data)
   }

   logout(){
    localStorage.removeItem("sesion")
    this.setUsuario(new User())
   }

   verificarSesion(){
    let sesionActual = this.getDatosSesion()
    if(sesionActual){
      this.setUsuario(JSON.parse(sesionActual))
    }
   }

   sesionExiste():boolean{
    let sesionActual = this.getDatosSesion()
    return (sesionActual)?true:false
   }

   getDatosSesion(){
    let sesionActual = localStorage.getItem("sesion")
    return sesionActual
   }

}
