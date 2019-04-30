import { RouterExtensions } from 'nativescript-angular/router';
import { Component, OnInit } from '@angular/core';
import {GonitwaAll, GonitwaInsert} from '../Models/Gonitwa';
import { GonitwaServiceService } from '../Services/gonitwa-service.service';
 import {first} from 'rxjs/operators';
import { AuthServiceService } from '../Services/auth-service.service';
import { Gracz } from '../Models/Gracz';
import{Role} from '../Models/Role';
import { AlertService } from '../Services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gonitwy',
  templateUrl: './gonitwy.component.html',
  styleUrls: ['./gonitwy.component.tns.css']
})

export class GonitwyComponent implements OnInit {

  gonitwy: GonitwaAll[]=[];
  przyszleGonitwy =false;
  gInsert:GonitwaInsert;
  gonitwyFuture: GonitwaAll[]=[];
  currentUser:Gracz;

  constructor(private gonitwaService:GonitwaServiceService,
    private authenticationService:AuthServiceService,
    private alertService:AlertService,
    private router:RouterExtensions,
    private route:Router) {
      this.authenticationService.currentUser.subscribe(s=>this.currentUser=s); }


  ngOnInit() {
  this.gonitwaService.getAll().pipe(first()).subscribe(s=>this.gonitwy=s);
    this.gonitwaService.getAllFuture().pipe(first()).subscribe(s=>this.gonitwyFuture=s);

}
get isAdmin(){
  return this.currentUser && this.currentUser.rola==Role.Admin;
}
get isUser(){
  return this.currentUser && this.currentUser.rola==Role.User;
}
ngDodajGonitwe(){
 this.route.navigate(['/zarzadzaj-gonitwami']);
}

onItemTap(identyfikator:number){
this.router.navigate(['/szczegoly-wyscigu', identyfikator]);
}
onItemTapObstaw(identyfikator:number){
  console.log(identyfikator);
  this.router.navigate(['/obstaw', identyfikator]);
  }
pyk(){
  this.przyszleGonitwy = !this.przyszleGonitwy;
}
usunGonitwe(id:number){
  if(confirm("Jesteś pewien, że chcesz usunąć gonitwę?")){

   this.gonitwaService.usunGonitwe(id).pipe(first()).subscribe(data=>{
    this.alertService.success("Usunięto gonitwę",true);
    location.reload();
   });

  }
}
}
