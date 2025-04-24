import fs from 'node:fs/promises';

const dbPath = new URL('../db.json', import.meta.url);

export class Database {
  #db = {};

  constructor() {
    fs.readFile(dbPath, 'utf-8')
      .then(data => {
        this.#db = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(dbPath, JSON.stringify(this.#db));
  }

  select(table, search) {
    let data = this.#db[table] ?? [];

    if (search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase());
        });
      });
    }
    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#db[table])) {
      this.#db[table].push(data);
    } else {
      this.#db[table] = [data];
    }

    this.#persist();
    return data;
  }

  update(table, id, data) {
    const rowIndex = this.#db[table].findIndex(item => item.id === id);

    if (rowIndex === -1) {
      return 0;
    }

    if (rowIndex > -1 && data === undefined) {
      if (this.#db[table][rowIndex].completed_at === null) {
        this.#db[table][rowIndex].completed_at = Date.now();
        this.#db[table][rowIndex].update_at = Date.now();
        this.#persist();
      }
    } else if (rowIndex > -1 && data !== undefined) {
      this.#db[table][rowIndex] = {
        ...(this.#db[table][rowIndex].update_at = Date.now()),
        ...this.#db[table][rowIndex],
        ...data,
      };
      this.#persist();
    }
  }

  delete(table, id) {
    const rowIndex = this.#db[table].findIndex(row => row.id === id);

    if (rowIndex === -1) {
      return 0;
    }

    if (rowIndex > -1) {
      this.#db[table].splice(rowIndex, 1);
      this.#persist();
    }
  }
}
