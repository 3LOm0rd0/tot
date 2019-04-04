import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators, AbstractControl } from '@angular/forms';
import { AlertService } from '../Services/alert.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { GonitwaListaInsert, GonitwaLista, GonitwaInsert } from '../Models/Gonitwa';
import { Wierzchowiec, KursKonia } from '../Models/Wierzchowiec';
import { GonitwaServiceService } from '../Services/gonitwa-service.service';
import { RecordsService } from '../Services/records.service';
import { Gracz } from '../Models/Gracz';
import { AuthServiceService } from '../Services/auth-service.service';
import{Role} from '../Models/Role';

@Component({
  selector: 'app-aktual-gonitwy',
  templateUrl: './aktual-gonitwy.component.html',
  styleUrls: ['./aktual-gonitwy.component.css']
})
export class AktualGonitwyComponent implements OnInit {
dodajForm:FormGroup;
updateForm:FormGroup;
kursKonia:KursKonia;
listaWyscigu:GonitwaListaInsert;
lista:GonitwaLista[];
aktualna:GonitwaInsert;
idParameter:number;
idker:number;
loading = false;
submitted = false;
private sub:any;
wierzchowce:Wierzchowiec[]=[];
today=Date.now();
kursPRD:number=0;
error:boolean=false;
currentUser:Gracz;



  constructor(private formBuilder:FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService:AuthServiceService,
    private alertService:AlertService,
    private serviceGonitwy: GonitwaServiceService,
    private recordsService:RecordsService) {  this.authenticationService.currentUser.subscribe(s=>this.currentUser=s);}

  ngOnInit() {
    
    this.sub=this.route.params.subscribe(params=>{
      this.idParameter=+params['id'];
 
      
      this.recordsService.getWierzchowce().pipe(first()).subscribe(s=>this.wierzchowce=s);
      this.serviceGonitwy.getListaWysciguById(this.idParameter).pipe(first()).subscribe(s=>this.lista=s);
     
      this.dodajForm=this.formBuilder.group({
      NrGonitwyWSezonie:[this.idParameter,Validators.required],
      NrWierzchowca:['',Validators.required],
      NrDzokeja:['Dzokej',Validators.required],
      Kurs:[this.kursPRD, Validators.required],
    });

      this.updateForm=this.formBuilder.group({
        NazwaNagrody:['',Validators.nullValidator],
        WarunkiGonitwy:['',Validators.required],
        GodzinaRozpoczecia:['',Validators.required],
        Data:['',Validators.required],
        Dlugosc:['',Validators.required]
      });
    
 })

  }
 

    
  

  dajKurs(index){
    this.idker= index.target.value;
    console.log(this.idker);
    this.serviceGonitwy.getKursKonia(this.idker).subscribe(s=>{this.kursKonia=s
      this.kursPRD = s.kursPred;
this.dodajForm.controls['Kurs'].setValue(s.kursPred);
    });
   
    
  }
  ngOnDestory(){
    this.sub.unsubscribe();
  }
  get f(){return this.dodajForm.controls;}

  pokaz(){
    console.log(this.kursPRD);
  }
  onSubmit(){

    this.submitted=true;
    if(this.dodajForm.invalid){
      return; 
    }
    this.listaWyscigu=Object.assign({},this.dodajForm.value);
    
    this.loading=true;
    //dodaje jeden element listy
    this.serviceGonitwy.addListaWyscigu(this.listaWyscigu)
    .pipe(first())
    .subscribe(
      data=>{
        this.alertService.success('Dodano gonitwe', false);
        location.reload();
      }
    )
  }

  usunZListy(id:number){
    if(confirm("Jesteś pewnien?")){
    this.serviceGonitwy.usunZListyStartowej(id)
    .pipe(first())
    .subscribe(
      data=>{
        this.alertService.success('Usunieto uczestnika', false);
        location.reload();
      }
    )
    }
  }
  get isAdmin(){
    return this.currentUser && this.currentUser.rola==Role.Admin;
  }
  onAktual(){

    this.submitted=true;
    if(this.updateForm.invalid){
      return; 
    }
    this.aktualna=Object.assign({},this.updateForm.value);
    
    this.loading=true;
   
    this.sub=this.route.params.subscribe(params=>{
      this.idParameter=+params['id'];
    this.serviceGonitwy.updateGonitwe(this.aktualna,this.idParameter)
    .pipe(first())
    .subscribe(
      data=>{
        this.alertService.success('Zaktualizowano gonitwe', true);
        this.router.navigate(['/gonitwy']);
      }
    )
    })
  }
}
