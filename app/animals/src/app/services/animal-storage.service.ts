import { LocalStorageService } from ".";
import { IAnimal } from "../interfaces";
import { UUID } from "../types";

export class AnimalStorageService {
    private LOCAL_STORAGE_KEY: string = "ANIMAL_LOCAL_STORAGE";
    private localStorage: LocalStorageService;

    constructor(localStorageValues: string = "[]") {
        this.localStorage = new LocalStorageService(
            this.LOCAL_STORAGE_KEY,
            localStorageValues
        );
    }

    getItems(): IAnimal[] {
        return Array.from(
            JSON.parse(this.localStorage.getItems())
        ) as IAnimal[];
    }

    getItem(id: UUID): IAnimal {
        const animals = this.getItems();
        const filteredAnimal = animals.find((animal) => animal.id === id);

        if (filteredAnimal) {
            return filteredAnimal;
        }
        throw new Error("LocalStorage: Animal not found");
    }

    setItems(animals: IAnimal[]): void {
        this.localStorage.setItems(JSON.stringify(animals));
    }

    setItem(animal: IAnimal): void {
        try {
            this.getItem(animal.id);
        } catch (error) {
            const animals = { ...this.getItems(), animal };
            this.localStorage.setItems(JSON.stringify(animals));
            return;
        }
        throw new Error("LocalStorage: Animal ID exists");
    }

    deleteItem(id: UUID) {
        const animals = this.getItems();
        this.setItems(animals.filter((animal) => animal.id != id));
    }

    updateItem(oldId: UUID, newAnimal: IAnimal) {
        this.deleteItem(oldId);
        this.setItem(newAnimal);
    }

    clear(): void {
        this.localStorage.clear();
    }
}
