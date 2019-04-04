import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';  
import {Gracz,GraczHaslo, GraczView} from '../Models/Gracz';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
baseUrl=environment.baseUrl;
  constructor(private http:HttpClient) {}

  register(gracz: Gracz){
    return this.http.post(this.baseUrl+'/Gracz/register',gracz);
  }

  getAll():Observable<Gracz[]>{
    return this.http.get<Gracz[]>(this.baseUrl+'/profile/Graczprofile/all');
  }

  getById(id: number):Observable<GraczView>{
    return this.http.get<GraczView>(this.baseUrl+`/profile/Graczprofile/${id}`);
  }
  updateUser(id:number,gracz:Gracz){
    return this.http.put<Gracz>(this.baseUrl+`/Gracz/update/${id}`,gracz);
  }
  updateUserHaslo(id:number,gracz:Gracz){
    return this.http.put<Gracz>(this.baseUrl+`/Gracz/update/password/${id}`,gracz);
  }
  
}
