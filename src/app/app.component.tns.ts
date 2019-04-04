import { Component } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent {
  constructor(page: Page)
  { page.actionBarHidden = true;
}

}
