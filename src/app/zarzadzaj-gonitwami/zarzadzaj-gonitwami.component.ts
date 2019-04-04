import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import{Router, ActivatedRoute} from '@angular/router'
import { AlertService } from '../Services/alert.service';
import { GonitwaServiceService } from '../Services/gonitwa-service.service';
import { GonitwaInsert } from '../Models/Gonitwa';
@Component({
  selector: 'app-zarzadzaj-gonitwami',
  templateUrl: './zarzadzaj-gonitwami.component.html',
  styleUrls: ['./zarzadzaj-gonitwami.component.css']
})
export class ZarzadzajGonitwamiComponent implements OnInit {
  updateForm: FormGroup;
  loading = false;
  submitted = false;
  doadawek:GonitwaInsert;

  constructor(private formBuilder:FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private alertService:AlertService,
    private serviceGonitwy: GonitwaServiceService) { }
    today=Date.now();
    
  ngOnInit() {
    this.updateForm=this.formBuilder.group({
      NazwaNagrody:['',Validators.required],
      WarunkiGonitwy:['',Validators.required],
      GodzinaRozpoczecia:['',Validators.required],
      Data:['',Validators.required],
      Dlugosc:['',Validators.required]
    });
  }
 get f(){return this.updateForm.controls;}
 onSubmit(){

  this.submitted=true;
  if(this.updateForm.invalid){
    return; 
  }
  this.doadawek=Object.assign({},this.updateForm.value);
  
  this.loading=true;
  //dodaje jeden element listy
  this.serviceGonitwy.addOneRace(this.doadawek)
  .pipe(first())
  .subscribe(
    data=>{
      this.alertService.success('Dodano gonitwe', true);
      this.router.navigate(['/gonitwy']);
    }
  )
  }

}
