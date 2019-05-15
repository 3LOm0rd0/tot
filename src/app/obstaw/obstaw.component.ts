import { Component, OnInit } from '@angular/core';
import { ZakladService } from '../Services/zaklad.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GonitwaServiceService } from '../Services/gonitwa-service.service';
import { GonitwaLista } from '../Models/Gonitwa';
import { InsertZaklad, WidokRodzajZaklad } from '../Models/Zaklad';
import { Gracz, KwotaWidok, GraczView } from '../Models/Gracz';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../Services/alert.service';
import { AuthServiceService } from '../Services/auth-service.service';
import { first } from 'rxjs/operators';
import { UserService } from '../Services/user-service.service';
import { alert, prompt, action, inputType } from 'tns-core-modules/ui/dialogs';
@Component({
  selector: 'app-obstaw',
  templateUrl: './obstaw.component.html',
  styleUrls: ['./obstaw.component.tns.css']
})
export class ObstawComponent implements OnInit {
  idP: number = 1;
  // zakladForm: FormGroup;
  // rodzaj: WidokRodzajZaklad;
  //  rodzajselected: number;
  // konto: number;
  lista: GonitwaLista[];
  id: number;
  private sub: any;
  zaklad: InsertZaklad = new InsertZaklad;
  rodzaje: WidokRodzajZaklad[];
  loading = false;
  submitted = false;
  currentUser: Gracz;
  answer: Boolean = true;
  options = [];
  rodzajeKuponu = [];
  typeBet = 'zwyczajny';
  type1 = 'nie dotyczy';
  type2 = 'nie dotyczy';
  type3 = 'nie dotyczy';
  type4 = 'nie dotyczy';
  stawka = 0;

  constructor(private ZakladService: ZakladService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private authenticationService: AuthServiceService,
    private serviceGonitwy: GonitwaServiceService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.serviceGonitwy.getListaWysciguById(this.id).subscribe(s => {
        this.lista = s;
        this.lista.forEach(element => {
          this.options.push(element.nazwaWierzchowca);
        });
      });
      this.ZakladService.showZakladTypes().pipe(first()).subscribe(s => {
        this.rodzaje = s;
        this.rodzaje.forEach(element => {
          // Przypisanie rodzaju zakładu z listy obiektów do tablicy
          this.rodzajeKuponu.push(element.nazwaZakladu);
        });
      });
    });
  }
  ngOnDestory() {
    this.sub.unsubscribe();
  }
  onSubmit() {
    this.submitted = true;
    this.zaklad.IdGonitwy = this.id;
    this.zaklad.IdGracza = this.currentUser.id;
    this.zaklad.RodzajZakladu = this.idP;
    this.zaklad.Stawka = this.stawka;
    this.zaklad.Typowanie1 = this.type1;
    this.zaklad.Typowanie2 = this.type2;
    this.zaklad.Typowanie3 = this.type3;
    this.zaklad.Typowanie4 = this.type4;


    this.loading = true;

    this.userService.getById(this.currentUser.id).pipe(first()).subscribe(u => {
      this.currentUser = u;
      if (this.stawka > this.currentUser.konto) {
        this.cashAlert();
        this.answer = false;
      }

    });

    if (this.answer == true) {
      this.ZakladService.dodajZaklad(this.zaklad)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('Dodano zaklad', true);
            this.router.navigate(['/gonitwy']);
          }
        );
    }
  }

  selectBetType() {
    action({
      message: 'Wybierz typ zakładu:',
      cancelButtonText: 'Anuluj',
      actions: this.rodzajeKuponu
    }).then((result) => {
      if (result !== 'Anuluj') {
        this.typeBet = result;
        this.idP = this.rodzajeKuponu.indexOf(result) + 1;
        this.type1 = this.type2 = this.type3 = this.type4 = 'nie dotyczy';
      }
    });
  }
  selectType1() {
    action({
      message: 'Typ 1',
      actions: this.options
    }).then((result) => {
      this.type1 = result;
    });
  }
  selectType2() {
    action({
      message: 'Typ 2',
      actions: this.options
    }).then((result) => {
      this.type2 = result;
    });
  }
  selectType3() {
    action({
      message: 'Typ 3',
      actions: this.options
    }).then((result) => {
      this.type3 = result;
    });
  }
  selectType4() {
    action({
      message: 'Typ 4',
      actions: this.options
    }).then((result) => {
      this.type4 = result;
    });
  }

  cashAlert() {
    alert({
      title: 'Brak środków',
      message: 'Doładuj konto',
      okButtonText: 'OK'
    });
  }

  setCash() {
    prompt({
      title: 'Stawka',
      message: 'O ile zagramy?',
      okButtonText: 'Zatwierdź',
      defaultText: '200',
      inputType: inputType.number
    }).then((result) => {
      this.stawka = +result.text;
    });
  }
}
