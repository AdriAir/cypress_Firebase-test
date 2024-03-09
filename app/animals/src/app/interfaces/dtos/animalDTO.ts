import { AnimalVaccine } from "../../models/animalVaccine";
import { UUID, Gender, Size, Breed } from "../../types/";

export interface CreatingAnimalDTO {
    name: string;
    birthDate: string;
    gender: Gender;
    size: Size;
    breed: Breed;
    vaccine: AnimalVaccine[];
    readonly createdAt: string;
}

export interface FinalAnimalDTO extends CreatingAnimalDTO {
    readonly id: UUID;
    updatedAt: string;
}
