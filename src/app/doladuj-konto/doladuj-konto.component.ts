import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../Services/auth-service.service';
import { UserService } from '../Services/user-service.service';
import { AlertService } from '../Services/alert.service';
import { first } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Gracz } from '../Models/Gracz';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doladuj-konto',
  templateUrl: './doladuj-konto.component.html',
  styleUrls: ['./doladuj-konto.component.css']
})
export class DoladujKontoComponent implements OnInit {

  submitted = false;
  idP: number = 0;
  zakladForm: FormGroup;
  id: number;
  private sub: any;
  rodzajselected: number;
  loading = false;
  konto: number;
  currentUser: Gracz;
  answer: boolean = true;


  constructor(private auth: AuthServiceService,
    private user: UserService,
    private router: Router,
    private alertservice: AlertService) { this.currentUser = this.auth.currentUserValue; }

  ngOnInit() {
  }

  }
