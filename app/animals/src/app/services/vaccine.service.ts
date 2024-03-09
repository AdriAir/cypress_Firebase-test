import { HttpService, VaccineStorageService, VaccineStoreService } from ".";
import { URL, UUID } from "../types";
import { IVaccine, VaccineDTO } from "../interfaces";
import { Vaccine } from "../models";

export class VaccineService {
    private endpoint: URL = "http://localhost:3000/vaccines";

    constructor(
        private readonly httpService: HttpService<Vaccine>,
        private readonly vaccineStorageService: VaccineStorageService,
        private readonly vaccineStoreService: VaccineStoreService
    ) {}

    public async load(): Promise<Vaccine[]> {
        const localVaccines = this.vaccineStorageService.getItems();

        this.vaccineStoreService.setItems(localVaccines);

        try {
            const vaccines = await this.httpService.get(this.endpoint);
            this.vaccineStorageService.setItems(vaccines);
            this.vaccineStoreService.setItems(vaccines);
        } catch (error) {
            console.log("Not connected");
        }

        return this.vaccineStoreService.getItems();
    }

    public async findOne(id: UUID): Promise<Vaccine> {
        try {
            const vaccines = await this.httpService.get(this.endpoint); //Sobra
            return vaccines.find((vaccine: IVaccine) => vaccine.id === id)!;
        } catch (error) {
            console.log("From memory");
            return this.vaccineStoreService.getItem(id);
        }
    }
}
