import { Component, OnInit } from '@angular/core';
import { Result } from '../../../models/result.model';
import { ResultService } from '../../../services/result.service';

@Component({
  selector: 'ngx-c',
  templateUrl: './c.component.html',
  styleUrls: ['./c.component.scss']
})
export class CComponent implements OnInit {

  //LISTA TODOS LOS RESULTADOS - PRUEBA -
  resultados : any[];
  nombres:string[]
  
  constructor(private servicio:ResultService) { }

  ngOnInit(): void {
   this.c()
  }

  c():void{
    this.servicio.c().subscribe(data=>{
      this.nombres = ["Partido", "Votos"]
      let array = []
      for(let resultado of data){
        //console.log("partido "+resultado.candidate["match"]["name"]+" candidato "+resultado.candidate["name"]+" votos "+resultado["countVotes"])
        //Sumar los votos de cada candidato
        let partido = resultado.candidate["match"]["_id"]
        let votos = 0
        for(let resultado of data){
          if(resultado.candidate["match"]["_id"] == partido){
            votos += parseInt(resultado["countVotes"])
          }
        }
        resultado["countVotes"] =  ""+votos
        //Comprobar que el partido no existe en la lista
        let confirmar = false
        let cuenta = 0
        if(!array.length){
          confirmar = true
          cuenta ++
        }else{
          for(let a of array){
            if(a.candidate["match"]["_id"] == partido){
              cuenta ++
            }
            else{
              confirmar = true
              cuenta ++
            }
          }
        }
        //console.log(" cuenta "+cuenta+" votos "+resultado["countVotes"]+" partido "+resultado.candidate["match"]["name"])
        //agregar
        if(confirmar == true && cuenta <= 1){
          array.push(resultado)
        }

      }
      
      //ORDENAR DE MAYOR A MENOR
      for(let i = 0; i<=(array.length-1); i++){
        if(array[i+1] != undefined && array[i+1] != ""){
          if(parseInt(array[i]["countVotes"]) <= parseInt(array[i+1]["countVotes"]) ){
            let anterior = array[i]["countVotes"]
            array[i]["countVotes"] = array[i+1]["countVotes"]
            array[i+1]["countVotes"] = anterior 
          }
        }
      }
      //enviar al array para ser vistos
      console.log(array)
      this.resultados=array
    })
  }


}
