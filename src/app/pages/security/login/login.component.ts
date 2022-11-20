import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { SecurityService } from '../../../services/security.service';
import Swal from "sweetalert2";

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  correo:string=""
  contrasena:string=""

  constructor(private miSeguridad:SecurityService, private  router:Router) { }

  ngOnInit(): void {
  }

  login():void{
    console.log("aqui "+this.correo+" contraseña "+this.contrasena)
    let elUsuario:User={
      email:this.correo,
      password:this.contrasena
    }
    this.miSeguridad.login(elUsuario).subscribe(
      data=>{
        this.miSeguridad.guardarDatosSesion(data);
        this.router.navigate(['pages/home']);
      },
      error=>{
        Swal.fire({
          title: 'Error Login',
          text: error["error"]["message"],
          icon: 'error',
          timer:5000
          });
      }
    );
  }

}
