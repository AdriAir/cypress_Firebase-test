import { StoreService } from ".";
import { IAnimal } from "../interfaces";
import { Animal } from "../models";
import { UUID } from "../types";

export class AnimalStoreService {
    private storeService: StoreService = new StoreService();

    getItems(): Animal[] {
        return this.storeService.getItems() as Animal[];
    }

    getItem(id: UUID): Animal {
        return this.storeService.getItem(id) as Animal;
    }

    setItems(animals: IAnimal[]): void {
        const animalMap = new Map(
            animals.map((animal: IAnimal) => [
                animal.id,
                new Animal(animal, animal.id),
            ])
        );
        this.storeService.setItems(animalMap);
    }

    setItem(animal: Animal): void {
        this.storeService.setItem(animal.id, animal);
    }

    deleteItem(id: UUID): void {
        this.storeService.deleteItem(id);
    }

    updateItem(oldId: UUID, newAnimal: Animal) {
        const exists = this.storeService.deleteItem(oldId);
        if (exists) {
            this.storeService.setItem(newAnimal.id, newAnimal);
        }
        throw new Error("Store: Item does not exists");
    }

    clear(): void {
        this.storeService.clear();
    }
}
