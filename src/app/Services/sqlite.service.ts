import { Injectable } from '@angular/core';
var Sqlite = require('nativescript-sqlite');

@Injectable()
export class DatabaseService {

public getdbConnection() {
return new Sqlite('my.db');
}

public closedbConnection() {
new Sqlite('my.db')
.then((db) => {
db.close();
});
}

}
