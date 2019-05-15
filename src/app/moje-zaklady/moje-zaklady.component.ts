import { Component } from '@angular/core';
import { ZakladService } from '../Services/zaklad.service';
import { Gracz, KwotaWidok } from '../Models/Gracz';
import { WidokZaklad, Wygrana, WidokZakladWynik } from '../Models/Zaklad';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../Services/alert.service';
import { WynikAnswer } from '../Models/Wynik';
import { alert, confirm, prompt, login, action, inputType } from 'tns-core-modules/ui/dialogs';
import { DatabaseService } from '../Services/sqlite.service';

@Component({
  selector: 'app-moje-zaklady',
  templateUrl: './moje-zaklady.component.html',
  styleUrls: ['./moje-zaklady.component.css']
})
export class MojeZakladyComponent {
  // tslint:disable-next-line:max-line-length
  private betsCreation = 'CREATE TABLE IF NOT EXISTS bets (idZakladu INTEGER PRIMARY KEY AUTOINCREMENT, idGonitwy INTEGER, nazwaZakladu TEXT, stawka NUMBER, typowanie1 TEXT, typowanie2 TEXT, typowanie3 TEXT, typowanie4 TEXT)'
  private database: any;
  currentUser: Gracz;
  zakladyPrzed: WidokZaklad[];
  zakladyPrzed2: WidokZaklad[];
  zakladyPo: WidokZakladWynik[];
  zaklad: any;
  wygrana: Wygrana;
  komunikat: string;
  kwota: number = 0;
  pieniadze: KwotaWidok;
  czyWynikJest: WynikAnswer;
  liczyc: boolean;
  info: string;
  connected = true;
  constructor(private alertService: AlertService,
    private ZakladService: ZakladService,
    private sqliteService: DatabaseService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.fetch();
    sqliteService.getdbConnection().then(db => {
      this.database = db;
    }, error => {
      console.log('OPEN DB ERROR: ', error);
    });
    this.wczytajZaklady();

  }

  wczytajZaklady() {
    this.ZakladService.pokazMojeZakladyPrzed(this.currentUser.id)
      .pipe(first())
      .subscribe(s => {
        this.zakladyPrzed = s;
        // TUTAJ INSERT
        this.insert(this.zakladyPrzed),
          this.alertService.success('załadowano zakłady', false)
      }, error => {
        this.connectionAlert();
        this.connected =false;
        console.log('BRAK DOSTĘPU DO INTERNETU. NIE MOŻNA POBRAĆ NIEROZSTRZYGNIĘTYCH ZAKŁADÓW')
      });

    this.ZakladService.pokazMojeZakladyPo(this.currentUser.id)
      .pipe(first())
      .subscribe(s => {
        // INSERT
        this.zakladyPo = s;
      }, error => {
        // FETCH
        console.log('BRAK DOSTĘPU DO INTERNETU. NIE MOŻNA POBRAĆ HISTORYCZNYCH ZAKŁADÓW')
      });
  }
  usunZaklad(id: number, kwota: number) {
    confirm({
      title: 'Usuń zakład',
      message: 'Czy na pewno chcesz usunąć zakład?',
      okButtonText: 'Tak',
      cancelButtonText: 'Nie'
    }).then(result => {
      if (result) {
        this.ZakladService.usunZaklad(id).pipe(first())
          .subscribe(data => {
            this.wczytajZaklady();
            // this.alertService.success('Usunieto', true);
          }, error => {
            this.wczytajZaklady();
          });
      }
    });
  }

  private insert(zaklady: WidokZaklad[]) {
    this.database.execSQL('DROP TABLE IF EXISTS bets').then(afterDropin => {
      this.database.execSQL(this.betsCreation).then(pech => {
        // tslint:disable-next-line:forin
        for (const row in zaklady) {
          // tslint:disable-next-line:max-line-length
          this.database.execSQL('INSERT INTO bets (idZakladu, idGonitwy, nazwaZakladu, stawka, typowanie1, typowanie2, typowanie3, typowanie4) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [zaklady[row].idZakladu, zaklady[row].idGonitwy, zaklady[row].nazwaZakladu, zaklady[row].stawka,
            zaklady[row].typowanie1, zaklady[row].typowanie2, zaklady[row].typowanie3, zaklady[row].typowanie4])
            .then(id => {
              console.log('INSERT RESULT', id);
            }, error => {
              console.log('INSERT ERROR', error);
            });
        }
      }).then(afterInsert => this.fetch());
    });


  }

  private fetch() {
    this.sqliteService.getdbConnection().then(db => {
      db.all('SELECT * FROM bets').then(rows => {
        this.zakladyPrzed = [];
        // tslint:disable-next-line:forin
        for (let row in rows) {
          this.zakladyPrzed.push({
            'idZakladu': rows[row][0],
            'idGonitwy': rows[row][1],
            'nazwaZakladu': rows[row][2],
            'stawka': rows[row][3],
            'typowanie1': rows[row][4],
            'typowanie2': rows[row][5],
            'typowanie3': rows[row][6],
            'typowanie4': rows[row][7],
            'idGracza': null
          });
        }
      }, error => {
        console.log('SELECT ERROR', error);
      });
    });
    this.sqliteService.closedbConnection();
  }

  connectionAlert() {
    alert({
      title: 'Alert',
      message: 'Brak połaczenia z internetem',
      okButtonText:'OK'
    });
  }

}
