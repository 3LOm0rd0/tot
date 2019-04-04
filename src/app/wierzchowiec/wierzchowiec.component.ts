import { Component, OnInit } from '@angular/core';
import {Wierzchowiec, WierzchowiecInsert} from '../Models/Wierzchowiec';
import {RecordsService} from '../Services/records.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../Services/alert.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-wierzchowiec',
  templateUrl: './wierzchowiec.component.html',
  styleUrls: ['./wierzchowiec.component.css']
})


export class WierzchowiecComponent implements OnInit {
  wierzchForm: FormGroup;
  loading = false;
  submitted = false;
  koniki: Wierzchowiec[];
  kon:WierzchowiecInsert;
  selectedkoniki: Wierzchowiec;

  constructor(private service: RecordsService,
    private formBuilder:FormBuilder,
    private router: Router,
    private alertService:AlertService) { }

  ngOnInit() {
    this.wierzchForm=this.formBuilder.group({
      nazwaWierzchowca:['',Validators.required],
      rasa: ['',Validators.required],
      wiek: ['',Validators.required],
      umaszczenie: ['',Validators.required],
      plec: ['',Validators.required],
      znakiSzczegolne:['',Validators.required],
      wlasciciel: ['',Validators.required],     
    });
    this.service.getWierzchowce().subscribe(s=>this.koniki=s);
  }
  get f(){return this.wierzchForm.controls;}

  onSubmit(){
    this.submitted=true;
    if(this.wierzchForm.invalid){
      return; 
    }
    this.kon=Object.assign({},this.wierzchForm.value);
    
    this.loading=true;
    this.service.addHorse(this.kon)
    .pipe(first())
    .subscribe(
      data=>{
     this.alertService.success('Dodawanie zakończone powowdzeniem', true);
       this.router.navigate(['/moje-konto']);
      }
    )
  }

}
