import { Component, OnInit } from '@angular/core';
import { Result } from '../../../models/result.model';
import { ResultService } from '../../../services/result.service';

@Component({
  selector: 'ngx-a',
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.scss']
})
export class AComponent implements OnInit {

   //LISTA TODOS LOS RESULTADOS - PRUEBA -
   resultados : Result[];
   nombres:string[]=["votos", "candidato", "mesa"]
   
   constructor(private servicio:ResultService) { }
 
   ngOnInit(): void {
    this.a();
   }

   a():void{
     this.servicio.a().subscribe(data=>{
       this.resultados=data
     })
   }

}
