import { UIService } from './../Services/ui.service';
import { Component, OnInit, Input } from '@angular/core';
import {isAndroid} from 'tns-core-modules/ui/page';
import { Page } from 'tns-core-modules/ui/page';
import { RouterExtensions } from 'nativescript-angular/router';

declare var android: any;

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css'],
  moduleId: module.id
})
export class ActionBarComponent implements OnInit {
  @Input() title: string;
  @Input() hasMenu = false;
  @Input() showBackButton = true;

  constructor(private page: Page,
    private uiService: UIService,
     private router: RouterExtensions) { }

  ngOnInit() {
  }

  get canGoBack() {
    return this.router.canGoBack() && this.showBackButton;
  }

  onGoBack() {
    this.router.backToPreviousPage();
  }

  onLoadedActionBar() {
    if (isAndroid) {
      const androidToolbar = this.page.actionBar.nativeView;
      const backButton = androidToolbar.getNavigationIcon();
      if (backButton) {
        backButton.setColorFilter(
          android.graphics.Color.parseColor('#171717'),
          (<any>android.graphics).PorterDuff.Mode.SRC_ATOP
        );
      }
    }
  }
  onToggleMenu(){
    this.uiService.toggleDrawer();

  }
}
