import { Storage } from "../../interfaces";

export class LocalStorageService implements Storage {
    private keyLocalStorage: string = "";

    constructor(keyLocalStorage: string, value: string = "[]") {
        this.keyLocalStorage = keyLocalStorage;
        
        if (typeof localStorage.getItem(keyLocalStorage) == null) {
            localStorage.setItem(keyLocalStorage, value);
        }
    }

    getItems(): string {
        const items = localStorage.getItem(this.keyLocalStorage);
        return typeof items === "string" ? items : "[]";
    }

    setItems(value: string): void {
        localStorage.setItem(this.keyLocalStorage, value);
    }
    clear(): void {
        localStorage.setItem(this.keyLocalStorage, "[]");
    }
}
