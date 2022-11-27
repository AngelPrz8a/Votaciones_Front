import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { SecurityService } from '../../services/security.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userName = ""
  role = ""
  valores = false
  constructor(private security:UserService, private router:Router) { }


  ngOnInit(): void {
    this.perfil()
  }

  perfil(){
    this.security.perfil().subscribe(data=>{
      this.userName = data.name
      this.role = data.role

      if(this.userName!="" && this.role!=""){
        this.valores = true
      }
      
    })
  }

  login(){
    this.router.navigate(["pages/security/login"])
  }

}
