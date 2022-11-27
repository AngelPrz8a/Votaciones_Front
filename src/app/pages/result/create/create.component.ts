import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidate } from '../../../models/candidate';
import { Result } from '../../../models/result.model';
import { Table } from '../../../models/table';
import { CandidateService } from '../../../services/candidate.service';
import { ResultService } from '../../../services/result.service';
import { SecurityService } from '../../../services/security.service';
import { TableService } from '../../../services/table.service';
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
   request:Result={
     id_table:"",
     id_candidate:"",
     countVotes:""
   }

   candidatos:Candidate[]
   mesas:Table[]
 
   constructor(private servicio:ResultService,
    private servicioSeguridad:SecurityService,
    private servicioUser:UserService,
     private servicioCandidato:CandidateService, private servicioMesa:TableService, private rutaActiva:ActivatedRoute, private router:Router) { }
 
   ngOnInit(): void {

    //seguridad-----------
    if(this.servicioSeguridad.sesionExiste() == false){
      this.router.navigate(["pages/home"])
    }else{
      this.servicioUser.perfil().subscribe(data=>{
      if(data.role != "Administrador" ){
          this.router.navigate(["pages/home"])
        }     
      })
    }
    //---------------------


     if (this.rutaActiva.snapshot.params._id) {
       this.modoCreacion = false;
       this._id = this.rutaActiva.snapshot.params._id;
       this.get(this._id)
     } else {
       this.modoCreacion = true;
     }

     this.candidate()
     this.table()
   }

  candidate(){
    this.servicioCandidato.getAll().subscribe(data=>{
      this.candidatos = data
    })
  }

  table(){
    this.servicioMesa.getAll().subscribe(data=>{
      this.mesas = data
    })
  }
 
   get(id:string){
     this.servicio.get(id).subscribe(data=>{
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
         this.router.navigate(["pages/result/index"]);
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
         this.router.navigate(["pages/result/index"]);
       });
     }
   }
 
 
 
   validate():boolean{
     this.intentoEnvio=true;
     if(
       this.request.id_table=="" ||
       this.request.id_candidate=="" ||
       this.request.countVotes==""
       ){
       return false;
     }else{
       return true;
     }
   }

}
