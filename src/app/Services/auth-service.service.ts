import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Gracz} from '../Models/Gracz';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
private currentUserSubject: BehaviorSubject<Gracz>;
public currentUser: Observable<Gracz>;
baseUrl = environment.baseUrl;





constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Gracz>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): Gracz {
     return this.currentUserSubject.value;
   }

  login(Login: string, Haslo: string) {
    return this.http.post<any>(this.baseUrl + '/Gracz/authenticate', {Login: Login, Haslo: Haslo})
    .pipe(map(gracz => {
      if (gracz && gracz.token) {
        localStorage.setItem('currentUser', JSON.stringify(gracz));
        this.currentUserSubject.next(gracz);
      }

      return gracz;
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.clear();
    this.currentUserSubject.next(null);
  }
}
