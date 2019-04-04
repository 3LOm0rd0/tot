import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { WierzchowiecComponent } from './wierzchowiec/wierzchowiec.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import {AuthGuard} from './helpers/authGuard';
import {JwtAnswer} from './helpers/JwtAnswer';
import {ErrorInterceptor} from './helpers/errorInterceptor';
import { AlertService } from './Services/alert.service';
import { UserService } from './Services/user-service.service';
import {AuthServiceService} from './Services/auth-service.service';
import { GonitwyComponent } from './gonitwy/gonitwy.component';
import { ZarzadzajGonitwamiComponent } from './zarzadzaj-gonitwami/zarzadzaj-gonitwami.component';
import { MojeKontoComponent } from './moje-konto/moje-konto.component';
import { HistoriaComponent } from './historia/historia.component';
import { JakGracComponent } from './jak-grac/jak-grac.component';
import { SzczegolyWysciguComponent } from './szczegoly-wyscigu/szczegoly-wyscigu.component';
import { AktualizacjaComponent } from './aktualizacja/aktualizacja.component';
import { ZmianaHaslaComponent } from './zmiana-hasla/zmiana-hasla.component';
import { ObstawComponent } from './obstaw/obstaw.component';
import { MojeZakladyComponent } from './moje-zaklady/moje-zaklady.component';
import { WynikComponent } from './wynik/wynik.component';
import { AktualGonitwyComponent } from './aktual-gonitwy/aktual-gonitwy.component';
import { ObliczeniaService } from './Services/obliczenia.service';
import { DoladujKontoComponent } from './doladuj-konto/doladuj-konto.component';
import { PaymentComponent } from './payment/payment.component';




@NgModule({
  declarations: [
    AppComponent,
    WierzchowiecComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    RegisterComponent,
    AlertComponent,
    GonitwyComponent,
    ZarzadzajGonitwamiComponent,
    MojeKontoComponent,
    HistoriaComponent,
    JakGracComponent,
    SzczegolyWysciguComponent,
    AktualizacjaComponent,
    ZmianaHaslaComponent,
    ObstawComponent,
    MojeZakladyComponent,
    WynikComponent,
    AktualGonitwyComponent,
    DoladujKontoComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    AuthServiceService,
    AlertService,
    ObliczeniaService,

    UserService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtAnswer, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
