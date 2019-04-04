import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {GonitwaAll, GonitwaLista, GonitwaInsert, GonitwaListaInsert} from '../Models/Gonitwa';
import { Observable } from 'rxjs';
import { KursKonia } from '../Models/Wierzchowiec';
import { Wynik, WynikAnswer } from '../Models/Wynik';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GonitwaServiceService {

baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


    getAll(): Observable<GonitwaAll[]> {
     return this.http.get<GonitwaAll[]>(this.baseUrl + '/Gonitwa/all');
    }
    getAllFuture(): Observable<GonitwaAll[]> {
      return this.http.get<GonitwaAll[]>(this.baseUrl + '/Gonitwa/all/future');
    }
    getListaWysciguById(id: number): Observable<GonitwaLista[]> {
      console.log(id);
      return this.http.get<GonitwaLista[]>(this.baseUrl + `/ListaStartowa/lista-wyscigu/${id}`);
    }
    addOneRace(g: GonitwaInsert) {
      return this.http.post<GonitwaInsert>(this.baseUrl + '/Gonitwa/dodajGonitwe', g);
    }
    addListaWyscigu(element: GonitwaListaInsert) {
      return this.http.post<GonitwaListaInsert>(this.baseUrl + '/Gonitwa/dodajListaElement', element);
    }
    usunZListyStartowej(id: number) {
      return this.http.delete(this.baseUrl + '/Gonitwa/usunListaElement/${id}`');
    }
    updateGonitwe(obiekt: GonitwaInsert, id: number): Observable<GonitwaInsert> {
      return this.http.put<GonitwaInsert>(this.baseUrl + `/Gonitwa/aktualizujGonitwe/${id}`, obiekt);
    }
    postWynik(wynik: Wynik) {
      return this.http.post(this.baseUrl + '/Gonitwa/dodajWynik', wynik);
    }
    getWynik(id: number): Observable<Wynik> {
      return this.http.get<Wynik>(this.baseUrl + `/Gonitwa/wynik/${id}`);
    }
    czyJestWynik(id: number): Observable<WynikAnswer> {
      return this.http.get<WynikAnswer>(this.baseUrl + `/Gonitwa/wynikAnswer/${id}`);
    }
    getKursKonia(id: number): Observable<KursKonia> {
    return this.http.get<KursKonia>(this.baseUrl + `/profile/dajKurs/${id}`);

    }
    usunGonitwe(id: number) {
      return this.http.delete(this.baseUrl + `/Gonitwa/usunGonitwe/${id}`);
    }
}
