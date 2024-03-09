import { AnimalVaccine } from "../models";
import { Breed, Gender, Size, UUID } from "../types";

export interface IAnimal {
    readonly id: UUID;
    name: string;
    birthDate: string;
    gender: Gender;
    size: Size;
    breed: Breed;
    vaccine: AnimalVaccine[];
    readonly createdAt: string;
    updatedAt: string;
}
