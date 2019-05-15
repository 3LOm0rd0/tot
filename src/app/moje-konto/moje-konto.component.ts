import { Component } from '@angular/core';
import { UserService } from '../Services/user-service.service';
import { Gracz } from '../Models/Gracz';
import { first } from 'rxjs/operators';
import { Role } from '../Models/Role';
import { DatabaseService } from '../Services/sqlite.service';


@Component({
  selector: 'app-moje-konto',
  templateUrl: './moje-konto.component.html',
  styleUrls: ['./moje-konto.component.css']
})
export class MojeKontoComponent {
  // tslint:disable-next-line:max-line-length
  private userCreation = 'CREATE TABLE IF NOT EXISTS user (idGracza INTEGER PRIMARY KEY, imie TEXT, nazwisko TEXT, login TEXT, rola TEXT, email TEXT, wiek INTEGER, wyksztalcenie TEXT, konto FLOAT)'
  private database: any;
  graczApi: Gracz = new Gracz;
  currentUser: Gracz;
  constructor(private userService: UserService,
    private sqliteService: DatabaseService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.fetch();
    sqliteService.getdbConnection().then(db => {
      this.database = db;
    }, error => {
      console.log('OPEN DB ERROR: ', error);
    });
    this.userService.getById(this.currentUser.id).pipe(first()).subscribe(u => {
      this.graczApi = u;
      this.insert(this.graczApi);
    }, error => {
      console.log('BRAK DOSTĘPU DO INTERNETU')
    });
  }
  // koniec konstruktora

  get isAdmin() {
    return this.currentUser && this.currentUser.rola === Role.Admin;
  }

  public insert(gracz: Gracz) {
    this.database.execSQL('DROP TABLE IF EXISTS user');
    // tslint:disable-next-line:max-line-length
    this.database.execSQL(this.userCreation)
      .then(x => {// tslint:disable-next-line:max-line-length
        this.database.execSQL('INSERT INTO user (idGracza, imie, nazwisko, login, rola, email, wiek, wyksztalcenie, konto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [gracz.id, gracz.imie, gracz.nazwisko, gracz.login,
          gracz.rola, gracz.email, gracz.wiek, gracz.wyksztalcenie, gracz.konto]).then(id => {
            console.log('INSERT RESULT', id);
            this.fetch();
          }, error => {
            console.log('INSERT ERROR', error);
          });
      });
  }

  public fetch() {
    this.sqliteService.getdbConnection().then(db => {
      db.all('SELECT * FROM user').then(rows => {
        this.graczApi.id = rows[0][0];
        this.graczApi.imie = rows[0][1];
        this.graczApi.nazwisko = rows[0][2];
        this.graczApi.login = rows[0][3];
        this.graczApi.rola = rows[0][4];
        this.graczApi.email = rows[0][5];
        this.graczApi.wiek = rows[0][6];
        this.graczApi.wyksztalcenie = rows[0][7];
        this.graczApi.konto = rows[0][8];
      }, error => {
        console.log('SELECT ERROR', error);
      });
    });
    this.sqliteService.closedbConnection();
  }

}



