import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../../../services/security.service';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private servicio:SecurityService, private router:Router) { }

  ngOnInit(): void {
    this.logout()
  }

  logout(){
    this.servicio.logout()
    this.router.navigate(["pages/security/login"])
  }

}
