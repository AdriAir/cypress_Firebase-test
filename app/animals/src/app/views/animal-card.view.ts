import { FinalAnimalDTO } from "../interfaces";

export class AnimalCardView {
    public cards: HTMLElement = document.getElementById("animalCards")!;

    public render = (animals: FinalAnimalDTO[]) => {
        this.cards.innerHTML = "";
        for (const animal of animals.values()) {
            this.cards.innerHTML += this.generateCard(animal);
        }
    };

    public display(display: boolean) {
        display
            ? this.cards.classList.remove("hidden")
            : this.cards.classList.add("hidden");
    }

    private generateCard(animal: FinalAnimalDTO): string {
        return `
        <section class="card" data-id="${animal.id}">
            <span class="name">${animal.name}</span>
            <span class="breed">${animal.breed}</span>
            <article class="animal-info">
                <span>Nacimiento: ${animal.birthDate}</span>
                <span>Gender: ${animal.gender}</span>
                <span>Size: ${animal.size}</span>
                <span>Registred: ${animal.createdAt}</span>
                <span>Last Mod: ${animal.updatedAt}</span>
            </article>
            <article class="buttons-wrapper">
                <i class="delete-button" data-id="${animal.id}" id="DeleteCard${animal.id}">⛔</i>
                <i class="delete-button" data-id="${animal.id}" id="UpdateCard${animal.id}">🔁</i>
            </article>
        <section>
        `;
    }

    public bindActionButtons(
        hanlderDeleteButtons: Function,
        hanlderUpdateButtons: Function
    ) {
        for (const card of Array.from(this.cards.childNodes) as HTMLElement[]) {
            if (card.nodeType === 1) {
                //Esto lo hago porque los saltos de linea tmb son un nodo y lo rompe todo
                const deleteButton = document.querySelector(
                    `.card[data-id="${card.dataset.id}"] .buttons-wrapper #DeleteCard${card.dataset.id}`
                )!;
                const updateButton = document.querySelector(
                    `.card[data-id="${card.dataset.id}"] .buttons-wrapper #UpdateCard${card.dataset.id}`
                )!;
                deleteButton.addEventListener("click", (_) =>
                    hanlderDeleteButtons(card.dataset.id)
                );
                updateButton.addEventListener("click", (_) =>
                    hanlderUpdateButtons(card.dataset.id)
                );
            }
        }
    }
}
