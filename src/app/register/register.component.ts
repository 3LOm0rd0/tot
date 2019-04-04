import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import{Router, ActivatedRoute} from '@angular/router'
import {UserService} from '../Services/user-service.service'
import { AlertService } from '../Services/alert.service';
import { Gracz } from '../Models/Gracz';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  gracz: Gracz;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService,
    private router: Router,
    private alertService:AlertService) { }

  ngOnInit() {
    this.registerForm=this.formBuilder.group({
      Imie:['',Validators.required],
      Nazwisko: ['',Validators.required],
      Login: ['',Validators.required],
      Haslo: ['',[Validators.required, Validators.minLength(6)]],
      Rola:['user',[Validators.required]]
    });
  }
  get f(){return this.registerForm.controls;}

  onSubmit(){
    this.submitted=true;
    if(this.registerForm.invalid){
      return; 
    }
    this.gracz=Object.assign({},this.registerForm.value);
    
    this.loading=true;
    this.userService.register(this.gracz)
    .pipe(first())
    .subscribe(
      data=>{
        this.alertService.success('Rejestracja zakończona powodzeniem', true);
        this.router.navigate(['/login']);
      }
    )
  }
  
}
