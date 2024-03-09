import { v4 as uuidv4 } from "uuid";
import {
    CreatingAnimalDTO,
    FinalAnimalDTO,
} from "../interfaces/dtos/animalDTO";
import { Breed, Gender, Size, UUID } from "../types";
import { AnimalVaccine } from "./animalVaccine";
import {
    InvalidBreedException,
    InvalidGenderException,
    InvalidNameException,
} from "../exceptions/animal";

export class Animal {
    readonly #id: UUID;
    #name: string;
    #birthDate: string; //Sacar fuera como clase BirthDate
    #gender: Gender;
    #size: Size;
    #breed: Breed;
    #vaccine: AnimalVaccine[];
    #updatedAt: string;
    readonly #createdAt: string;

    constructor(animal: CreatingAnimalDTO, id?: UUID) {
        this.#id = id ?? uuidv4();
        this.name = animal.name;
        this.birthDate = animal.birthDate;
        this.gender = animal.gender;
        this.size = animal.size;
        this.breed = animal.breed;
        this.vaccine = animal.vaccine;
        this.#updatedAt = new Date().toDateString();
        this.#createdAt = animal.createdAt ?? new Date().toDateString();
    }

    set name(name) {
        if (name.length <= 0) {
            throw new InvalidNameException("Name length can't be negative");
        }
        this.#name = name;
    }
    set birthDate(birthDate) {
        //DateFNS
        this.#birthDate = birthDate;
    }
    set gender(gender) {
        if (!Object.values(Gender).includes(gender)) {
            throw new InvalidGenderException(
                `Gender ${gender} is not included in Gender Enum types`
            );
        }
        this.#gender = gender;
    }
    set size(size) {
        this.#size = size;
    }
    set breed(breed) {
        if (breed.length <= 0) {
            throw new InvalidBreedException("Breed length can't be negative");
        }
        this.#breed = breed;
    }
    set vaccine(vaccine) {
        this.#vaccine = vaccine;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }
    get birthDate() {
        return this.#birthDate;
    }
    get gender() {
        return this.#gender;
    }
    get size() {
        return this.#size;
    }
    get breed() {
        return this.#breed;
    }
    get vaccine() {
        return this.#vaccine;
    }
    get updatedAt() {
        return this.#updatedAt;
    }
    get createdAt() {
        return this.#createdAt;
    }

    public toJSON(): FinalAnimalDTO {
        return this.vaccine.reduce(
            (finalAnimal: CreatingAnimalDTO, animalVaccine: AnimalVaccine) => {
                return {
                    ...finalAnimal,
                    vaccine: [...finalAnimal.vaccine, animalVaccine],
                } as FinalAnimalDTO;
            },
            {
                id: this.id,
                name: this.name,
                breed: this.breed,
                birthDate: this.#birthDate,
                gender: this.gender,
                size: this.size,
                vaccine: [],
                updatedAt: this.updatedAt,
                createdAt: this.createdAt,
            }
        );
    }
}
