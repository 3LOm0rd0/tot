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
import { ObliczeniaService } from '../Services/obliczenia.service';
import { UserService } from '../Services/user-service.service';
import { alert, confirm, prompt, login, action, inputType } from "tns-core-modules/ui/dialogs";
@Component({
  selector: 'app-obstaw',
  templateUrl: './obstaw.component.html',
  styleUrls: ['./obstaw.component.css']
})
export class ObstawComponent implements OnInit {
  idP: number = 0;
  zakladForm: FormGroup;
  lista: GonitwaLista[];
  id: number;
  private sub: any;
  zaklad: InsertZaklad;
  rodzaje: WidokRodzajZaklad[];
  rodzaj: WidokRodzajZaklad;
  rodzajselected: number;
  loading = false;
  submitted = false;
  konto: number;
  currentUser: Gracz;
  answer: boolean = true;
  options = [];
  rodzajeKuponu = []

  constructor(private ZakladService: ZakladService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private authenticationService: AuthServiceService,
    private serviceGonitwy: GonitwaServiceService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;


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

      this.zakladForm = this.formBuilder.group({
        RodzajZakladu: ['', Validators.required],
        IdGonitwy: [this.id, Validators.required],
        IdGracza: [this.currentUser.id, Validators.required],
        Stawka: ['', Validators.required],
        Typowanie1: ['null', Validators.required],
        Typowanie2: ['nie dotyczy', Validators.required],
        Typowanie3: ['nie dotyczy', Validators.required],
        Typowanie4: ['nie dotyczy', Validators.required],
      });
    })
  }


  onChange(id) {
    this.idP = id.target.value;
    this.zakladForm.controls['Typowanie1'].setValue('nie dotyczy');
    this.zakladForm.controls['Typowanie2'].setValue('nie dotyczy');
    this.zakladForm.controls['Typowanie3'].setValue('nie dotyczy');
    this.zakladForm.controls['Typowanie4'].setValue('nie dotyczy');
  }
  ngOnDestory() {
    this.sub.unsubscribe();
  }
  get f() { return this.zakladForm.controls; }

  onSubmit() {

    this.submitted = true;
    if (this.zakladForm.invalid) {
      return;
    }
    this.zaklad = Object.assign({}, this.zakladForm.value)
    this.loading = true;
    this.userService.getById(this.currentUser.id).pipe(first()).subscribe(u => {
    this.currentUser = u;
      if (this.zaklad.Stawka > u.konto) {
        this.alertService.success("Za duża stawka.Twoje konto nie jest tak bogate. Doładuj je!", true);
        return this.answer = false;
      }
    });
    if (this.answer == true) {
      this.ZakladService.dodajZaklad(this.zaklad)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success("Dodano zaklad", true);
            this.router.navigate(['/gonitwy']);
          }
        )
    }
    this.router.navigate(['/gonitwy']);
  }
  selectBetType() {
    action({
      message: "Wybierz psa",
      cancelButtonText: "Anuluj",
      actions: this.rodzajeKuponu
    }).then((result) => {
      console.log(result)
    });
  }
  selectType1(){
    action({
      message: "Typ 1",
      cancelButtonText: "Anuluj",
      actions: this.options
    }).then((result) => {
      console.log(result)
    });
  }
  selectType2(){
    action({
      message: "Typ 2",
      cancelButtonText: "Anuluj",
      actions: this.options
    }).then((result) => {
      console.log(result)
    });
  }
  selectType3(){
    action({
      message: "Typ 3",
      cancelButtonText: "Anuluj",
      actions: this.options
    }).then((result) => {
      console.log(result)
    });
  }
  selectType4(){
    action({
      message: "Typ 4",
      cancelButtonText: "Anuluj",
      actions: this.options
    }).then((result) => {
      console.log(result)
    });
  }

  setCash() {
    prompt({
        title: "Stawka",
        message: "O ile zagramy?",
        okButtonText: "Zatwierdź",
        cancelButtonText: "Odrzuć",
        defaultText: "200",
        inputType: inputType.number
    }).then((result) => {
        // The result property is true if the dialog is closed with the OK button, false if closed with the Cancel button or undefined if closed with a neutral button.
        console.log("Dialog result: " + result.result);
        console.log("Text: " + result.text);
    })
}
}
