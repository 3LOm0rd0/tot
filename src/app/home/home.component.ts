import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {Gracz} from '../Models/Gracz';
import {UserService} from '../Services/user-service.service';
import {AuthServiceService} from '../Services/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: Gracz;
  userFromApi: Gracz; 

  constructor(private userService: UserService,
    private authenticationService: AuthServiceService) {

    this.currentUser=this.authenticationService.currentUserValue;
    
   }

  ngOnInit() {
    this.userService.getById(this.currentUser.id).pipe(first()).subscribe(u=>{
    this.userFromApi=u;
   });
  }
  
    
  }

