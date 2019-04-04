import { Component, OnInit } from '@angular/core';
import { ZakladService } from '../Services/zaklad.service';
import { AuthServiceService } from '../Services/auth-service.service';
import { Gracz, KwotaWidok } from '../Models/Gracz';
import { WidokZaklad, Wygrana, WidokZakladWynik } from '../Models/Zaklad';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../Services/alert.service';
import { ObliczeniaService } from '../Services/obliczenia.service';
import { GonitwaServiceService } from '../Services/gonitwa-service.service';
import { WynikAnswer } from '../Models/Wynik';

@Component({
  selector: 'app-moje-zaklady',
  templateUrl: './moje-zaklady.component.html',
  styleUrls: ['./moje-zaklady.component.css']
})
export class MojeZakladyComponent implements OnInit {
  currentUser: Gracz;
  zakladyPrzed:WidokZaklad[];
  zakladyPo:WidokZakladWynik[];
  zaklad:WidokZaklad;
  wygrana:Wygrana;
  komunikat:string;
  kwota:number=0;
  pieniadze:KwotaWidok;
  czyWynikJest:WynikAnswer;
  liczyc:boolean;
  info:string;
  constructor(private alertService:AlertService,
    private ZakladService:ZakladService,
    private authenticationService: AuthServiceService) { 
      this.currentUser=this.authenticationService.currentUserValue;}

  ngOnInit() {

    this.ZakladService.pokazMojeZakladyPrzed(this.currentUser.id)
    .pipe(first())
    .subscribe(s=>{this.zakladyPrzed=s
      console.log("cos");
      this.alertService.success("załadowano zakłady",false)});

    this.ZakladService.pokazMojeZakladyPo(this.currentUser.id)
    .pipe(first())
    .subscribe(s=>{this.zakladyPo=s
    });
  }

  usunZaklad(id:number, kwota:number)
  {    
    if(confirm("Jesteś pewnien?")){
    this.ZakladService.usunZaklad(id).pipe(first())
    .subscribe(data=>{
      this.alertService.success('Usunieto',true);
      location.reload();
    })
  }
  }

}
