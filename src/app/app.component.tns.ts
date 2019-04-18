import { RouterExtensions } from 'nativescript-angular/router';
import { Component, AfterViewInit, ChangeDetectorRef, ViewChild, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { Router } from '@angular/router';
import { AuthServiceService } from './Services/auth-service.service';
import { Gracz } from './Models/Gracz';
import { Role } from './Models/Role';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';



@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.tns.html',
   styleUrls: ['./app.component.css'],
})

export class AppComponent implements AfterViewInit, OnInit  {
  private _mainContentText: string;
  currentUser: Gracz;
  constructor(page: Page,
    private router: RouterExtensions,
    private authenticationService: AuthServiceService,
    private _changeDetectionRef: ChangeDetectorRef ) {
  page.actionBarHidden = true;
    this.authenticationService.currentUser.subscribe(s => this.currentUser = s);
  }
  @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;
    public ngOnInit(){
      this.mainContentText = "SideDrawer for NativeScript can be easily setup in the HTML definition of your page by defining tkDrawerContent and tkMainContent. The component has a default transition and position and also exposes notifications related to changes in its state. Swipe from left to open side drawer.";
  }
    ngAfterViewInit() {
      this.drawer = this.drawerComponent.sideDrawer;
      this._changeDetectionRef.detectChanges();
  }



  get mainContentText() {
      return this._mainContentText;
  }

  set mainContentText(value: string) {
      this._mainContentText = value;
  }

  public openDrawer() {
      this.drawer.showDrawer();
  }

  public onCloseDrawerTap() {
      this.drawer.closeDrawer();
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.rola === Role.Admin;
  }
  logout() {
    this.authenticationService.logout();

    this.router.navigate(['/login'],{clearHistory:true});
  }

}
