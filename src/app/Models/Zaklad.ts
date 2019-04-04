export class WidokZaklad{
idZakladu:number;    
nazwaZakladu:string;
idGonitwy:number;
idGracza:number;
stawka:number;
typowanie1:string;
typowanie2:string;
typowanie3:string;
typowanie4:string;

}
export class WidokZakladWynik{
    idZakladu:number;    
    nazwaZakladu:string;
    idGonitwy:number;
    idGracza:number;
    stawka:number;
    typowanie1:string;
    typowanie2:string;
    typowanie3:string;
    typowanie4:string;
    status:string;
    wygrana:number;
    }
export class WidokRodzajZaklad{
    id:number;
    nazwaZakladu:string;
    ileTypow:number;
    
}
export class InsertZaklad{
    RodzajZakladu:number;
    IdGonitwy:number;
    IdGracza:number;
    Stawka:number;
    Typowanie1:string;
    Typowanie2:string;
    Typowanie3:string;
    Typowanie4:string;
}

export class Wygrana{
    "kwota":number;
    "czyWygrana":boolean;
}