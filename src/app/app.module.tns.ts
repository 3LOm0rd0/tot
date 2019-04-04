import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
require( 'nativescript-localstorage' );

import { AppRoutingModule } from './app-routing.module.tns';
import { AppComponent } from './app.component';


// Uncomment and add to NgModule imports if you need to use two-way binding
 import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
 import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { AdminComponent } from './admin/admin.component';
import { AktualGonitwyComponent } from './aktual-gonitwy/aktual-gonitwy.component';
import { AktualizacjaComponent } from './aktualizacja/aktualizacja.component';
import { AlertComponent } from './alert/alert.component';
import { DoladujKontoComponent } from './doladuj-konto/doladuj-konto.component';
import { GonitwyComponent } from './gonitwy/gonitwy.component';
import { HistoriaComponent } from './historia/historia.component';
import { HomeComponent } from './home/home.component';
import { JakGracComponent } from './jak-grac/jak-grac.component';
import { LoginComponent } from './login/login.component';
import { MojeKontoComponent } from './moje-konto/moje-konto.component';
import { MojeZakladyComponent } from './moje-zaklady/moje-zaklady.component';
import { ObstawComponent } from './obstaw/obstaw.component';
import { PaymentComponent } from './payment/payment.component';
import { RegisterComponent } from './register/register.component';
import { SzczegolyWysciguComponent } from './szczegoly-wyscigu/szczegoly-wyscigu.component';
import { WierzchowiecComponent } from './wierzchowiec/wierzchowiec.component';
import { WynikComponent } from './wynik/wynik.component';
import { ZarzadzajGonitwamiComponent } from './zarzadzaj-gonitwami/zarzadzaj-gonitwami.component';
import { ZmianaHaslaComponent } from './zmiana-hasla/zmiana-hasla.component';
import {NativeScriptUISideDrawerModule} from 'nativescript-ui-sidedrawer/angular';
import { AuthGuard } from './helpers/authGuard';
import { AuthServiceService } from './Services/auth-service.service';
import { ObliczeniaService } from './Services/obliczenia.service';
import { AlertService } from './Services/alert.service';
import { UserService } from './Services/user-service.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AktualGonitwyComponent,
    AktualizacjaComponent,
    AlertComponent,
    DoladujKontoComponent,
    GonitwyComponent,
    HistoriaComponent,
    HomeComponent,
    JakGracComponent,
    LoginComponent,
    MojeKontoComponent,
    MojeZakladyComponent,
    ObstawComponent,
    PaymentComponent,
    RegisterComponent,
    SzczegolyWysciguComponent,
    WierzchowiecComponent,
    WynikComponent,
    ZarzadzajGonitwamiComponent,
    ZmianaHaslaComponent,

  ],
  imports: [
    NativeScriptModule,
    NativeScriptHttpClientModule,
    NativeScriptFormsModule,
    AppRoutingModule,
    NativeScriptUISideDrawerModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    AuthServiceService,

    AlertService,
    ObliczeniaService,
    UserService,
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
