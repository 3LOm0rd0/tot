import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Wierzchowiec, WierzchowiecInsert } from '../Models/Wierzchowiec';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})

export class RecordsService {

  constructor(private http: HttpClient) { }
baseUrl=environment.baseUrl;
  wierzchowce:Wierzchowiec[];

  getWierzchowce(): Observable<Wierzchowiec[]>{
    return this.http.get<Wierzchowiec[]>(this.baseUrl+'/profile/wierzchowiec/all')
  }
  
  addHorse(kon:WierzchowiecInsert):Observable<WierzchowiecInsert>{
    return this.http.post<WierzchowiecInsert>(this.baseUrl+`/profile/DodajWierzchowiec`,kon);
  }
  }

