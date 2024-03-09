import { DexieService } from ".";
import { IAnimal } from "../interfaces";
import { Animal } from "../models";
import { UUID } from "../types";

export class AnimalDexieService {
    private dexieService: DexieService<IAnimal>;
    private DATABASE_NAME: string = "veterinarianDB";
    private storeName = "animals";
    private TABLES: { name: string; indexes: string }[] = [
        { name: this.storeName, indexes: "id, vaccine, name" },
    ];

    constructor() {
        this.dexieService = new DexieService(
            this.DATABASE_NAME,
            ...this.TABLES
        );
    }

    public async getItems(): Promise<Animal[]> {
        const animals = (await this.dexieService.getAll(
            this.storeName
        )) as IAnimal[];
        return animals.map((animal) => new Animal(animal, animal.id));
    }

    public async setItems(animals: IAnimal[]): Promise<void> {
        this.dexieService.setAll(animals, this.storeName);
    }

    public async getItem(uuid: UUID): Promise<Animal> {
        const animal = await this.dexieService.getOne(uuid, this.storeName);
        return new Animal(animal, animal.id);
    }

    public async setItem(animal: IAnimal): Promise<void> {
        return await this.dexieService.setOne(animal, this.storeName);
    }

    public async deleteItem(uuid: UUID): Promise<void> {
        return await this.dexieService.remove(uuid, this.storeName);
    }
    public async updateItem(uuid: UUID, animal: IAnimal): Promise<void> {
        return await this.dexieService.update(uuid, animal, this.storeName);
    }
}
