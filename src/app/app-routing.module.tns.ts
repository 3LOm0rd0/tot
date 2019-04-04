import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './helpers/authGuard';
import { AktualGonitwyComponent } from './aktual-gonitwy/aktual-gonitwy.component';
import { AktualizacjaComponent } from './aktualizacja/aktualizacja.component';
import { DoladujKontoComponent } from './doladuj-konto/doladuj-konto.component';
import { GonitwyComponent } from './gonitwy/gonitwy.component';
import { HomeComponent } from './home/home.component';
import { HistoriaComponent } from './historia/historia.component';
import { JakGracComponent } from './jak-grac/jak-grac.component';
import { MojeKontoComponent } from './moje-konto/moje-konto.component';
import { LoginComponent } from './login/login.component';
import { MojeZakladyComponent } from './moje-zaklady/moje-zaklady.component';
import { ObstawComponent } from './obstaw/obstaw.component';
import { SzczegolyWysciguComponent } from './szczegoly-wyscigu/szczegoly-wyscigu.component';
import { RegisterComponent } from './register/register.component';
import { WierzchowiecComponent } from './wierzchowiec/wierzchowiec.component';
import { ZarzadzajGonitwamiComponent } from './zarzadzaj-gonitwami/zarzadzaj-gonitwami.component';
import { ZmianaHaslaComponent } from './zmiana-hasla/zmiana-hasla.component';
import { WynikComponent } from './wynik/wynik.component';


// const routes: Routes = [
//   {path: 'doladuj', component: DoladujKontoComponent, canActivate: [AuthGuard]},
//   {path: 'zarzadzaj-gonitwami', component: ZarzadzajGonitwamiComponent, canActivate: [AuthGuard]},
//   {path: 'wynik/:id', component: WynikComponent, canActivate: [AuthGuard]},
//    {path: 'aktual-gonitwy/:id', component: AktualGonitwyComponent, canActivate: [AuthGuard]},
//   {path: 'moje-zaklady', component: MojeZakladyComponent, canActivate: [AuthGuard]},
//   {path: 'obstaw/:id', component: ObstawComponent, canActivate: [AuthGuard]},
//   {path: 'zmiana-hasla', component: ZmianaHaslaComponent, canActivate: [AuthGuard]},
//   {path: 'aktualizacja', component: AktualizacjaComponent, canActivate: [AuthGuard]},
//   {path: 'szczegoly-wyscigu/:id', component: SzczegolyWysciguComponent},
//   {path: 'zarzadzaj-gonitwa', component: ZarzadzajGonitwamiComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]},
//   {path: 'historia', component: HistoriaComponent},
//   {path: 'jak-grac', component: JakGracComponent},
//   {path: 'moje-konto', component: MojeKontoComponent, canActivate: [AuthGuard]},
//    {path: 'gonitwy', component: GonitwyComponent, canActivate: [AuthGuard]},
//   {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], canLoad: [ AuthGuard]},
//    {path: 'home', component: HomeComponent},
//   {path: 'register', component: RegisterComponent},
//   {path: 'wierzchowiec', component: WierzchowiecComponent},
//   {path: 'login', component: LoginComponent},
//   {path: '', component: HomeComponent, canActivate: [AuthGuard]},
//   {path: '', redirectTo: 'home', pathMatch: 'full'},
//   {path: '**', redirectTo: ''}
// ];
const routes: Routes = [
  {path: 'doladuj', component: DoladujKontoComponent},
  {path: 'zarzadzaj-gonitwami', component: ZarzadzajGonitwamiComponent},
  {path: 'wynik/:id', component: WynikComponent},
   {path: 'aktual-gonitwy/:id', component: AktualGonitwyComponent},
  {path: 'moje-zaklady', component: MojeZakladyComponent},
  {path: 'obstaw/:id', component: ObstawComponent},
  {path: 'zmiana-hasla', component: ZmianaHaslaComponent},
  {path: 'aktualizacja', component: AktualizacjaComponent},
  {path: 'szczegoly-wyscigu/:id', component: SzczegolyWysciguComponent},
  {path: 'zarzadzaj-gonitwa', component: ZarzadzajGonitwamiComponent},
  {path: 'historia', component: HistoriaComponent},
  {path: 'jak-grac', component: JakGracComponent},
  {path: 'moje-konto', component: MojeKontoComponent},
   {path: 'gonitwy', component: GonitwyComponent},
  {path: 'admin', component: AdminComponent},
   {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'wierzchowiec', component: WierzchowiecComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
