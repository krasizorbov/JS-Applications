const expect = require("chai").expect;

let mathEnforcer = {
    addFive: function (num) {
        if (typeof(num) !== 'number') {
            return undefined;
        }
        return num + 5;
    },
    subtractTen: function (num) {
        if (typeof(num) !== 'number') {
            return undefined;
        }
        return num - 10;
    },
    sum: function (num1, num2) {
        if (typeof(num1) !== 'number' || typeof(num2) !== 'number') {
            return undefined;
        }
        return num1 + num2;
    }
};

describe("Math Enforcer", function(){
    describe("Add Five", function(){
        it("should return undefined passing parameter as a string", function(){
            expect(mathEnforcer.addFive("Pesho")).to.equal(undefined, "Function did not return the correct result!")
        });
    })

    describe("Add Five", function(){
        it("should return 5 if parameter equal 0", function(){
            expect(mathEnforcer.addFive(0)).to.equal(5, "Function did not return the correct result!")
        });
    })

    describe("Add Five", function(){
        it("should return 15.5 if parameter equal 10.5", function(){
            expect(mathEnforcer.addFive(10.5)).to.equal(15.5, "Function did not return the correct result!")
        });
    })

    describe("Add Five", function(){
        it("should return negative number if parameter equal -6 or greater", function(){
            expect(mathEnforcer.addFive(-6)).to.equal(-1, "Function did not return the correct result!")
        });
    })

    describe("Subtract Ten", function(){
        it("should return undefined passing parameter as a string", function(){
            expect(mathEnforcer.subtractTen("Pesho")).to.equal(undefined, "Function did not return the correct result!")
        });
    })

    describe("Subtract Ten", function(){
        it("should return 0 if parameter equals to 10", function(){
            expect(mathEnforcer.subtractTen(10)).to.equal(0, "Function did not return the correct result!")
        });
    })

    describe("Subtract Ten", function(){
        it("should return -20.5 if parameter equals to -10.5", function(){
            expect(mathEnforcer.subtractTen(-10.5)).to.equal(-20.5, "Function did not return the correct result!")
        });
    })

    describe("Subtract Ten", function(){
        it("should return negative number if parameter is negative number", function(){
            expect(mathEnforcer.subtractTen(-10)).to.equal(-20, "Function did not return the correct result!")
        });
    })

    describe("Sum", function(){
        it("should return undefined passing first parameter as a string", function(){
            expect(mathEnforcer.sum("Pesho", 10)).to.equal(undefined, "Function did not return the correct result!")
        });
    })

    describe("Sum", function(){
        it("should return undefined passing second parameter as a string", function(){
            expect(mathEnforcer.sum(10, "Pesho")).to.equal(undefined, "Function did not return the correct result!")
        });
    })

    describe("Sum", function(){
        it("should return positive number if first and second parameters are positive", function(){
            expect(mathEnforcer.sum(10, 10)).to.equal(20, "Function did not return the correct result!")
        });
    })

    describe("Sum", function(){
        it("should return negative number if first and second parameters are negative", function(){
            expect(mathEnforcer.sum(-10, -10)).to.equal(-20, "Function did not return the correct result!")
        });
    })

    describe("Sum", function(){
        it("should return 20.5", function(){
            expect(mathEnforcer.sum(10.5, 10)).to.equal(20.5, "Function did not return the correct result!")
        });
    })

    describe("Sum", function(){
        it("should return 20.5", function(){
            expect(mathEnforcer.sum(10, 10.5)).to.equal(20.5, "Function did not return the correct result!")
        });
    })
})