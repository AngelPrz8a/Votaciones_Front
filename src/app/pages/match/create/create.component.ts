import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Match } from '../../../models/match';
import { MatchService } from '../../../services/match.service';
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
  request:Match={
    motto:"",
    name:""
  }

  constructor(private servicio:MatchService, 
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
        this.router.navigate(["pages/match/index"]);
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
        this.router.navigate(["pages/match/index"]);
      });
    }
  }



  validate():boolean{
    this.intentoEnvio=true;
    if(
      this.request.motto=="" ||
      this.request.name==""
      ){
      return false;
    }else{
      return true;
    }
  }

}
