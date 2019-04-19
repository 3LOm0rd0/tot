import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class UIService{

  private _drawerState = new BehaviorSubject<boolean>(false);

get drawerState(){
  return this._drawerState.asObservable();
}
toggleDrawer(){
  this._drawerState.next(true);
}
}
