import { Storage } from "../../interfaces";

export class SessionStorageService implements Storage {
    private keySessionStorage: string = "";

    constructor(keySessionStorage: string, value: string = "[]") {
        this.keySessionStorage = keySessionStorage;
        sessionStorage.setItem(keySessionStorage, value);
    }

    getItems(): string {
        const items = sessionStorage.getItem(this.keySessionStorage);
        return typeof items === "string" ? items : "[]";
    }

    setItems(value: string): void {
        sessionStorage.setItem(this.keySessionStorage, value);
    }
    clear(): void {
        sessionStorage.setItem(this.keySessionStorage, "[]");
    }
}
