let expect = require("chai").expect;
let sum = require("./sumOfNumbers.js").sum;

describe("Sum array of numbers", function () {
    it("should return 3 for [1,2]", function () {
        expect(sum([1, 2])).to.be.equal(3);
    });
    it("should return 1 for [1]", function () {
        expect(sum([1])).to.be.equal(1);
    });
    it("should return 0 for empty array", function () {
        expect(sum([])).to.be.equal(0);
    });
    it("should return 5 for [3.5, 2.5, -1]", function () {
        expect(sum([3.5, 2.5, -1])).to.be.equal(5);
    });
    it("should return NaN for invalid data", function () {
        expect(sum("invalid data")).to.be.NaN;
    });
});

let isSymmetric = require("./checkForSymmetry.js").isSymmetric;

describe("isSymmetric(arr)", function () {
    it("should return true for [3,4,5,5,4,3]", function () {
        expect(isSymmetric([3, 4, 5, 5, 4, 3])).to.be.equal(true);
    });
    it("should return false for [1,2,3,4,2,1]", function () {
        expect(isSymmetric([1, 2, 3, 4, 2, 1])).to.be.equal(false);
    });
    it("should return true for [-1,2,-1]", function () {
        expect(isSymmetric([-1, 2, -1])).to.be.equal(true);
    });
    it("should return false for [-1,2,1]", function () {
        expect(isSymmetric([-1, 2, 1])).to.be.equal(false);
    });
    it("should return false for [1,2]", function () {
        expect(isSymmetric([1, 2])).to.be.equal(false);
    });
    it("should return true for [1]", function () {
        expect(isSymmetric([1])).to.be.equal(true);
    });
    it("should return true for [10,'hello world', {pesho:5}, new Date(), {pesho:5},'hello world',10]", function () {
        expect(isSymmetric([10, 'hello world', {pesho: 5}, new Date(), {pesho: 5}, 'hello world', 10])).to.be.equal(true);
    });
    it("should return false for [10,'hello world',{pesho:5},new Date(),{Pesho:5},'hello world',10]", function () {
        expect(isSymmetric([10, 'hello world', {pesho: 5}, new Date(), {Pesho: 5}, 'hello world', 5])).to.be.equal(false);
    });
    it("should return false for 1,2,2,1", function () {
        expect(isSymmetric(1, 2, 2, 1)).to.be.equal(false);
    });
});

let rgbToHexColor = require("./rgbToHex.js").rgbToHexColor;

describe("rgbToHexColor(red, green, blue)", function () {
    describe("Valid Input", function () {
        it("should return #03FC2C for (3, 252, 44)", function () {
            expect(rgbToHexColor(3, 252, 44)).to.be.equal("#03FC2C");
        });
        it("should return #0C0D0E for (12, 13, 14)", function () {
            expect(rgbToHexColor(12, 13, 14)).to.be.equal("#0C0D0E");
        });
        it("should return #000000 for (0, 0, 0)", function () {
            expect(rgbToHexColor(0, 0, 0)).to.be.equal("#000000");
        });
        it("should return #FFFFFF for (255, 255, 255)", function () {
            expect(rgbToHexColor(255, 255, 255)).to.be.equal("#FFFFFF");
        });
    });

    describe("Invalid Input", function () {
        it("should return undefined for (-1,0,0)", function () {
            expect(rgbToHexColor(-1, 0, 0)).to.be.equal(undefined);
        });
        it("should return undefined for (0,-1,0)", function () {
            expect(rgbToHexColor(0, -1, 0)).to.be.equal(undefined);
        });
        it("should return undefined for (0,0,-1)", function () {
            expect(rgbToHexColor(0, 0, -1)).to.be.equal(undefined);
        });
        it("should return undefined for (256,0,0)", function () {
            expect(rgbToHexColor(256, 0, 0)).to.be.equal(undefined);
        });
        it("should return undefined for (0,256,0)", function () {
            expect(rgbToHexColor(0, 256, 0)).to.be.equal(undefined);
        });
        it("should return undefined for (0,0,256)", function () {
            expect(rgbToHexColor(0, 0, 256)).to.be.equal(undefined);
        });
        it("should return undefined for (5.55,0,0)", function () {
            expect(rgbToHexColor(5.55, 0, 0)).to.be.equal(undefined);
        });
        it("should return undefined for (0,5.55,0)", function () {
            expect(rgbToHexColor(0, 5.55, 0)).to.be.equal(undefined);
        });
        it("should return undefined for (0,0,5.55)", function () {
            expect(rgbToHexColor(0, 0, 5.55)).to.be.equal(undefined);
        });
        it('should return undefined for ("10", [5], {10:5})', function () {
            expect(rgbToHexColor("10", [5], {10: 5})).to.be.equal(undefined);
        });
        it("should return undefined for empty input", function () {
            expect(rgbToHexColor()).to.be.equal(undefined);
        });
    });
});