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