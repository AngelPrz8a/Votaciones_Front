import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Role } from '../../../models/role';
import { User } from '../../../models/user.model';
import { RoleService } from '../../../services/role.service';
import { SecurityService } from '../../../services/security.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

   //variables
   modoCreacion:boolean = true
   _id:string = ""
   intentoEnvio : boolean = false
   request:User={
    name:"",
    email:"",
    password:"",
    role:""
   }

   userPassword = ""

   roles:Role[]
 
   constructor(private servicio:UserService, 
     private servicioRol:RoleService,
     private servicioSeguridad:SecurityService,
     private servicioUser:UserService,
     private rutaActiva:ActivatedRoute, private router:Router) { }
 
   ngOnInit(): void {
 
     //Seguridad-----------------
     if(this.servicioSeguridad.sesionExiste() == false){
       this.router.navigate(["pages/home"])
     }else{
       this.servicioUser.perfil().subscribe(data=>{
         if(data.role != "Administrador" ){
           this.router.navigate(["pages/home"])
         }     
       })
     }
     //-------------------------
 
     if (this.rutaActiva.snapshot.params._id) {
       this.modoCreacion = false;
       this._id = this.rutaActiva.snapshot.params._id;
       this.get(this._id)
     } else {
       this.modoCreacion = true;
     }

     this.getRoles()
   }

   getRoles(){
    this.servicioRol.getAll().subscribe(data=>{
      this.roles = data
    })
   }
 
   get(id:string){
     this.servicio.get(id).subscribe(data=>{
      data.password = ""
      this.request = data
     })
   }
 
   create():void{
     if (this.validate()) {
       this.intentoEnvio = true;
       this.servicio.create(this.request).
       subscribe(data => {
         Swal.fire(
         'Creado',
         'Ha sido creado correctamente',
         'success'
         )
         this.router.navigate(["pages/user/index"]);
       });
     }
   }
 
 
   update():void{
     if (this.validate()) {
       this.intentoEnvio = true;
       this.servicio.update(this.request._id,this.request).
       subscribe(data => {
         Swal.fire(
         'Actualizado',
         'Ha sido actualizado correctamente',
         'success'
         )
         this.router.navigate(["pages/user/index"]);
       });
     }
   }
 
 
 
   validate():boolean{
     this.intentoEnvio=true;
     if(
       this.request.name=="" ||
       this.request.email=="" ||
       this.request.role==""  
       ){
       return false;
     }else{
       return true;
     }
   }

}

  
 