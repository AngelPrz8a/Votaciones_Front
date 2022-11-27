import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SecurityService } from '../../../services/security.service';
import { TableService } from '../../../services/table.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'ngx-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  //LISTA TODOS LOS RESULTADOS - PRUEBA -
  resultados : any[];
  nombres:string[]

  constructor(private servicio:TableService,
    private servicioUser:UserService,
    private servicioSeguridad:SecurityService,
    private router:Router) { }

  ngOnInit(): void {
    this.getAll()

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
  }
    

  getAll(){
    this.nombres=["Numero", "Inscritos"]
    this.servicio.getAll().subscribe(data=>{
      //ordenar de menor a mayor
      for(let i = 0; i<=(data.length-1); i++){
        for(let i = 0; i<=(data.length-1); i++){
          if(data[i+1] != undefined && data[i+1] != ""){
            if(parseInt(data[i]["tableNumber"]) >= parseInt(data[i+1]["tableNumber"]) ){
              let anterior = data[i]
              data[i] = data[i+1]
              data[i+1] = anterior 
            }
          }
        }
      }
      //------------------
      this.resultados = data
    })
  }

  create():void{
    this.router.navigate(["pages/table/create"])
  }

  update(id:string):void{
    this.router.navigate(["pages/table/update/"+id])
  }

  delete(id:string):void{
    //console.log(id)
    Swal.fire({
      title: 'Eliminar',
      text: "Está seguro que quiere eliminarlo?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
      }).then((result) => {
      if (result.isConfirmed) {
        this.servicio.delete(id).
        subscribe(data => {
          Swal.fire(
          'Eliminado!',
          'Ha sido eliminado correctamente',
          'success'
        )
        this.ngOnInit();
        });
      }
    })
    }

}
