import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';  
import {Gracz,GraczHaslo} from '../Models/Gracz';
import { Observable } from 'rxjs';
import { WidokRodzajZaklad, InsertZaklad, WidokZaklad, WidokZakladWynik } from '../Models/Zaklad';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZakladService {
baseUrl=environment.baseUrl;
  constructor(private http:HttpClient) { }


showZakladTypes():Observable<WidokRodzajZaklad[]>{
  return this.http.get<WidokRodzajZaklad[]>(this.baseUrl+'/GraczZaklad/rodzaje');
}
dodajZaklad(zaklad:InsertZaklad){
  return this.http.post<InsertZaklad>(this.baseUrl+`/GraczZaklad/dodanieZakladu`,zaklad);
}
pokazMojeZakladyPrzed(id:number):Observable<WidokZaklad[]>{
  return this.http.get<WidokZaklad[]>(this.baseUrl+`/GraczZaklad/ListaZakladowPrzed/${id}`)
}
pokazMojeZakladyPo(id:number):Observable<WidokZakladWynik[]>{
  return this.http.get<WidokZakladWynik[]>(this.baseUrl+`/values/oblicz/${id}`)
}
usunZaklad(id:number){
  return this.http.delete<WidokZaklad>(this.baseUrl+`/GraczZaklad/usun/${id}`);
}
odejmijPieniadze(id:number, kwota:number){
  return this.http.put<InsertZaklad>(this.baseUrl+`/values/odejmij/${id}`,kwota);
}
}