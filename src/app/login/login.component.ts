import { AppComponent } from './../../../.tmp_backup/platforms/android/app/build/intermediates/merged_assets/debug/mergeDebugAssets/out/app/app/app.component.tns';
import { RouterExtensions } from 'nativescript-angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../Services/auth-service.service';
import { ActivatedRoute, NavigationStart } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AlertService} from '../Services/alert.service';
 import { Page } from 'tns-core-modules/ui/page/page';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthServiceService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  firstPage=true;

  constructor(
    page: Page,
    private route: ActivatedRoute,
    private router: RouterExtensions,
    private authenticationService: AuthServiceService,
    private alertService: AlertService,
    private formBuilder: FormBuilder) {
        page.actionBarHidden = false;
      //  page.actionBar.title="Sign in"
      // przekieruje do home jesli zalogowany
      if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/'],{clearHistory:true});
    }
  }
  ngOnInit() {
    console.log("Wywołuje login");
    this.loginForm = this.formBuilder.group({
      Login: ['', Validators.required],
      Haslo: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
  get f() {return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.f.Login.value, this.f.Haslo.value)
    .pipe(first())
    .subscribe(
      data => {
        console.log('zalogowany');

        this.loading = false;
        this.router.navigate([this.returnUrl], {clearHistory: true});


      },
      error => {
        this.error = error;
        this.loading = false;
      }
    );
  }

}


