export class Gracz{
    id: number;
    imie : string;
    nazwisko: string;
    login: string;
    haslo: string;
    rola: string;
    token? : string;
    email:string;
    wiek: number;
    wyksztalcenie:string;
}
export class GraczHaslo{
    haslo:string;
}
export class GraczView{
    id: number;
    imie : string;
    nazwisko: string;
    login: string;
    haslo: string;
    rola: string;
    token? : string;
    email:string;
    wiek: number;
    wyksztalcenie:string;
    konto:number;
}
export class KwotaWidok{
    kwota:number;
}
