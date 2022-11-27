import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidate } from '../../../models/candidate';
import { Match } from '../../../models/match';
import { CandidateService } from '../../../services/candidate.service';
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
  request:Candidate={
    identification:"",
    resolution:"",
    name:"",
    lastname:"",
    id_match:""
  }

  partidos:any[]
  partidoActual:Match

  constructor(private servicio:CandidateService,
    private servicioSeguridad:SecurityService,
    private servicioUser:UserService,
    private servicioPartido:MatchService, private rutaActiva:ActivatedRoute, private router:Router) { }

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
    //------------------------

    if (this.rutaActiva.snapshot.params._id) {
      this.modoCreacion = false;
      this._id = this.rutaActiva.snapshot.params._id;
      this.get(this._id)
    } else {
      this.modoCreacion = true;
    }

    this.match()
  }

  match(){
    this.servicioPartido.getAll().subscribe(data=>{
      this.partidos = data
    })
  }

  actualPartido(id:string){
    this.servicioPartido.get(id).subscribe(data=>{
      this.partidoActual = data
    })
  }

  get(id:string){
    this.servicio.get(id).subscribe(data=>{
      this.request = data
      this.actualPartido(this.request.id_match)
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
        this.router.navigate(["pages/candidate/index"]);
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
        this.router.navigate(["pages/candidate/index"]);
      });
    }
  }



  validate():boolean{
    this.intentoEnvio=true;
    if(
      this.request.identification=="" ||
      this.request.resolution=="" ||
      this.request.name=="" ||
      this.request.lastname=="" ||
      this.request.id_match==""
      ){
      return false;
    }else{
      return true;
    }
  }

}
