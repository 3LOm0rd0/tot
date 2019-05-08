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
import { alert, confirm, prompt, login, action, inputType } from "tns-core-modules/ui/dialogs";

@Component({
  selector: 'app-moje-zaklady',
  templateUrl: './moje-zaklady.component.html',
  styleUrls: ['./moje-zaklady.component.css']
})
export class MojeZakladyComponent implements OnInit {
  currentUser: Gracz;
  zakladyPrzed: WidokZaklad[];
  zakladyPo: WidokZakladWynik[];
  zaklad: WidokZaklad;
  wygrana: Wygrana;
  komunikat: string;
  kwota: number = 0;
  pieniadze: KwotaWidok;
  czyWynikJest: WynikAnswer;
  liczyc: boolean;
  info: string;
  constructor(private alertService: AlertService,
    private ZakladService: ZakladService,
    private authenticationService: AuthServiceService) {
    // this.currentUser=this.authenticationService.currentUserValue;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {

    this.ZakladService.pokazMojeZakladyPrzed(this.currentUser.id)
      .pipe(first())
      .subscribe(s => {
      this.zakladyPrzed = s;
        this.alertService.success("załadowano zakłady", false)
      });

    this.ZakladService.pokazMojeZakladyPo(this.currentUser.id)
      .pipe(first())
      .subscribe(s => {
      this.zakladyPo = s
      });
  }

  usunZaklad(id: number, kwota: number) {
    confirm({
      title: "Usuń zakład",
      message: "Czy na pewno chcesz usunąć zakład?",
      okButtonText: "Tak",
      cancelButtonText: "Nie"
    }).then(result => {
      if (result) {
        this.ZakladService.usunZaklad(id).pipe(first())
          .subscribe(data => {
            this.ngOnInit();
            this.alertService.success('Usunieto', true);

          })

      }

    })
  }

}
