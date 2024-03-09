import { UUID } from "../types";

export abstract class Store<T> {
    abstract getItems(): T[];
    abstract setItems(values: Map<UUID, T>): void;
    abstract getItem(id: UUID): Object;
    abstract setItem(id: UUID, value: T): void;
    abstract deleteItem(id: UUID): boolean;
    abstract clear(): void;
}
