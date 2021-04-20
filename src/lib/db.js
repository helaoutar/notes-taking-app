import { openDB } from "idb";

const STORE_NAME = "notes";
const DB_NAME = "Notes";

class DB {
  openDB() {
    this.db = openDB(DB_NAME, 1, {
      upgrade(db) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      },
    });
  }

  async getNotes() {
    return (await this.db).getAll(STORE_NAME);
  }

  async addNote(note) {
    return (await this.db).add(STORE_NAME, note);
  }

  async deleteNote(key) {
    return (await this.db).delete(STORE_NAME, key);
  }

  async updateNote(note) {
    console.log(note);
    return (await this.db).put(STORE_NAME, note);
  }
}

export default new DB();
