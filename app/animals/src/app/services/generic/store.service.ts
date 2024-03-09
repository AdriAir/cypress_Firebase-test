import { Store } from "../../interfaces";
import { UUID } from "../../types";

export class StoreService implements Store<Object> {
    private items: Map<UUID, Object>;

    getItems(): Object[] {
        return Array.from(this.items.values());
    }
    setItems(values: Map<string, Object>): void {
        this.items = values;
    }
    getItem(id: UUID): Object {
        const item = this.items.get(id);

        if (item) {
            return item;
        }
        throw new Error("Store: ID not found");
    }
    setItem(id: UUID, value: Object): void {
        try {
            this.getItem(id);
        } catch (error) {
            this.items.set(id, value);
            return;
        }
        throw new Error("Store: ID already exists");
    }

    deleteItem(id: UUID): boolean {
        return this.items.delete(id);
    }

    clear(): void {
        this.items.clear();
    }
}
