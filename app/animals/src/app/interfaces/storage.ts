export abstract class Storage {
    abstract getItems(): string;
    abstract setItems(value: string): void;
    abstract clear(): void;
}
