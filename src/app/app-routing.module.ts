import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WierzchowiecComponent } from './wierzchowiec/wierzchowiec.component';
import {HomeComponent} from './home/home.component';
import {AdminComponent} from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {HistoriaComponent} from './historia/historia.component';
import {GonitwyComponent} from './gonitwy/gonitwy.component';
import {MojeKontoComponent} from './moje-konto/moje-konto.component';
import {ZarzadzajGonitwamiComponent} from './zarzadzaj-gonitwami/zarzadzaj-gonitwami.component';
import { AuthGuard } from './helpers/authGuard';
import {Role} from './Models/Role';
import { JakGracComponent } from './jak-grac/jak-grac.component';
import {SzczegolyWysciguComponent} from './szczegoly-wyscigu/szczegoly-wyscigu.component';
import { AktualizacjaComponent } from './aktualizacja/aktualizacja.component';
import { ZmianaHaslaComponent } from './zmiana-hasla/zmiana-hasla.component';
import { ObstawComponent } from './obstaw/obstaw.component';
import { MojeZakladyComponent } from './moje-zaklady/moje-zaklady.component';
import { WynikComponent } from './wynik/wynik.component';
import { AktualGonitwyComponent } from './aktual-gonitwy/aktual-gonitwy.component';
import { DoladujKontoComponent } from './doladuj-konto/doladuj-konto.component';

const routes: Routes = [
  {path: 'doladuj', component: DoladujKontoComponent, canActivate: [AuthGuard]},
  {path: 'zarzadzaj-gonitwami', component: ZarzadzajGonitwamiComponent, canActivate: [AuthGuard]},
  {path: 'wynik/:id', component: WynikComponent, canActivate: [AuthGuard]},
   {path: 'aktual-gonitwy/:id', component: AktualGonitwyComponent, canActivate: [AuthGuard]},
  {path: 'moje-zaklady', component: MojeZakladyComponent, canActivate: [AuthGuard]},
  {path: 'obstaw/:id', component: ObstawComponent, canActivate: [AuthGuard]},
  {path: 'zmiana-hasla', component: ZmianaHaslaComponent, canActivate: [AuthGuard]},
  {path: 'aktualizacja', component: AktualizacjaComponent, canActivate: [AuthGuard]},
  {path: 'szczegoly-wyscigu/:id', component: SzczegolyWysciguComponent},
  {path: 'zarzadzaj-gonitwa', component: ZarzadzajGonitwamiComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]},
  {path: 'historia', component: HistoriaComponent},
  {path: 'jak-grac', component: JakGracComponent},
  {path: 'moje-konto', component: MojeKontoComponent, canActivate: [AuthGuard]},
   {path: 'gonitwy', component: GonitwyComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], canLoad: [ AuthGuard]},
   {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'wierzchowiec', component: WierzchowiecComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
