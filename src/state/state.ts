// simple state handler
import { IndexedDB } from "./indexeddb";

export class State {
  static dbName: string = "stateDB";
  static dbVersion: number = 1;
  static storeName: string = "state";
  static DB: any = null;
  static target: EventTarget = new EventTarget();

  updateCallback: any;
  observed: any;

  // object constructor
  constructor(observed: any, updateCallback: any) {
    // state change callback
    this.updateCallback = updateCallback;

    // observed properties
    this.observed = new Set(observed);

    // subscribe to set events
    State.target.addEventListener("set", (e: any) => {
      if (this.updateCallback && this.observed.has(e.detail.name)) {
        this.updateCallback(e.detail.name, e.detail.value);
      }
    });
  }

  // connect to IndexedDB database
  async dbConnect() {
    State.DB = State.DB ||
      (new IndexedDB(
        State.dbName,
        State.dbVersion,
        (db: any, oldVersion: number, newVersion: number) => {
          // upgrade database
          switch (oldVersion) {
            case 0: {
              db.createObjectStore(State.storeName);
            }
          }
        },
      ));

    return State.DB;
  }

  // set value in DB
  async set(name: string, value: any) {
    // add observed property
    this.observed.add(name);

    // database update
    const db = await this.dbConnect();
    await db.set(State.storeName, name, value);

    // raise event
    const event = new CustomEvent("set", { detail: { name, value } });
    State.target.dispatchEvent(event);
  }

  // get value from DB
  async get(name: string) {
    // add observed property
    this.observed.add(name);

    // database fetch
    const db = await this.dbConnect();
    return await db.get(State.storeName, name);
  }

  async clear() {
    const db = await this.dbConnect();

    return await db.clear(State.storeName);
  }
}
