import { RouterExtensions } from 'nativescript-angular/router';
import { Component } from '@angular/core';
import { GonitwaAll, GonitwaInsert } from '../Models/Gonitwa';
import { GonitwaServiceService } from '../Services/gonitwa-service.service';
import { first } from 'rxjs/operators';
import { AuthServiceService } from '../Services/auth-service.service';
import { Gracz } from '../Models/Gracz';
import { Role } from '../Models/Role';
import { AlertService } from '../Services/alert.service';
import { Router } from '@angular/router';
import { setCurrentOrientation, orientationCleanup } from 'nativescript-screen-orientation';
import { Page } from 'tns-core-modules/ui/page/page';
import { TabView } from 'tns-core-modules/ui/tab-view';
import { DatabaseService } from '../Services/sqlite.service';
import { alert, confirm, prompt, login, action, inputType } from 'tns-core-modules/ui/dialogs';


@Component({
  selector: 'app-gonitwy',
  templateUrl: './gonitwy.component.html',
  styleUrls: ['./gonitwy.component.tns.css']
})

export class GonitwyComponent {

  // tslint:disable-next-line:max-line-length
  private gonitwyCreation = 'CREATE TABLE IF NOT EXISTS gonitwy (nrGonitwyWSezonie INTEGER PRIMARY KEY AUTOINCREMENT, nazwaNagrody TEXT, godzinaRozpoczecia DATE, data DATE, dlugosc NUMBER)';
  // tslint:disable-next-line:max-line-length
  private gonitwyCreationF = 'CREATE TABLE IF NOT EXISTS gonitwyFuture (nrGonitwyWSezonie INTEGER PRIMARY KEY AUTOINCREMENT, nazwaNagrody TEXT, godzinaRozpoczecia DATE, data DATE, dlugosc NUMBER)';
  private database: any;
  gonitwy: GonitwaAll[] = [];

  przyszleGonitwy = false;
  gInsert: GonitwaInsert;
  gonitwyFuture: GonitwaAll[] = [];
  currentUser: Gracz;
  connected = true;

  constructor(private gonitwaService: GonitwaServiceService,
    private sqliteService: DatabaseService,
    private authenticationService: AuthServiceService,
    private alertService: AlertService,
    private router: RouterExtensions,
    private route: Router,
    page: Page) {
    page.on('navigatedTo', function () {
      setCurrentOrientation('portrait', function () {
        console.log('portrait orientation');
      });
    });
    page.on('navigatingFrom', function () {
      orientationCleanup();
    });
    this.authenticationService.currentUser.subscribe(s => this.currentUser = s);
    this.fetchGonitwy();
    this.fetchGonitwyFuture();
    sqliteService.getdbConnection().then(db => {
      this.database = db;
    }, error => {
      console.log('OPEN DB ERROR: ', error);
    });
    this.wczytajGonitwy();
  }
  // KONIEC KONSTRUKTORA

  wczytajGonitwy() {
    this.gonitwaService.getAll().pipe(first()).subscribe(s => {
      this.gonitwy = s;
      console.log('SUBSCRIBE: ', s);
      this.insertGonitwy(this.gonitwy);
    }, error => {
      this.connected = false;
      this.connectionAlert();
      console.log('BRAK DOSTĘPU DO INTERNETU. NIE MOŻNA POBRAĆ NIEROZSTRZYGNIĘTYCH ZAKŁADÓW');
    });

    this.gonitwaService.getAllFuture().pipe(first()).subscribe(s =>{ this.gonitwyFuture = s;
      this.insertGonitwyFuture(this.gonitwyFuture);
    }, error => {
      this.connected = false;

    });
  }

  private insertGonitwy(gonitwy: GonitwaAll[]) {
    this.database.execSQL('DROP TABLE IF EXISTS gonitwy').then(afterDropin => {
      this.database.execSQL(this.gonitwyCreation).then(pech => {
        // tslint:disable-next-line:forin
        for (const row in gonitwy) {
          // tslint:disable-next-line:max-line-length
          this.database.execSQL('INSERT INTO gonitwy (nrGonitwyWSezonie, nazwaNagrody, godzinaRozpoczecia, data, dlugosc) VALUES (?, ?, ?, ?, ?)',
            [gonitwy[row].nrGonitwyWSezonie, gonitwy[row].nazwaNagrody,
            gonitwy[row].godzinaRozpoczecia, gonitwy[row].data, gonitwy[row].dlugosc])
            .then(id => {
              console.log('INSERT RESULT', id);
            }, error => {
              console.log('INSERT ERROR', error);
            });
        }
      }).then(afterInsert => this.fetchGonitwy());
    });
  }
  private fetchGonitwy() {
    this.sqliteService.getdbConnection().then(db => {
      db.all('SELECT * FROM gonitwy').then(rows => {
        this.gonitwy = [];
        // tslint:disable-next-line:forin
        for (let row in rows) {
          this.gonitwy.push({
            'nrGonitwyWSezonie': rows[row][0],
            'nazwaNagrody': rows[row][1],
            'godzinaRozpoczecia': rows[row][2],
            'data': rows[row][3],
            'dlugosc': rows[row][4],
            'nrGonitwyWDniu': null,
            'warunkiGonitwy': null
          });
        }
      }, error => {
        console.log('SELECT ERROR', error);
      });
    });
    this.sqliteService.closedbConnection();
  }

  private insertGonitwyFuture(gonitwy: GonitwaAll[]) {
    this.database.execSQL('DROP TABLE IF EXISTS gonitwyFuture').then(afterDropin => {
      this.database.execSQL(this.gonitwyCreationF).then(pech => {
        // tslint:disable-next-line:forin
        for (const row in gonitwy) {
          // tslint:disable-next-line:max-line-length
          this.database.execSQL('INSERT INTO gonitwyFuture (nrGonitwyWSezonie, nazwaNagrody, godzinaRozpoczecia, data, dlugosc) VALUES (?, ?, ?, ?, ?)',
            [gonitwy[row].nrGonitwyWSezonie, gonitwy[row].nazwaNagrody,
            gonitwy[row].godzinaRozpoczecia, gonitwy[row].data, gonitwy[row].dlugosc])
            .then(id => {
              console.log('INSERT RESULT', id);
            }, error => {
              console.log('INSERT ERROR', error);
            });
        }
      }).then(afterInsert => this.fetchGonitwyFuture());
    });
  }
  private fetchGonitwyFuture() {
    this.sqliteService.getdbConnection().then(db => {
      db.all('SELECT * FROM gonitwyFuture').then(rows => {
        this.gonitwyFuture = [];
        // tslint:disable-next-line:forin
        for (let row in rows) {
          this.gonitwyFuture.push({
            'nrGonitwyWSezonie': rows[row][0],
            'nazwaNagrody': rows[row][1],
            'godzinaRozpoczecia': rows[row][2],
            'data': rows[row][3],
            'dlugosc': rows[row][4],
            'nrGonitwyWDniu': null,
            'warunkiGonitwy': null
          });
        }
      }, error => {
        console.log('SELECT ERROR', error);
      });
    });
    this.sqliteService.closedbConnection();
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.rola == Role.Admin;
  }
  get isUser() {
    return this.currentUser && this.currentUser.rola == Role.User;
  }
  ngDodajGonitwe() {
    this.route.navigate(['/zarzadzaj-gonitwami']);
  }

  onItemTap(identyfikator: number) {
    this.router.navigate(['/szczegoly-wyscigu', identyfikator]);
  }
  onItemTapObstaw(identyfikator: number) {
    if(this.connected){
    this.router.navigate(['/obstaw', identyfikator]);
  }}
  
  pyk() {
    this.przyszleGonitwy = !this.przyszleGonitwy;
  }
  usunGonitwe(id: number) {
    if (confirm('Jesteś pewien, że chcesz usunąć gonitwę?')) {
      this.gonitwaService.usunGonitwe(id).pipe(first()).subscribe(data => {
        this.alertService.success('Usunięto gonitwę', true);
        location.reload();
      });
    }
  }
  connectionAlert() {
    alert({
      title: 'Alert',
      message: 'Brak połaczenia z internetem',
      okButtonText:'OK'
    }).then(() => {
      console.log('Zadziałałem');

    });
  }
}
