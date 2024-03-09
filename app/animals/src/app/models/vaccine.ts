import { VaccineDTO } from "../interfaces";
import { UUID } from "../types";

export class Vaccine {
    readonly #id: UUID;
    readonly #name: string;

    constructor(vaccine: VaccineDTO) {
        this.#id = vaccine.id;
        this.#name = vaccine.name;
    }
    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    public toJSON(): Vaccine {
        return new Vaccine({ id: this.id, name: this.name });
    }
}
