import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SecurityService } from '../services/security.service';
import {catchError} from "rxjs/operators"

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public servicio:SecurityService,private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.servicio.usuarioSesion){
      request = request.clone({
        setHeaders:{
          Authorization:"Bearer "+this.servicio.usuarioSesion.token,
        }
        // headers: new HttpHeaders({
        //   'Content-Type':  'application/json',
        //   'Authorization': "Bearer "+this.servicio.usuarioSesion.token,
        //   'Access-Control-Allow-Methods':"DELETE, POST, GET, OPTIONS",
        // })
      })
    }
    return next.handle(request).pipe(
      catchError((err:HttpErrorResponse)=>{
        if(err.status===401){
          if(err.error["msg"]==="Token has expired" || err.error["msg"]==="Missing Authorization Header"){
            this.servicio.logout()
            this.router.navigateByUrl("/pages/security/login")
          }else{
            this.router.navigateByUrl("/pages/home")
          }
        }
        return throwError(err)
      })
    );
  }
}
