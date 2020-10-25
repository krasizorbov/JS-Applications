const expect = require("chai").expect;

function isOddOrEven(string) {
    if (typeof(string) !== 'string') {
        return undefined;
    }
    if (string.length % 2 === 0) {
        return "even";
    }
    return "odd";
}

describe("Is Odd Or Even", function(){
    it("should return odd", function(){
        expect(isOddOrEven("aaa")).to.equal("odd")
    });
})

describe("Is Odd Or Even", function(){
    it("should return even", function(){
        expect(isOddOrEven("aaaa")).to.equal("even")
    });
})

describe("Is Odd Or Even", function(){
    it("should return undefined with a number as parameter", function(){
        expect(isOddOrEven(12)).to.equal(undefined, "Function did not return the correct result!")
    });
})

describe("Is Odd Or Even", function(){
    it("should return undefined with an object as parameter", function(){
        expect(isOddOrEven({name: "Pesho"})).to.equal(undefined, "Function did not return the correct result!")
    });
})