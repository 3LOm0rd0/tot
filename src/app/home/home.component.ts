import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {Gracz} from '../Models/Gracz';
import {UserService} from '../Services/user-service.service';
import {AuthServiceService} from '../Services/auth-service.service';
import { GestureEventData } from 'tns-core-modules/ui/gestures/gestures';
import { Color } from 'tns-core-modules/color/color';
import {StackLayout} from 'tns-core-modules/ui/layouts/stack-layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: Gracz;
  userFromApi: Gracz;

  constructor(private userService: UserService,
    private authenticationService: AuthServiceService) {

    this.currentUser=this.authenticationService.currentUserValue;

   }

  ngOnInit() {
  //   this.userService.getById(this.currentUser.id).pipe(first()).subscribe(u=>{
  //   this.userFromApi=u;
  //  });
  }
  onTap(args: GestureEventData) {
    console.log("Tap!");
    console.log("Object that triggered the event: " + args.object);
    console.log("View that triggered the event: " + args.view);
    console.log("Event name: " + args.eventName);

    let grid = <StackLayout>args.object;
    grid.rotate = 0;
    grid.animate({
      backgroundColor: new Color("Aquamarine"),
        rotate: 360,
        duration: 1000
    }).then(() => {
      grid.animate({backgroundColor: new Color("White")}),
      console.log("Animation finished.");
  }).then(() => grid.animate({ opacity: 1, duration: 300 }))
  .then(() => grid.animate({ translate: { x: 200, y: 200 }, duration: 300 }))
  .then(() => grid.animate({ translate: { x: 0, y: 0 }, duration: 300 }))
  .then(() => grid.animate({ scale: { x: 5, y: 5 }, duration: 300 }))
  .then(() => grid.animate({ scale: { x: 1, y: 1 }, duration: 300 }))
  .then(() => grid.animate({ rotate: 180, duration: 300 }))
  .then(() => grid.animate({ rotate: 0, duration: 300 }));
}


  }

