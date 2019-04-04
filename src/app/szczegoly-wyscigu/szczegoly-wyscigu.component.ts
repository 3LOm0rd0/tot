import { Component, OnInit, OnDestroy } from '@angular/core';
import { GonitwaServiceService } from '../Services/gonitwa-service.service';
import { GonitwaLista} from '../Models/Gonitwa';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service.service';
import { Gracz } from '../Models/Gracz';
import {Role} from '../Models/Role';
import { Wynik } from '../Models/Wynik';
import {first} from 'rxjs/operators';
import { ObliczeniaService } from '../Services/obliczenia.service';
@Component({
  selector: 'app-szczegoly-wyscigu',
  templateUrl: './szczegoly-wyscigu.component.html',
  styleUrls: ['./szczegoly-wyscigu.component.css']
})
export class SzczegolyWysciguComponent implements OnInit {
  
  lista:GonitwaLista[];
  id:number;
  sth:any;
  private sub:any;
  currentUser:Gracz;
  wynik:Wynik;
  constructor(private serviceGonitwy: GonitwaServiceService,
    private authenticationService:AuthServiceService,
    private oblicz:ObliczeniaService,
    private router:Router,
    private route: ActivatedRoute) { this.authenticationService.currentUser.subscribe(s=>this.currentUser=s);}

  ngOnInit() {
  this.sub=this.route.params.subscribe(params=>{
    this.id=+params['id'];
    this.serviceGonitwy.getListaWysciguById(this.id).pipe(first()).subscribe(s=>this.lista=s);
    this.serviceGonitwy.getWynik(this.id).subscribe(s=>this.wynik=s);
    
  })
  }
  ngOnDestory(){
    this.sub.unsubscribe();
  }
  get isAdmin(){
    return this.currentUser && this.currentUser.rola==Role.Admin;
}


}