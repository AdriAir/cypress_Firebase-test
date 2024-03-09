import { CreatingAnimalDTO, FinalAnimalDTO, IAnimal } from "../interfaces";
import { URL, UUID } from "../types";
import { Animal } from "../models";
import {
    AnimalDexieService,
    AnimalStorageService,
    AnimalStoreService,
    HttpService,
} from "./";

export class AnimalService {
    private endpoint: URL = "http://localhost:3000/animals";

    constructor(
        private readonly httpService: HttpService<Animal>,
        private readonly animalStorageService: AnimalStorageService,
        private readonly animalStoreService: AnimalStoreService
    ) {}

    public async load(): Promise<Animal[]> {
        const localAnimals = this.animalStorageService.getItems();

        this.animalStoreService.setItems(localAnimals);

        try {
            const animals = await this.httpService.get(this.endpoint);
            this.animalStorageService.setItems(animals);
            this.animalStoreService.setItems(animals);
        } catch (error) {
            console.log("Not connected");
        }

        return this.animalStoreService.getItems();
    }

    public async findOne(id: UUID): Promise<Animal> {
        try {
            const animals = await this.httpService.get(this.endpoint); //Sobra
            return animals.find((animal: IAnimal) => animal.id === id)!;
        } catch (error) {
            console.log("From memory");
            return this.animalStoreService.getItem(id);
        }
    }

    public create(animal: CreatingAnimalDTO): Promise<Response> {
        const finalAnimal = new Animal(animal);

        this.animalStoreService.setItem(finalAnimal);
        this.animalStorageService.setItem(finalAnimal);

        return this.httpService.post(this.endpoint, finalAnimal).catch((_) => {
            this.animalStoreService.deleteItem(finalAnimal.id);
            this.animalStorageService.deleteItem(finalAnimal.id);
            return Promise.reject();
        });
    }

    public async update(animal: FinalAnimalDTO): Promise<Response> {
        const updatedAnimal = new Animal(animal, animal.id);

        const oldAnimal = new Animal(
            this.animalStorageService.getItem(animal.id),
            animal.id
        );

        // //BUSCAMOS EN HTTP
        // try {
        //     const animals = await this.httpService.get(this.endpoint);
        //     const oldAnimal = animals.find(
        //         (filteredAnimal: IAnimal) => filteredAnimal.id === animal.id
        //     )!;
        // } catch (error) {}

        this.animalStoreService.updateItem(oldAnimal.id, updatedAnimal);
        this.animalStorageService.updateItem(oldAnimal.id, updatedAnimal);

        return this.httpService
            .put(`${this.endpoint}/${oldAnimal.id}`, updatedAnimal)
            .catch((_) => {
                this.animalStoreService.updateItem(updatedAnimal.id, oldAnimal);
                this.animalStorageService.updateItem(
                    updatedAnimal.id,
                    oldAnimal
                );
                return Promise.reject();
            });
    }

    public delete(id: UUID): Promise<Response> {
        const animalToDelete = this.animalStoreService.getItem(id);

        this.animalStoreService.deleteItem(id);
        this.animalStorageService.deleteItem(id);

        return this.httpService.delete(`${this.endpoint}/${id}`).catch((_) => {
            this.animalStoreService.setItem(animalToDelete);
            return Promise.reject();
        });
    }
}
