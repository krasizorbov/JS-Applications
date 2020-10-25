const StringBuilder = require('./stringBuilder.js');
const expect = require('chai').expect;
const assert = require('chai').assert;

describe("StringBuilder function", function () {
    describe('constructor', function () {
        it('Test with string', function () {
            let obj = new StringBuilder('str');
            expect(obj).to.have.property('_stringArray').with.lengthOf(3);
        });

        it('Test with empty value', function () {
            let obj = new StringBuilder();
            expect(obj).to.have.property('_stringArray').with.lengthOf(0);
        });

        it('Test with wrong parameter', function () {
            expect(() => new StringBuilder(1)).to.Throw('Argument must be string');
        });
    });

    describe('append', function () {
        it('Test invalid param', function () {
            let obj = new StringBuilder('str');
            expect(() => obj.append(1)).to.Throw('Argument must be string');
        });

        it('Test new length', function () {
            let obj = new StringBuilder('Str');
            obj.append('T');
            expect(obj).to.have.property('_stringArray').with.lengthOf(4);
        });

        it('Test if added at the end', function () {
            let obj = new StringBuilder('Str');
            obj.append('T');
            expect(obj._stringArray[3]).to.equal('T');
        });
    });

    describe('prepend', function () {
        it('Test invalid param', function () {
            let obj = new StringBuilder('str');
            expect(() => obj.prepend(1)).to.Throw('Argument must be string');
        });

        it('Test new length', function () {
            let obj = new StringBuilder('Str');
            obj.prepend('a');
            expect(obj).to.have.property('_stringArray').with.lengthOf(4);
        });

        it('Test if added at the beginning', function () {
            let obj = new StringBuilder('Str');
            obj.prepend('a');
            expect(obj._stringArray[0]).to.equal('a');
        });
    });

    describe('insertAt', function () {
        it('Test invalid param', function () {
            let obj = new StringBuilder('str');
            expect(() => obj.insertAt(1, 1)).to.Throw('Argument must be string');
        });

        it('Test new length', function () {
            let obj = new StringBuilder('ab');
            obj.insertAt('TEST', 1);
            expect(obj).to.have.property('_stringArray').with.lengthOf(6);
        });

        it('Test if the string is inserted at index', function () {
            let obj = new StringBuilder('ab');
            obj.insertAt('TEST', 1);
            expect(obj._stringArray[1]).to.equal('T');
        });
    });

    describe('remove', function () {
        it('Test new length', function () {
            let obj = new StringBuilder('abc');
            obj.remove(1, 1);
            expect(obj).to.have.property('_stringArray').with.lengthOf(2);
        });

        it('Test result', function () {
            let obj = new StringBuilder('abc');
            obj.remove(1, 1);
            expect(obj._stringArray.join('')).to.equal('ac');
        });

        it('Test result', function () {
            let obj = new StringBuilder('abc');
            obj.remove(1, 2);
            expect(obj._stringArray.join('')).to.equal('a');
        });
    });

    describe('toString', function () {
        it('Test if joined', function () {
            let result = new StringBuilder('test');
            expect(result.toString()).to.equal('test');
        });
    });

    describe('Type of StringBuilder', function () {
        it('StringBuilder exist', function () {
            expect(StringBuilder).to.exist
        });

        it('StringBuilder type', function () {
            expect(typeof StringBuilder).to.equal('function');
        });

        it('should have the correct function properties', function () {
            assert.isFunction(StringBuilder.prototype.append);
            assert.isFunction(StringBuilder.prototype.prepend);
            assert.isFunction(StringBuilder.prototype.insertAt);
            assert.isFunction(StringBuilder.prototype.remove);
            assert.isFunction(StringBuilder.prototype.toString);
        });

        it('full test', function () {
            let str = new StringBuilder('hello');
            str.append(', world');
            str.prepend('User, ');
            str.insertAt('loop', 5);
            str.remove(6, 3);
            expect(str.toString()).to.equal('User,l hello, world');
        });
    });
});