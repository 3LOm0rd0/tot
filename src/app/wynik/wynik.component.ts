import { Component, OnInit } from '@angular/core';
import { ZakladService } from '../Services/zaklad.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GonitwaServiceService } from '../Services/gonitwa-service.service';
import { GonitwaLista } from '../Models/Gonitwa';
import { InsertZaklad, WidokRodzajZaklad } from '../Models/Zaklad';
import { Gracz } from '../Models/Gracz';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { AlertService } from '../Services/alert.service';
import { AuthServiceService } from '../Services/auth-service.service';
import { first, count } from 'rxjs/operators';
import { Wynik } from '../Models/Wynik';
import { Wierzchowiec } from '../Models/Wierzchowiec';
import { RecordsService } from '../Services/records.service';

@Component({
  selector: 'app-wynik',
  templateUrl: './wynik.component.html',
  styleUrls: ['./wynik.component.css']
})
export class WynikComponent implements OnInit {
  idP:number=0;
  wynikForm:FormGroup;
  lista: GonitwaLista[];
  listaTemp:GonitwaLista[];
  id:number;
  private sub:any;
  wynik: Wynik;

  loading = false;
  submitted = false;
  currentUser: Gracz;
  count : number =0;
  word:string="nie dotyczy";

  constructor(private ZakladService:ZakladService,
    private formBuilder:FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private alertService:AlertService,
    private recordsService:RecordsService,
    private authenticationService: AuthServiceService,
    private serviceGonitwy: GonitwaServiceService) {
      this.currentUser=this.authenticationService.currentUserValue;
     }

  ngOnInit() {
    this.sub=this.route.params.subscribe(params=>{
      this.id=+params['id'];
      
      this.serviceGonitwy.getListaWysciguById(this.id).pipe(first()).subscribe(s=>{this.lista=s;});
      
    

    this.wynikForm=this.formBuilder.group({
      NrGonitwyWSezonie:[this.id,Validators.required],
      konIMiejsce: [this.word,Validators.required],
      konIiMiejsce: ['nie dotyczy',Validators.required],
      konIiiMiejsce: ['nie dotyczy',Validators.required],
      konIvMiejsce: ['nie dotyczy',Validators.required],
      konVMiejsce: ['nie dotyczy',Validators.required],
      konViMiejsce: ['nie dotyczy',Validators.required],
      konViiMiejsce: ['nie dotyczy',Validators.required],   
    });
  

})

  }
  onSubmit(){

    this.submitted=true;
    if(this.wynikForm.invalid){
      return; 
    }
    this.wynik=Object.assign({},this.wynikForm.value);
    
    this.loading=true;
    
    this.serviceGonitwy.postWynik(this.wynik)
    .pipe(first())
    .subscribe(
      data=>{
        this.alertService.success('Zapisano wynik', true);
        localStorage.setItem("liczyc","1");
        this.router.navigate(['/gonitwy']);
      }
    )
  }

    }
