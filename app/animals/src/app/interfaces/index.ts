import { FinalAnimalDTO, CreatingAnimalDTO } from "./dtos/animalDTO";
import { VaccineDTO } from "./dtos/vaccineDTO";
import { AnimalVaccineDTO } from "./dtos/animalVaccineDTO";
import { Storage } from "./storage";
import { Store } from "./store";
import { IAnimal } from "./animal.interface";
import { IVaccine } from "./vaccine.interface";
import { IAnimalVaccine } from "./animal-vaccine.interface";

export type {
    FinalAnimalDTO,
    CreatingAnimalDTO,
    AnimalVaccineDTO,
    VaccineDTO,
    IAnimal,
    IAnimalVaccine,
    IVaccine,
};
// Pongo "type" porque se está re-exportando.
// Realmente tiene sentido pues no estamos exportando valores.
// Lo que no sé es donde se re-exporta, quizá en la herencia

export { Storage, Store };
