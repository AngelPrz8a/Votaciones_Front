import { Component, OnInit } from '@angular/core';
import { ResultService } from '../../../services/result.service';
import { TableService } from '../../../services/table.service';

@Component({
  selector: 'ngx-b',
  templateUrl: './b.component.html',
  styleUrls: ['./b.component.scss']
})
export class BComponent implements OnInit {

  //LISTA TODOS LOS RESULTADOS - PRUEBA -
  resultados : any[];
  nombres:string[]
  
  constructor(private servicio:ResultService, private servicioTable:TableService) { }

  ngOnInit(): void {
   this.c()
  }

  c():void{
    this.servicio.c().subscribe(data=>{
      this.nombres = ["Mesa", "Participación"]
      let array = []
      let mesas = []

      //trae todas las mesas existentes
      this.servicioTable.getAll().subscribe(tables=>{
        mesas = tables
      })

      //trae todos los resultados existentes
      for(let resultado of data){

        //guarda los resultados con misma mesa
        let soloUno = []
        let resultadoMismaMesa = [] 
        let mesa = resultado.table["tableNumber"]
        for(let d of data){
          let mesa2 = d.table["tableNumber"]
          if(mesa == mesa2){
            resultadoMismaMesa.push(resultado)
          }
        }

        //sumar los resultados y devolver solo una mesa
        //console.log("resultadoMismaMesa = "+resultadoMismaMesa)//-----------------------------------------
        if(resultadoMismaMesa.length == 1){
          for(let rmm of resultadoMismaMesa){
            array.push(rmm)
          }
        }else{
          let votos = 0
          
          if(!soloUno.length){
            soloUno.push(resultado)
          }
          for(let rmm of resultadoMismaMesa ){
            
            votos += parseInt(rmm["countVotes"])
          }
          soloUno["countVotes"] = votos
          array.push(soloUno)
        }
        
      }
      //envia datos finales
      console.log(array)
      this.resultados=array
    })
  }

}
