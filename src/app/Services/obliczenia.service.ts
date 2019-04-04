import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Wygrana, InsertZaklad } from '../Models/Zaklad';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ObliczeniaService {
baseUrl=environment.baseUrl;
  constructor(private http:HttpClient ) { }

  dodajPieniadze(id:number,kwota:number){
    return this.http.put(this.baseUrl+`/values/doladuj/${id}`,kwota);
  }

  odejmijPieniadze(id:number, kwota:number){
    return this.http.put(this.baseUrl+`/values/odejmij/${id}`,kwota);
  }

  pobierzPieniadza(idGonitwy:number, idZakladu:number):Observable<Wygrana>{
    return this.http.get<Wygrana>(this.baseUrl+`/values/oblicz/${idGonitwy}/${idZakladu}`);
  }

}
