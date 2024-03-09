import { FinalAnimalDTO } from "../interfaces";

export class AnimalTableView {
    public table: HTMLTableElement = document.getElementById(
        "animalTable"
    )! as HTMLTableElement;
    public tableContainer: HTMLElement = document.getElementById(
        "animablTableWrapper"
    )!;

    public render = (animals: FinalAnimalDTO[]): void => {
        this.table.innerHTML = "";
        this.createHeaders();
        this.createBody(animals);
    };

    public display(display: boolean) {
        display
            ? this.tableContainer.classList.remove("hidden")
            : this.tableContainer.classList.add("hidden");
    }

    public bindActionButtons(
        hanlderDeleteButtons: Function,
        hanlderUpdateButtons: Function
    ): void {
        for (const row of Array.from(
            document.getElementById("tableBody")!.childNodes
        ) as HTMLTableRowElement[]) {
            if (row.nodeType === 1 && row.dataset.id) {
                const deleteButton = document.querySelector(
                    `tr[data-id="${row.dataset.id}"] td i#DeleteRow${row.dataset.id}`
                )!;
                const updateButton = document.querySelector(
                    `tr[data-id="${row.dataset.id}"] td i#UpdateRow${row.dataset.id}`
                )!;
                deleteButton.addEventListener("click", (_) => {
                    hanlderDeleteButtons(row.dataset.id);
                });

                updateButton.addEventListener("click", (_) => {
                    hanlderUpdateButtons(row.dataset.id);
                });
            }
        }
    }

    private createBody(animals: FinalAnimalDTO[]): void {
        const tbody = document.createElement("tbody");
        tbody.id = "tableBody";
        for (const animal of animals.values()) {
            tbody.innerHTML += this.generateRow(animal);
        }
        this.table.appendChild(tbody);
    }

    private generateRow(animal: FinalAnimalDTO): string {
        return `<tr data-id="${animal.id}">
            <td>${animal.name}</td>
            <td>${animal.breed}</td>
            <td>${animal.birthDate}</td>
            <td>${animal.gender}</td>
            <td>${animal.size}</td>
            <td><i class="delete-button" data-id="${animal.id}" id="DeleteRow${animal.id}">⛔</i></td>
            <td><i class="delete-button" data-id="${animal.id}" id="UpdateRow${animal.id}">🔁</i></td>
        </tr>
        `;
    }

    private createHeaders(): void {
        this.table.innerHTML += `
        <thead>
            <tr>
                <th>Name</th>
                <th>Breed</th>
                <th>Birthdate</th>
                <th>Gender</th>
                <th>Size</th>
                <th colspan="2"/>
            </tr>
        </thead>
        `;
    }
}
