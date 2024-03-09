import { StoreService } from ".";
import { IVaccine } from "../interfaces";
import { Vaccine } from "../models";
import { UUID } from "../types";

export class VaccineStoreService {
    private storeService: StoreService = new StoreService();

    getItems(): Vaccine[] {
        return this.storeService.getItems() as Vaccine[];
    }

    getItem(id: UUID): Vaccine {
        return this.storeService.getItem(id) as Vaccine;
    }

    setItems(vaccines: IVaccine[]): void {
        const vaccineMap = new Map(
            vaccines.map((vaccine: IVaccine) => [
                vaccine.id,
                new Vaccine(vaccine),
            ])
        );
        this.storeService.setItems(vaccineMap);
    }

    setItem(vaccine: Vaccine): void {
        this.storeService.setItem(vaccine.id, vaccine);
    }

    deleteItem(id: UUID): void {
        this.storeService.deleteItem(id);
    }

    updateItem(oldId: UUID, newVaccine: Vaccine) {
        const exists = this.storeService.deleteItem(oldId);
        if (exists) {
            this.storeService.setItem(newVaccine.id, newVaccine);
        }
        throw new Error("Store: Item does not exists");
    }

    clear(): void {
        this.storeService.clear();
    }
}
