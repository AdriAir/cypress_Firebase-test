import Dexie from "dexie";
import { UUID } from "../../types";

export class DexieService<T> {
    private dexie: Dexie;

    constructor(
        databaseName: string,
        ...table: { name: string; indexes: string }[]
    ) {
        this.dexie = new Dexie(databaseName);

        const stores = table.reduce((previousStore, actualStore) => {
            return {
                ...previousStore,
                [actualStore.name]: actualStore.indexes,
            };
        }, {});

        this.dexie.version(1).stores(stores);
    }

    public getAll(storeName: string): Promise<T[]> {
        return this.dexie.table(storeName).toArray();
    }
    public getOne(id: UUID, storeName: string): Promise<T> {
        return this.dexie.table(storeName).get(id);
    }

    public setOne(item: T, storeName: string) {
        this.dexie.table(storeName).add(item);
    }
    public setAll(items: T[], storeName: string) {
        this.dexie
            .transaction("rw", this.dexie.table(storeName), async () => {
                await this.dexie.table(storeName).bulkPut(items);
            })
            .then(() => {
                console.log("Transaction OK!");
            });
    }
    public remove(id: UUID, storeName: string) {
        this.dexie.table(storeName).delete(id);
    }
    public update(id: UUID, changes: {}, storeName: string) {
        this.dexie.table(storeName).update(id, changes);
    }
}
