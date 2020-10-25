const PaymentPackage = require('./paymentPackage.js');
const expect = require('chai').expect;

describe("PaymentPackage", () => {
    describe("Test name", () => {
        it("Number Error", () => {
            expect(() => new PaymentPackage(1, 1)).to.Throw('Name must be a non-empty string');
        });

        it("Empty String Error", () => {
            expect(() => new PaymentPackage('', 1)).to.Throw('Name must be a non-empty string');
        })
        it("Correct Behaviour", () => {
            let obj = new PaymentPackage('test', 1);
            expect(obj.name).to.equal('test');
        });

        it("Change Name", () => {
            let obj = new PaymentPackage('test', 1);
            expect(obj.name = 'newName').to.equal('newName');
        });
    });
    describe("Value Non Negative", () => {
        it("Error", () => {
            expect(() => new PaymentPackage('a', 'a')).to.Throw('Value must be a non-negative number');
        });

        it("Value Non Negative", () => {
            expect(() => new PaymentPackage('a', -1)).to.Throw('Value must be a non-negative number');
        });

        it("Correct Behaviour", () => {
            let obj = new PaymentPackage('a', 1);
            expect(obj.value).to.equal(1);
        });

        it("Correct Behaviour", () => {
            let obj = new PaymentPackage('a', 1);
            expect(obj.value = 2).to.equal(2);
        });
    });
    describe("Test VAT", () => {
        it("Vat 20", () => {
            let obj = new PaymentPackage('a', 1);
            expect(obj.VAT).to.equal(20);
        });

        it("VAT Should Be Non Negative Number", () => {
            let obj = new PaymentPackage('a', 1);
            expect(() => obj.VAT = 'a').to.Throw('VAT must be a non-negative number');
        })

        it("VAT Should Be Non Negative Number", () => {
            let obj = new PaymentPackage('a', 1);
            expect(() => obj.VAT = -1).to.Throw('VAT must be a non-negative number');
        });

        it("Correct Behaviour", () => {
            let obj = new PaymentPackage('a', 1);
            expect(obj.VAT = 1).to.equal(1);
        });
    });
    describe("Test Active", () => {
        it("Empty string returns true", () => {
            let obj = new PaymentPackage('a', 1);
            expect(obj.active).to.equal(true);
        });

        it("Boolian Error", () => {
            let obj = new PaymentPackage('a', 1);
            expect(() => obj.active = 'test').to.Throw('Active status must be a boolean');
        });

        it("Return False", () => {
            let obj = new PaymentPackage('a', 1);
            expect(obj.active = false).to.equal(false);
        });
    });
    describe("Test toString", () => {
        it("test toString", () => {
            let obj = new PaymentPackage('HR Services', 1500);
            expect(obj.toString()).to.equal('Package: HR Services\n- Value (excl. VAT): 1500\n- Value (VAT 20%): 1800');
        });

        it("test toString", () => {
            let obj = new PaymentPackage('HR Services', 1500);
            obj.active = false;
            expect(obj.toString()).to.equal('Package: HR Services (inactive)\n- Value (excl. VAT): 1500\n- Value (VAT 20%): 1800');
        });

        it("test toString", () => {
            let obj = new PaymentPackage('HR Services', 1500);
            obj.VAT = 0;
            expect(obj.toString()).to.equal('Package: HR Services\n- Value (excl. VAT): 1500\n- Value (VAT 0%): 1500');
        });

        it("test toString", () => {
            let obj = new PaymentPackage('HR Services', 0);
            obj.VAT = 0;
            expect(obj.toString()).to.equal('Package: HR Services\n- Value (excl. VAT): 0\n- Value (VAT 0%): 0');
        });
    });
});