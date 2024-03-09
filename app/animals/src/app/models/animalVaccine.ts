import { AnimalVaccineDTO } from "../interfaces/";
import { UUID } from "../types";

export class AnimalVaccine {
    #date: string;
    #vaccine: UUID;

    constructor(animalVaccine: AnimalVaccineDTO) {
        this.#date = animalVaccine.date;
        this.#vaccine = animalVaccine.vaccine;
    }

    get date() {
        return this.#date;
    }

    get vaccine() {
        return this.#vaccine;
    }

    public toJSON(): AnimalVaccineDTO {
        return {
            date: this.date,
            vaccine: this.vaccine,
        };
    }
}
