import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthServiceService} from './Services/auth-service.service';
import {Gracz} from './Models/Gracz';
import {Role} from './Models/Role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  {
currentUser: Gracz;

constructor(
  private router: Router,
  private authenticationService: AuthServiceService,

) {
  this.authenticationService.currentUser.subscribe(s => this.currentUser = s);
}
get isAdmin() {
  return this.currentUser && this.currentUser.rola === Role.Admin;
}
logout(){
  this.authenticationService.logout();
  this.router.navigate(['/login']);
}

}
