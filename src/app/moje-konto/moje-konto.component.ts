import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user-service.service';
import {Gracz} from '../Models/Gracz';
import {first} from 'rxjs/operators';
import { AuthServiceService } from '../Services/auth-service.service';
import{Role} from '../Models/Role';

@Component({
  selector: 'app-moje-konto',
  templateUrl: './moje-konto.component.html',
  styleUrls: ['./moje-konto.component.css']
})
export class MojeKontoComponent implements OnInit {

  graczApi: Gracz;
  currentUser: Gracz;
  constructor(private userService: UserService,
    private authenticationService: AuthServiceService) {
      // this.currentUser=this.authenticationService.currentUserValue;
      // console.log(this.authenticationService.currentUserValue);
      // console.log( JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    get isAdmin(){
      return this.currentUser && this.currentUser.rola==Role.Admin;}
  ngOnInit() {
    this.userService.getById(this.currentUser.id).pipe(first()).subscribe(u=> this.graczApi=u)
}

}



