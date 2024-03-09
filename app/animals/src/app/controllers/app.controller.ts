import { signInWithRedirect, onAuthStateChanged, getAuth } from "firebase/auth";
import { FinalAnimalDTO } from "../interfaces";
import { AnimalService, VaccineService } from "../services";
import { Method, UUID } from "../types";
import { FormView, AnimalView } from "../views";
import { GoogleAuthProvider } from "firebase/auth/cordova";
import { getApp } from "firebase/app";

export class AppController {
    constructor(
        private animalService: AnimalService,
        private vaccineService: VaccineService,
        private animalView: AnimalView,
        private formView: FormView
    ) {
        this.login();
    }

    //Mezclamos capas por que es un ejemplo
    private login() {
        //Obtenemos la sesión actual
        const button = document.getElementById("loginBtn") as HTMLSpanElement;
        const auth = getAuth(getApp());
        // Cada vez que cambia la sesión de autenticación, se llama esta función
        onAuthStateChanged(auth, (user) => {
            if (user == null) {
                return;
            }
            console.log(user);
            // this.init();
        });

        //El boton inicia sesión con google
        button.addEventListener("click", (_) => {
            signInWithRedirect(auth, new GoogleAuthProvider());
        });
    }

    private init(): void {
        this.animalService
            .load()
            .then(this.animalView.render)
            .then(() => {
                this.animalView.bindActionButtons(
                    this.handlerAnimalDeleteButtons,
                    this.handlerAnimalUpdateButtons
                );
            })
            .catch((error) => this.animalView.showStatus(error));

        this.formView.bindAddVaccineButton(this.hanlderFormAddVaccineButton);
        this.formView.bindFormSubmitButtons(
            this.handlerFormInsertButton,
            this.handlerFormUpdateButton
        );
        this.formView.bindReturnToInsertButton(
            this.handlerFormReturnToInsertButton
        );
        this.animalView.bindLayoutSelector(this.hanlderChangeLayout);
    }

    private update(): void {
        this.animalService
            .load()
            .then(this.animalView.render)
            .then(() => {
                this.animalView.bindActionButtons(
                    this.handlerAnimalDeleteButtons,
                    this.handlerAnimalUpdateButtons
                );
            })
            .catch((error) => this.animalView.showStatus(error));

        this.animalView.bindLayoutSelector(this.hanlderChangeLayout);
    }

    public hanlderChangeLayout = () => {
        this.animalView.updateLayout();
    };

    public handlerAnimalDeleteButtons = (id: UUID) => {
        this.animalService.delete(id).then(() => this.update());
    };

    public handlerAnimalUpdateButtons = (id: UUID) => {
        this.animalService.findOne(id).then((animal: FinalAnimalDTO) => {
            this.formView.clear();
            this.vaccineService.load().then((vaccines) => {
                this.formView.fillValues(vaccines, animal);
            });
            this.formView.changeMethod(Method.PUT, {
                id: animal.id,
                createdAt: animal.createdAt.toString(),
            });
        });
    };

    public hanlderFormAddVaccineButton = () => {
        this.vaccineService.load().then(this.formView.createNewVaccine);
    };

    public handlerFormReturnToInsertButton = () => {
        this.formView.changeMethod(Method.POST);
        this.formView.clear();
    };

    public handlerFormInsertButton = () => {
        this.animalService
            .create(this.formView.createdAnimalFromForm())
            .then(() => this.update())
            .then(() => this.formView.clear());
    };

    public handlerFormUpdateButton = () => {
        this.animalService
            .update(this.formView.updatedAnimalFromForm())
            .then(() => {
                this.update();
                this.formView.changeMethod(Method.POST);
                this.formView.clear();
            });
    };
}
