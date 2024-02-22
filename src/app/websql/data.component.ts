import { Component } from '@angular/core';

@Component({
  templateUrl: './data.component.html',
})
export class DataComponent {
  dbName = 'data';
  db: Database;
  constructor() {
    this.db = this.openConnection();
  }

  openConnection() {
    return window.openDatabase(
      this.dbName,
      '1.0',
      `${this.dbName} Database`,
      10000000
    );
  }

  createTable(table: string) {
    return `CREATE TABLE IF NOT EXISTS ${table};`;
  }
}
