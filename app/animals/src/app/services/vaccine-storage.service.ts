import { LocalStorageService } from ".";
import { IVaccine } from "../interfaces";
import { UUID } from "../types";

export class VaccineStorageService {
    private LOCAL_STORAGE_KEY: string = "VACCINE_LOCAL_STORAGE";
    private localStorage: LocalStorageService;

    constructor(localStorageValues: string = "[]") {
        this.localStorage = new LocalStorageService(
            this.LOCAL_STORAGE_KEY,
            localStorageValues
        );
    }

    getItems(): IVaccine[] {
        return Array.from(
            JSON.parse(this.localStorage.getItems())
        ) as IVaccine[];
    }

    getItem(id: UUID): IVaccine {
        const vaccines = this.getItems();
        const filteredAnimal = vaccines.find((vaccine) => vaccine.id === id);

        if (filteredAnimal) {
            return filteredAnimal;
        }
        throw new Error("LocalStorage: Animal not found");
    }

    setItems(vaccines: IVaccine[]): void {
        this.localStorage.setItems(JSON.stringify(vaccines));
    }

    setItem(vaccine: IVaccine): void {
        try {
            this.getItem(vaccine.id);
        } catch (error) {
            const vaccines = { ...this.getItems(), vaccine };
            this.localStorage.setItems(JSON.stringify(vaccines));
            return;
        }
        throw new Error("LocalStorage: Animal ID exists");
    }
    
    clear(): void {
        this.localStorage.clear();
    }
}
