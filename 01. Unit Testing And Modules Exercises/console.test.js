const Console = require('./console.js');
const expect = require('chai').expect;

describe("Console Tests", function(){
    describe("Returns a string or object in JSON format", function(){
        it("Should return a string if arguments[0] equal a string", function(){
            expect(Console.writeLine("Hello World")).to.equal("Hello World");
        })

        it("Should return an object in JSON if arguments[0] equal an object", function(){
            let obj = {name: "Pesho"};
            let objToString = JSON.stringify(obj);
            expect(Console.writeLine(obj)).to.equal(objToString);
        })

        it("Should throw an error if arguments[0] is not a string", function(){
            let [message, param1, param2, param3] = [5, 1, 2, 3];
            expect(() => Console.writeLine(message, param1, param2, param3)).to.Throw("No string format given!");
        })

        it("Should throw an error if number of parameters is not correct", function(){
            let [message, param1, param2] = ["The sum of {0} and {1} is {2}", 1, 2];
            expect(() => Console.writeLine(message, param1, param2)).to.Throw("Incorrect amount of parameters given!");
        })

        it("Should throw an error if a placeholder is missing", function(){
            let [message, param1, param2, param3] = ["The sum of and {1} is {2}", 1, 2, 3];
            expect(() => Console.writeLine(message, param1, param2, param3)).to.Throw("Incorrect amount of parameters given!");
        })

        it("Should throw error if placeholders given are out of range", function(){
            let [message, param1, param2, param3] = ["The sum of {3} and {1} is {2}", 1, 2, 3];
            expect(() => Console.writeLine(message, param1, param2, param3)).to.Throw("Incorrect placeholders given!");
        })

        it("Should return a correct output", function(){
            let [message, param1, param2, param3] = ["The sum of {0} and {1} is {2}", 1, 2, 3];
            expect(Console.writeLine(message, param1, param2, param3)).to.equal("The sum of 1 and 2 is 3");
        })
    })
})