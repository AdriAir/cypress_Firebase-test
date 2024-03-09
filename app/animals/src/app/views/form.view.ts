import {
    AnimalVaccineDTO,
    CreatingAnimalDTO,
    FinalAnimalDTO,
    VaccineDTO,
} from "../interfaces";
import { AnimalVaccine } from "../models";
import { Gender, Method, Size, UUID } from "../types";

export class FormView {
    public form: HTMLFormElement = document.getElementById(
        "form"
    )! as HTMLFormElement;

    public nameInput: HTMLInputElement = document.getElementById(
        "nameInput"
    )! as HTMLInputElement;
    public breedInput: HTMLInputElement = document.getElementById(
        "breedInput"
    )! as HTMLInputElement;
    public birthDateInput: HTMLInputElement = document.getElementById(
        "birthDateInput"
    )! as HTMLInputElement;
    public genderSelector: HTMLSelectElement = document.getElementById(
        "genderSelector"
    )! as HTMLSelectElement;
    public sizeSelector: HTMLSelectElement = document.getElementById(
        "sizeSelector"
    )! as HTMLSelectElement;

    public addVaccineButton: HTMLElement =
        document.getElementById("addVaccine")!;

    public insertButton: HTMLElement = document.getElementById("insertButton")!;

    public returnToInsertButton: HTMLElement = document.getElementById(
        "returnToInsertButton"
    )!;

    public updateButton: HTMLElement = document.getElementById("updateButton")!;

    public vaccineContainer: HTMLElement =
        document.getElementById("vaccineList")!;

    public method: Method;

    public bindAddVaccineButton = (handlerAddVaccineButton: Function) => {
        this.addVaccineButton.addEventListener("click", (_) => {
            handlerAddVaccineButton();
        });
    };

    public bindReturnToInsertButton(handlerReturnToInsertButton: Function) {
        this.returnToInsertButton.addEventListener("click", (_) => {
            handlerReturnToInsertButton();
        });
    }

    public bindFormSubmitButtons = (
        handlerInsertButton: Function,
        handlerUpdateButton: Function
    ) => {
        this.insertButton.addEventListener("click", (_) => {
            handlerInsertButton();
        });
        this.updateButton.addEventListener("click", (_) => {
            handlerUpdateButton();
        });
    };

    public changeMethod = (
        method: Method,
        data?: { id: UUID; createdAt: string }
    ) => {
        if (method === Method.POST) {
            if (!this.updateButton.classList.contains("hidden")) {
                this.updateButton.classList.add("hidden");
                this.returnToInsertButton.parentElement?.classList.add(
                    "hidden"
                );
            }
            this.insertButton.classList.remove("hidden");
        }
        if (method === Method.PUT) {
            if (!this.insertButton.classList.contains("hidden")) {
                this.insertButton.classList.add("hidden");
                this.returnToInsertButton.parentElement?.classList.remove(
                    "hidden"
                );
            }
            this.updateButton.dataset.id = data?.id;
            this.updateButton.dataset.createdAt = data?.createdAt;
            this.updateButton.classList.remove("hidden");
        }
    };

    public createdAnimalFromForm(): CreatingAnimalDTO {
        const animal: CreatingAnimalDTO = {
            name: this.nameInput.value,
            breed: this.breedInput.value,
            birthDate: new Date(this.birthDateInput.value).toDateString(),
            gender: Gender[this.genderSelector.value as keyof typeof Gender],
            size: Size[this.sizeSelector.value as keyof typeof Size],
            vaccine: this.readFormVaccines(),
            createdAt: new Date().toDateString(),
        };
        return animal;
    }

    public updatedAnimalFromForm(): FinalAnimalDTO {
        const animal: FinalAnimalDTO = {
            id: this.updateButton.dataset.id!,
            createdAt: new Date(
                this.updateButton.dataset.createdAt!
            ).toDateString(),
            name: this.nameInput.value,
            breed: this.breedInput.value,
            birthDate: new Date(this.birthDateInput.value).toDateString(),
            gender: Gender[this.genderSelector.value as keyof typeof Gender],
            size: Size[this.sizeSelector.value as keyof typeof Size],
            vaccine: this.readFormVaccines(),
            updatedAt: new Date().toDateString(),
        };
        return animal;
    }

    public fillValues = (
        availableVaccines: VaccineDTO[],
        animal: FinalAnimalDTO
    ): void => {
        this.form.querySelector(
            "h2"
        )!.textContent = `Actualizar ${animal.name}`;
        this.nameInput.value = animal.name;
        this.breedInput.value = animal.breed;
        this.birthDateInput.value = animal.birthDate.toString();
        this.genderSelector.value = animal.gender.toString();
        this.sizeSelector.value = animal.size.toString();

        for (const vaccine of animal.vaccine) {
            this.createNewVaccine(availableVaccines, vaccine);
        }
    };

    public clear(): void {
        this.form.querySelector("h2")!.textContent = "Nuevo Animal";
        this.nameInput.value = "";
        this.breedInput.value = "";
        this.birthDateInput.value = "";
        this.genderSelector.selectedIndex = 0;
        this.sizeSelector.selectedIndex = 0;
        this.vaccineContainer.innerHTML = "";
    }

    //Por ahora dejo el modelo pero me gustaría usar una interfaz
    private readFormVaccines(): AnimalVaccine[] {
        const vaccineElements: HTMLElement[] = Array.from(
            this.vaccineContainer.querySelectorAll("article")
        );

        return vaccineElements.reduce(
            (
                animalVaccines: AnimalVaccineDTO[],
                vaccineElement: HTMLElement
            ) => {
                const dateElement: HTMLInputElement =
                    vaccineElement.querySelector("input")!;
                return [
                    ...animalVaccines,
                    {
                        date: new Date(dateElement.value).toDateString(),
                        vaccine: vaccineElement.querySelector("select")!.value,
                    },
                ];
            },
            []
        ) as AnimalVaccine[];
    }

    public createNewVaccine = (
        availableVaccines: VaccineDTO[],
        importedVaccine?: AnimalVaccineDTO
    ) => {
        const vaccine = document.createElement("article");
        vaccine.classList.add("vaccines-form");

        if (importedVaccine) {
            vaccine.append(
                this.generateVaccineSelector(
                    availableVaccines,
                    importedVaccine.vaccine
                )
            );
            vaccine.append(this.generateVaccineDate(importedVaccine.date));
        } else {
            vaccine.append(this.generateVaccineSelector(availableVaccines));
            vaccine.append(this.generateVaccineDate());
        }
        vaccine.append(this.generateDeleteVaccine());
        this.vaccineContainer.append(vaccine);
    };

    private generateVaccineSelector(
        availableVaccines: VaccineDTO[],
        checkedVaccine?: UUID
    ): HTMLSelectElement {
        const selectElement = document.createElement("select");

        for (const vaccine of availableVaccines.values()) {
            selectElement.innerHTML += `
                <option value="${vaccine.id}" ${
                checkedVaccine && vaccine.id === checkedVaccine
                    ? "selected"
                    : ""
            }>${vaccine.name}</option>
            `;
        }

        return selectElement;
    }

    private generateVaccineDate(vaccineDate?: string): HTMLInputElement {
        const dateElement: HTMLInputElement = document.createElement("input");
        dateElement.type = "date";
        if (vaccineDate) {
            dateElement.value = vaccineDate.toString();
        }
        return dateElement;
    }

    private generateDeleteVaccine(): HTMLElement {
        const deleteButton: HTMLElement = document.createElement("i");
        deleteButton.innerHTML = "❌";
        deleteButton.classList.add("remove-button");
        deleteButton.addEventListener("click", (_) => {
            deleteButton.parentElement!.remove();
        });
        return deleteButton;
    }
}
