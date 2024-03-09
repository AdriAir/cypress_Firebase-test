import { AnimalCardView, AnimalTableView } from ".";
import { FinalAnimalDTO } from "../interfaces";
import { Layout } from "../types";

export class AnimalView {
    public statusSection: HTMLSpanElement =
        document.getElementById("logsSection")!;
    public layoutSelector: HTMLSelectElement = document.getElementById(
        "layoutSelector"
    )! as HTMLSelectElement;
    public tableLayout: AnimalTableView = new AnimalTableView();
    public cardLayout: AnimalCardView = new AnimalCardView();

    public bindActionButtons(
        hanlderDeleteButtons: Function,
        hanlderUpdateButtons: Function
    ) {
        this.cardLayout.bindActionButtons(
            hanlderDeleteButtons,
            hanlderUpdateButtons
        );
        this.tableLayout.bindActionButtons(
            hanlderDeleteButtons,
            hanlderUpdateButtons
        );
    }

    public render = (animals: FinalAnimalDTO[]) => {
        this.cardLayout.render(animals);
        this.tableLayout.render(animals);
    };

    public bindLayoutSelector(handlerLayoutSelector: Function) {
        this.layoutSelector.addEventListener("change", (_) => {
            handlerLayoutSelector();
        });
    }

    public updateLayout() {
        this.layoutSelector.value === Layout.Cards.toString()
            ? this.displayCards()
            : this.displayTable();
    }

    private displayCards() {
        this.cardLayout.display(true);
        this.tableLayout.display(false);
    }

    private displayTable() {
        this.cardLayout.display(false);
        this.tableLayout.display(true);
    }

    public showStatus = (status: string) => {
        this.statusSection.textContent = status;
    };
}
