const expect = require("chai").expect;

function lookupChar(string, index) {
    if (typeof(string) !== 'string' || !Number.isInteger(index)) {
        return undefined;
    }
    if (string.length <= index || index < 0) {
        return "Incorrect index";
    }
    return string.charAt(index);
}

describe("Character Look Up", function(){
    it("should return undefined with first parameter as a number", function(){
        expect(lookupChar(12, 0)).to.equal(undefined, "Function did not return the correct result!")
    });
})

describe("Character Look Up", function(){
    it("should return undefined with second parameter as a string", function(){
        expect(lookupChar("Pesho", "Gosho")).to.equal(undefined, "Function did not return the correct result!")
    });
})

describe("Character Look Up", function(){
    it("should return undefined with second parameter as a floating point number", function(){
        expect(lookupChar("Pesho", 3.12)).to.equal(undefined, "Function did not return the correct result!")
    });
})

describe("Character Look Up", function(){
    it("should return incorrect index with second parameter as incorrect value", function(){
        expect(lookupChar("Pesho", 13)).to.equal("Incorrect index", "Function did not return the correct result!")
    });
})

describe("Character Look Up", function(){
    it("should return incorrect index with second parameter as negative value", function(){
        expect(lookupChar("Pesho", -1)).to.equal("Incorrect index", "Function did not return the correct result!")
    });
})

describe("Character Look Up", function(){
    it("should return incorrect index with second parameter equal to the first parameter length", function(){
        expect(lookupChar("Pesho", 5)).to.equal("Incorrect index", "Function did not return the correct result!")
    });
})

describe("Character Look Up", function(){
    it("should return correct value with correct parameters", function(){
        expect(lookupChar("Pesho", 2)).to.equal("s", "Function did not return the correct result!")
    });
})