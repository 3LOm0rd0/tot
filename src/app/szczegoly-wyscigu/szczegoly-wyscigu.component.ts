import { Component} from '@angular/core';
import { GonitwaServiceService } from '../Services/gonitwa-service.service';
import { GonitwaLista } from '../Models/Gonitwa';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service.service';
import { Gracz } from '../Models/Gracz';
import { Role } from '../Models/Role';
import { Wynik } from '../Models/Wynik';
import { first } from 'rxjs/operators';
import { ObliczeniaService } from '../Services/obliczenia.service';

@Component({
  selector: 'app-szczegoly-wyscigu',
  templateUrl: './szczegoly-wyscigu.component.html',
  styleUrls: ['./szczegoly-wyscigu.component.tns.css']
})
export class SzczegolyWysciguComponent {

  // tslint:disable-next-line:max-line-length
  private szczegolyCreation = 'CREATE TABLE IF NOT EXISTS szczegolyGonitwy (nrGonitwyWSezonie INTEGER PRIMARY KEY AUTOINCREMENT, konIMiejsce TEXT, konIiMiejsce TEXT, konIiiMiejsce TEXT,konIvMiejsce TEXT, konVMiejsce TEXT, konViMiejsce TEXT, konViiMiejsce TEXT)';
  private database: any;
  lista: GonitwaLista[];
  id: number;
  sth: any;
  private sub: any;
  currentUser: Gracz;
  wynik: Wynik;
  kursy = false;
  constructor(private serviceGonitwy: GonitwaServiceService,
    private authenticationService: AuthServiceService,
    private oblicz: ObliczeniaService,
    private router: Router,
    private route: ActivatedRoute) { this.authenticationService.currentUser.subscribe(s => this.currentUser = s);
      this.wczytajSzczegoly();
     }

  wczytajSzczegoly() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.serviceGonitwy.getListaWysciguById(this.id).pipe(first()).subscribe(s => {
      this.lista = s;
        console.log('Listawyscigu: ', s);
      });
      this.serviceGonitwy.getWynik(this.id).subscribe(s => {
      this.wynik = s;
        console.log('Wynik', s);
      });

    });
  }
  ngOnDestory() {
    this.sub.unsubscribe();
  }
  get isAdmin() {
    return this.currentUser && this.currentUser.rola == Role.Admin;
  }


}
