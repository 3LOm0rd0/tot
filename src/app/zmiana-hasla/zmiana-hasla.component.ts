import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import{Router, ActivatedRoute} from '@angular/router'
import {UserService} from '../Services/user-service.service'
import { AlertService } from '../Services/alert.service';
import { Gracz } from '../Models/Gracz';
import { AuthServiceService } from '../Services/auth-service.service';
@Component({
  selector: 'app-zmiana-hasla',
  templateUrl: './zmiana-hasla.component.html',
  styleUrls: ['./zmiana-hasla.component.css']
})
export class ZmianaHaslaComponent implements OnInit {
  hasloForm: FormGroup;
  gracz: Gracz;
  loading = false;
  submitted = false;
  currentUser: Gracz;
  constructor(private formBuilder:FormBuilder,
    private userService:UserService,
    private router: Router,
    private alertService:AlertService,
    private authenticationService: AuthServiceService) {
      this.currentUser=this.authenticationService.currentUserValue;}

  ngOnInit() {
    this.hasloForm=this.formBuilder.group({
      Haslo:['',Validators.required]
    });
  }
  get f(){return this.hasloForm.controls;}
  onSubmit(){
    this.submitted=true;
    if(this.hasloForm.invalid){
      return; 
    }
    this.gracz=Object.assign({},this.hasloForm.value);
    
    this.loading=true;
    this.userService.updateUserHaslo(this.currentUser.id,this.gracz)
    .pipe(first())
    .subscribe(
      data=>{
        this.alertService.success('Aktualizacja hasla zakończona powowdzeniem', true);
        this.authenticationService.logout();
        this.router.navigate(['/login']);
      }
    )
  }
}
