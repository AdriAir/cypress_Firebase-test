/// <reference types="cypress" />

describe("Cart Form", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/#/todo");
    });

    /**
     * Los Wait() no se usan para esto generalmente.
     *
     * Estos se suelen usar para esperar a que se ejecuten otros procesos,
     * sobretodo asincronos, como consultas a la base de datos.
     *
     * En este caso lo estoy haciendo para que podamos ver como se van añadiendo y eliminando elementos al carrito.
     */

    it("add products to cart", () => {
        const products = [
            "Leche",
            "Pan",
            "Arroz",
            "Huevos",
            "Azúcar",
            "Aceite de oliva",
            "Fideos",
            "Tomate en lata",
            "Queso",
            "Pollo",
            "Papel higiénico",
        ];

        for (const product of products) {
            cy.get("input[type=text]").type(`${product}{enter}`);
            cy.wait(100);
        }

        cy.get("#cart div").should("have.length", products.length);

        cy.get("#cart div").each((item, index) => {
            cy.wrap(item).should("contain.text", products[index]);
        });
    });

    it("check done products", () => {
        const products = ["Pan", "Leche", "Huevos"];

        for (const product of products) {
            cy.get("input[type=text]").type(`${product}{enter}`);
            cy.wait(100);
        }

        cy.get("#cart * .done-button").each((button) => {
            cy.wrap(button).click();
            cy.wait(100);
        });

        cy.get("input[type=text]").type(`Carne{enter}`);
        cy.get("#cart div").should("have.length", 1);

        cy.wait(200);

        //Comprobar Done List
        cy.get("#doneBtn").click();

        cy.wait(100);

        cy.get("#doneList div").should("have.length", 3);

        cy.get("#doneList div").each((item, index) => {
            cy.wrap(item).should("contain.text", products[index]);
        });
    });

    it("delete done products", () => {
        const products = ["Aceite", "Lima", "Huevos"];

        for (const product of products) {
            cy.get("input[type=text]").type(`${product}{enter}`);
        }

        cy.get("#cart * .done-button").each((button) => {
            cy.wrap(button).click();
        });

        cy.get("#doneBtn").click();

        cy.get("#doneList * .done-button").each((button, index) => {
            cy.get("#doneList div").should(
                "have.length",
                products.length - index
            );
            cy.wrap(button).click();
            cy.wait(100);
        });
    });
});
