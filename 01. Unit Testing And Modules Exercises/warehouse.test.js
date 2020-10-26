const expect = require("chai").expect;
const {beforeEach} = require("mocha");
const Warehouse = require('./warehouse.js');

describe('Tests', () => {
    let warehouse;
    beforeEach(function () {
        warehouse = new Warehouse(20);
    });

    describe('Test Constructor', () => {
        it('Test properties', () => {
            expect(warehouse.capacity).to.equal(20);
            expect(warehouse.availableProducts).to.deep.equal({
                'Food': {},
                'Drink': {}
            });
        });

        it('Test Properties', () => {
            const result = () => new Warehouse("something");
            expect(result).to.throw(`Invalid given warehouse space`);
        });
    });

    describe('Test addProduct method', () => {
        it('Test error', () => {
            const result = () => warehouse.addProduct("Food", "Test", 45);
            expect(result).to.throw(`There is not enough space or the warehouse is already full`);
        });

        it('Test functionality', () => {
            const result = warehouse.addProduct("Food", "Test", 20);
            expect(warehouse.availableProducts.Food.Test).to.equal(20);
            expect(result).to.deep.equal({
                Test: 20
            });
        });
    });

    describe("Test orderProduct() method", function () {
        it("Test functionality with available products", function () {
            warehouse.addProduct("Drink", "Cola", 5);
            warehouse.addProduct("Drink", "Sprite", 5);
            warehouse.addProduct("Food", "Zele", 4);
            warehouse.addProduct("Food", "Spanak", 4);
            const result = JSON.stringify(warehouse.orderProducts("Drink"));
            expect(result).to.equal(`{"Cola":5,"Sprite":5}`);
        });

        it("Test functionality without available products", function () {
            const result = JSON.stringify(warehouse.orderProducts("Drink"));
            expect(result).to.equal(`{}`);
        });
    });

    describe('Test occupiedCapacity() method', () => {
        it('Test zero result', () => {
            const result = warehouse.occupiedCapacity();
            expect(result).to.equal(0);
        });

        it('Test none-zero result', () => {
            warehouse.addProduct("Food", "Zele", 5);
            warehouse.addProduct("Food", "Grah", 5);
            warehouse.addProduct("Drink", "Wine", 5);
            warehouse.addProduct("Drink", "Cola", 5);
            const result = warehouse.occupiedCapacity();
            expect(result).to.equal(20);
        });
    });

    describe('Test revision() method', () => {
        it('Test empty output', () => {
            const result = warehouse.revision();
            expect(result).to.equal("The warehouse is empty");
        });

        it('Test none-empty output', () => {
            warehouse.addProduct("Food", "Zele", 5);
            warehouse.addProduct("Food", "Fasul", 5);
            warehouse.addProduct("Drink", "Cola", 5);
            warehouse.addProduct("Drink", "Sprite", 5);
            const result = warehouse.revision();
            expect(result).to.equal("Product type - [Food]\n- Zele 5\n- Fasul 5\nProduct type - [Drink]\n- Cola 5\n- Sprite 5");
        });
    });

    describe('Test scrapeAProduct method', () => {
        it('Test error', () => {
            const result = () => warehouse.scrapeAProduct("something", 10);
            expect(result).to.throw(`something do not exists`);
        });

        it('Test more quantity functionality', () => {
            warehouse.addProduct("Food", "Zele", 1);
            warehouse.addProduct("Food", "Grah", 3);
            warehouse.addProduct("Drink", "Cola", 5);
            warehouse.addProduct("Drink", "Sprite", 5);
            const result = warehouse.scrapeAProduct("Zele", 12);
            expect(result).to.deep.equal({
                Zele: 0,
                Grah: 3
            });
        });

        it('Test expected quantity functionality', () => {
            warehouse.addProduct("Food", "Zele", 1);
            warehouse.addProduct("Food", "Grah", 3);
            warehouse.addProduct("Drink", "Cola", 5);
            warehouse.addProduct("Drink", "Sprite", 5);
            const result = warehouse.scrapeAProduct("Grah", 1);
            expect(result).to.deep.equal({
                Zele: 1,
                Grah: 2
            });
        });
    });
});