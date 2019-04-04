import { Time, DatePipe } from '@angular/common';


export class GonitwaLista {
    idListy: number;
    nrWierzchowca: number;
    nazwaWierzchowca: string;
    imie: string;
    nazwisko: string;
    kurs: number;
}

export class GonitwaAll {
    nrGonitwyWSezonie: number;
    nrGonitwyWDniu: number;
    nazwaNagrody: string;
    warunkiGonitwy: string;
    godzinaRozpoczecia: Date;
    data: Date;
    dlugosc: number;
}

export class GonitwaInsert {
    NazwaNagrody: string;
    WarunkiGonitwy: string;
    GodzinaRozpoczecia: Date;
    Data: Date;
    Dlugosc: number;
}

export class GonitwaListaInsert {
     NrGonitwyWSezonie: number;
     NrWierzchowca: number;
     Kurs: number;
}
