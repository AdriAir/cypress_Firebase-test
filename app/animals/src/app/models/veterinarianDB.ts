import Dexie from "dexie";
import { FinalAnimalDTO, VaccineDTO } from "../interfaces";
import { UUID } from "../types";

export class VeterinarianDB extends Dexie {
    public vaccines: Dexie.Table<VaccineDTO, UUID>;
    public animals: Dexie.Table<FinalAnimalDTO, UUID>;

    constructor() {
        super("VeterinarianDB");

        this.version(2).stores({
            animals:
                "&id, name, birthDate, gender, size, breed, updatedAt, createdAt",
            vaccines: "&id, name",
        });
        this.animals = this.table("animals");
        this.vaccines = this.table("vaccines");
    }
}
