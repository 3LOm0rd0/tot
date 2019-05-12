import { Component, AfterViewInit, ChangeDetectorRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouterExtensions } from 'nativescript-angular/router';
import { Page } from 'tns-core-modules/ui/page/page';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Router } from '@angular/router';
import { AuthServiceService } from './Services/auth-service.service';
import { Gracz } from './Models/Gracz';
import { Role } from './Models/Role';
import { UIService } from './Services/ui.service';




@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.tns.html',
   styleUrls: ['./app.component.css'],
})

export class AppComponent implements AfterViewInit, OnInit, OnDestroy  {
 private drawerSub: Subscription;
  private drawer: RadSideDrawer;
  currentUser: Gracz = new Gracz;


  constructor(page: Page,
    private uiService: UIService,
    private router: RouterExtensions,
    private authenticationService: AuthServiceService,
    private _changeDetectionRef: ChangeDetectorRef ) {
  page.actionBarHidden = true;
  //  this.authenticationService.currentUser.subscribe(s => this.currentUser = s);
  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;

    public ngOnInit(){

      this.drawerSub = this.uiService.drawerState.subscribe(() => {
        if (this.drawer) {
          this.drawer.toggleDrawerState();
          this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
        }
       });

      }
    ngAfterViewInit() {

      this.drawer =  this.drawerComponent.sideDrawer;
      this._changeDetectionRef.detectChanges();



  }
  ngOnDestroy(): void {
    if(this.drawerSub){
        this.drawerSub.unsubscribe();
    }
  }

  public onCloseDrawerTap() {

      this.drawer.closeDrawer();
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.rola === Role.Admin;
  }
  logout() {
    this.router.navigate(['/login']);
    this.authenticationService.logout();
    this.drawer.closeDrawer();

  }
  pyk() {this.currentUser = JSON.parse(localStorage.getItem('currentUser'));}
}
