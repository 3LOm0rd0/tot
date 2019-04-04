import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {Gracz} from '../Models/Gracz';
import {UserService} from '../Services/user-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
gracze: Gracz[]=[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAll().pipe(first()). subscribe(s => {
      this.gracze = s;
    });
  }

}
